import Link from 'next/link'
import React from 'react'
import { FormattedMessage } from 'react-intl'

export default class Nav extends React.Component {
  state = {
    localeList: ['en', 'fr'],
  }

  handleChangeLocale = (event: React.MouseEvent<HTMLLIElement>) => {
    const {
      currentTarget: { innerText: locale },
    } = event

    document.cookie = `language=${locale}`
    location.reload()
  }

  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>
                <FormattedMessage id="nav.home" defaultMessage="Home" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/about">
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
