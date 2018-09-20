import * as Cookie from 'js-cookie'
import Link from 'next/link'
import React from 'react'
import { FormattedMessage } from 'react-intl'

export default class Nav extends React.Component {
  state = {
    localeList: ['en', 'fr'],
  }

  handleChangeLocale = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault()
    const {
      currentTarget: { innerText: locale },
    } = event

    const previousLocale = Cookie.get('language')

    if (locale !== previousLocale) {
      Cookie.set('language', locale)
      location.reload()
    }
  }

  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link prefetch={true} href="/">
              <a>
                <FormattedMessage id="nav.home" defaultMessage="Home" />
              </a>
            </Link>
          </li>
          <li>
            <Link prefetch={true} href="/about">
              <a>
                <FormattedMessage id="nav.about" defaultMessage="About" />
              </a>
            </Link>
          </li>
        </ul>

        <ul>
          {this.state.localeList.map((locale, index) => (
            <li onClick={this.handleChangeLocale} key={index}>
              <a href="">{locale}</a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }
}
