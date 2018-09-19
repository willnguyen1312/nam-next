import withRedux from 'next-redux-wrapper'
import App, { Container } from 'next/app'
import * as React from 'react'
import { addLocaleData, IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { initStore } from '../store'

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typeof window !== 'undefined' && (window as any).ReactIntlLocaleData) {
  Object.keys((window as any).ReactIntlLocaleData).forEach(lang => {
    addLocaleData((window as any).ReactIntlLocaleData[lang])
  })
}

export default withRedux(initStore)(
  class MyApp extends App<any, any> {
    static async getInitialProps({ Component, ctx }: any) {
      const pageProps = Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}

      // Get the `locale` and `messages` from the request object on the server.
      // In the browser, use the same values that the server serialized.
      const { req } = ctx
      const { locale, messages } = req || (window as any).__NEXT_DATA__.props

      return { pageProps, locale, messages }
    }

    render() {
      const { Component, pageProps, locale, messages, store } = this.props
      const now = Date.now()

      return (
        <Container>
          <Provider store={store}>
            <IntlProvider locale={locale} messages={messages} initialNow={now}>
              <Component {...pageProps} />
            </IntlProvider>
          </Provider>
        </Container>
      )
    }
  }
)
