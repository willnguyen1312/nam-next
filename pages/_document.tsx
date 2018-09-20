import Document, { Head, Main, NextScript } from 'next/document'
import * as React from 'react'
import { ServerStyleSheet } from 'styled-components'

// The document (which is SSR-only) needs to be customized to expose the locale
// data for the user's locale for React Intl to work in the browser.
export default class IntlDocument extends Document {
  static async getInitialProps(context) {
    const documentProps = await super.getInitialProps(context)
    const sheet = new ServerStyleSheet()
    const page = context.renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const {
      req: { locale, localeDataScript },
    } = context
    const styleTags = sheet.getStyleElement()
    return {
      ...documentProps,
      ...page,
      styleTags,
      locale,
      localeDataScript,
    }
  }

  render() {
    // Polyfill Intl API for older browsers
    const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${
      this.props.locale
    }`

    return (
      <html>
        <Head />
        <body>
          <Main />
          <script src={polyfill} />
          <script
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript,
            }}
          />
          <NextScript />
        </body>
      </html>
    )
  }
}
