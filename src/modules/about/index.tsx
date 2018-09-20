import Layout from 'layouts'
import withIntl from 'lib/withIntl'
import React, { Component } from 'react'
import { FormattedMessage, FormattedNumber } from 'react-intl'

class About extends Component {
  static getInitialProps() {
    // Do something
  }

  render() {
    return (
      <Layout id="about">
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

export default withIntl(About)
