import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Page from '../src/reduxDemo/Page'
import { addCount, serverRenderClock, startClock } from '../store'

class Counter extends React.Component<any, any> {
  static getnitialProps({ store, isServer }) {
    store.dispatch(serverRenderClock(isServer))
    store.dipatch(addCount())
    return { isServer }
  }
  timer

  componentDidMount() {
    this.timer = this.props.startClock()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return <Page title="Other Page" linkTo="/counter" />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Counter)
