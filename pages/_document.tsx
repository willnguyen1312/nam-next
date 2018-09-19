import Document, { Head, Main, NextScript } from 'next/document'
import * as React from 'react'
import Helmet from 'react-helmet'
import { ServerStyleSheet } from 'styled-components'

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
      ...page,
      ...documentProps,
      helmet: Helmet.renderStatic(),
      styleTags,
      locale,
      localeDataScript,
    }
  }

  // should render on <html>
  get helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent()
  }

  // should render on <body>
  get helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent()
  }

  // should render on <head>
  get helmetHeadComponents() {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent())
  }

  get helmetJsx() {
    return (
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        title="Next.js boilerplate page!"
        meta={[
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { property: 'og:title', content: 'Next.js boilerplate page!' },
        ]}
      />
    )
  }

  render() {
    // Polyfill Intl API for older browsers
    const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${
      this.props.locale
    }`

    return (
      <html {...this.helmetHtmlAttrComponents}>
        <Head>
          {this.helmetJsx}
          {this.helmetHeadComponents}
          {this.props.styleTags}
        </Head>
        <body {...this.helmetBodyAttrComponents}>
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
