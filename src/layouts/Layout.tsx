import React from 'react'
import Nav from './Nav'

export default ({ children }) => (
  <div>
    <header>
      <Nav />
    </header>
    {children}
  </div>
)
