import { restAPI } from 'api'
import Layout from 'layouts/Layout'
import withIntl from 'lib/withIntl'
import getConfig from 'next/config'
import Head from 'next/head'
import React, { Component } from 'react'
import { defineMessages, FormattedMessage, FormattedNumber } from 'react-intl'

const { description } = defineMessages({
  description: {
    id: 'description',
    defaultMessage: 'An example app integrating React Intl with Next.js',
  },
})

class Index extends Component<any, any> {
  static async getInitialProps() {
    const data = await restAPI.get('users').then(res => res.data)
    return { data }
  }

  render() {
    const envs = getConfig()
    // tslint:disable:no-console
    console.log(envs.publicRuntimeConfig)
    console.log(envs.serverRuntimeConfig)
    const { intl } = this.props

    return (
      <Layout>
        <Head>
          <meta name="description" content={intl.formatMessage(description)} />
        </Head>
        <p>
          <FormattedMessage id="greeting" defaultMessage="Hello, World!" />
        </p>
        <h1>{this.props.data.length}</h1>
        <p>
          <FormattedNumber value={1000} />
        </p>
      </Layout>
    )
  }
}

export default withIntl(Index)
