import Layout from 'layouts'
import withIntl from 'lib/withIntl'
import React, { Component } from 'react'
import { FormattedMessage, FormattedNumber } from 'react-intl'

class Index extends Component {
  static getInitialProps() {
    // Do something
  }

  render() {
    return (
      <Layout id="home">
        {/* <Head>
          <title>{intl.formatMessage(title)}</title>
          <meta name='description' content={intl.formatMessage(description)} />
        </Head> */}
        <p>
          <FormattedMessage id="greeting" defaultMessage="Hello, World!" />
        </p>
        <p>
          <FormattedNumber value={1000} />
        </p>
      </Layout>
    )
  }
}

export default withIntl(Index)
