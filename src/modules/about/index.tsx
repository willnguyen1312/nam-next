import Layout from 'layouts/Layout'
import withIntl from 'lib/withIntl'
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { defineMessages, FormattedRelative } from 'react-intl'

const messages = defineMessages({
  description: {
    id: 'about.description',
    defaultMessage: 'Default About description',
  },
  title: {
    id: 'about.title',
    defaultMessage: 'Default About Title',
  },
})

class About extends Component<any, any> {
  static async getInitialProps({ req }) {
    if (req) {
      Helmet.renderStatic()
    }

    return { someDate: Date.now() }
  }

  render() {
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
          <FormattedRelative
            value={this.props.someDate}
            updateInterval={1000}
          />
        </p>
      </Layout>
    )
  }
}

export default withIntl(About)
