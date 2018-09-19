import Head from 'next/head'
import React from 'react'
import { defineMessages, injectIntl } from 'react-intl'
import Nav from './Nav'

const messages = defineMessages({
  title: {
    id: 'title',
    defaultMessage: 'React Intl Next.js Example',
  },
})

// tslint:disable-next-line:no-any
export default injectIntl(({ intl, title, children }: any) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title || intl.formatMessage(messages.title)}</title>
    </Head>

    <header>
      <Nav />
    </header>

    {children}
  </div>
))
