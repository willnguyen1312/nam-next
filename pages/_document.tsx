// tslint:disable:no-any
import Document, { Head, Main, NextScript } from 'next/document'
import * as React from 'react'
import { ServerStyleSheet } from 'styled-components'

export default class IntlDocument extends Document {
  static getInitialProps(context: any) {
    const sheet = new ServerStyleSheet()
    const page = context.renderPage((App: any) => (props: any) =>
      sheet.collectStyles(<App {...props} />)
    )
    const {
      req: { locale, localeDataScript },
    } = context
    const styleTags = sheet.getStyleElement()
    return {
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
        <Head>
          <title>My Next.js page</title>
          {this.props.styleTags}
        </Head>
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
