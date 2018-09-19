import Layout from 'layouts/Layout'
import React, { Component } from 'react'
import { FormattedRelative } from 'react-intl'

class About extends Component<any, any> {
  static async getInitialProps() {
    return { someDate: Date.now() }
  }

  render() {
    return (
      <Layout>
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

export default About
