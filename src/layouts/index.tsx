import Head from 'next/head'
import React from 'react'
import { defineMessages, InjectedIntl, injectIntl } from 'react-intl'
import Nav from './Nav'

interface LayoutProps {
  id: string
  children: React.ReactNode
  intl: InjectedIntl
}

export default injectIntl(({ intl, children, id }: LayoutProps) => {
  const { description, title } = defineMessages({
    description: {
      id: `home.description`,
      defaultMessage: 'Default Home',
    },
    title: {
      id: 'home.title',
      defaultMessage: 'Default About',
    },
  })

  description.id = `${id}.description`
  title.id = `${id}.title`

  // console.log(id)
  return (
    <div>
      <Head>
        <title>{intl.formatMessage(title)}</title>
        <meta name="description" content={intl.formatMessage(description)} />
      </Head>

      <header>
        <Nav />
      </header>

      {children}
    </div>
  )
})
