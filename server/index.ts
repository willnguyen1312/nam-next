// Polyfill Node with `Intl` that has data for all locales.
// See: https://formatjs.io/guides/runtime-environments/#server
import * as IntlPolyfill from 'intl'
Intl.NumberFormat = IntlPolyfill.NumberFormat
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat

import * as accepts from 'accepts'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import { readFileSync } from 'fs'
import * as glob from 'glob'
import * as next from 'next'
import { basename } from 'path'
import { IS_DEV } from '../config'
import { CustomRequestType } from '../typings/custom'

const port = parseInt(process.env.PORT, 10) || 3000
const app = next({ dev: IS_DEV })
const handle = app.getRequestHandler()

// Get the supported languages by looking for translations in the `lang/` dir.
const languages = glob.sync('./lang/*.json').map(f => basename(f, '.json'))

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const localeDataCache = new Map()
const getLocaleDataScript = (locale: string) => {
  if (!localeDataCache.has(locale)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${locale}`)
    const localeDataScript = readFileSync(localeDataFile, 'utf8')
    localeDataCache.set(locale, localeDataScript)
  }
  return localeDataCache.get(locale)
}

// We need to load and expose the translations on the request for the user's
// locale. These will only be used in production, in dev the `defaultMessage` in
// each message description in the source code will be used.
const getMessages = (locale: string) => {
  // Path to local file changed dynamically due to next build
  const pathToLocaleFile = `${IS_DEV ? '.' : '../../'}/../lang/${locale}.json`
  return require(pathToLocaleFile)
}

const getLocale = (locale: string) =>
  languages.includes(locale) ? locale : 'en'

const getBrowserDefaultLocale = (req: CustomRequestType) => {
  const accept = accepts(req)
  const browserLanguages = accept.languages()
  const defaultBrowserLocale = browserLanguages[0].split('-')[0]
  return defaultBrowserLocale
}

app.prepare().then(() => {
  const server = express()
  server.use(cookieParser())

  server.get('*', (req: CustomRequestType, res) => {
    const localeFromCookie: string = req.cookies.language || ''
    const locale = getLocale(localeFromCookie || getBrowserDefaultLocale(req))

    req.locale = locale
    req.localeDataScript = getLocaleDataScript(locale)
    req.messages = getMessages(locale)

    return handle(req, res)
  })

  // tslint:disable:no-any
  server.listen(port, (err: any) => {
    if (err) {
      throw err
    }
    // tslint:disable-next-line:no-console
    console.log(`> Ready on http://localhost:${port}`)
  })
})
