import Link from 'next/link'
import * as React from 'react'
import { connect } from 'react-redux'
import AddCount from './AddCount'
import Clock from './Clock'

export default connect(state => state)(
  ({ title, linkTo, lastUpdate, light }: any) => {
    return (
      <div>
        <h1>{title}</h1>
        <Clock lastUpdate={lastUpdate} light={light} />
        <AddCount />
        <nav>
          <Link href={linkTo}>
            <a>Navigate</a>
          </Link>
        </nav>
      </div>
    )
  }
)
