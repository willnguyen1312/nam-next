import { restAPI } from 'api'
import Layout from 'layouts/Layout'
import withIntl from 'lib/withIntl'
import getConfig from 'next/config'
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { defineMessages, FormattedMessage, FormattedNumber } from 'react-intl'
import { sample } from './img'

const messages = defineMessages({
  description: {
    id: 'home.description',
    defaultMessage: 'Default Home description',
  },
  title: {
    id: 'home.title',
    defaultMessage: 'Default Home Title',
  },
})

class Index extends Component<any, any> {
  static async getInitialProps({ req }) {
    const data = await restAPI.get('users').then(res => res.data)
    if (req) {
      Helmet.renderStatic()
    }

    return { data }
  }

  render() {
    const envs = getConfig()
    // tslint:disable:no-console
    console.log(envs.publicRuntimeConfig)
    console.log(envs.serverRuntimeConfig)
    const { intl } = this.props
    const { description, title } = messages

    return (
      <Layout>
        <Helmet
          title={`${intl.formatMessage(title)}`}
          meta={[
            { name: 'description', content: intl.formatMessage(description) },
          ]}
        />
        <p>
          <FormattedMessage id="greeting" defaultMessage="Hello, World!" />
        </p>
        <h1>{this.props.data.length}</h1>
        <p>
          <FormattedNumber value={1000} />
        </p>
        <img src={sample} />
      </Layout>
    )
  }
}

export default withIntl(Index)
