import * as React from 'react'
import { connect } from 'react-redux'
import * as _ from 'lodash'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { URL } from '@/common/constants/url'
import Logo from '@/components/common/logo'

import { toggleMenu, closeMenu, authLogout } from '@/actions'

interface IProps {
  auth
  toggleMenu
  closeMenu
  authLogout
  parts
}

interface IState {}

class CommonHeader extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.logoutClick = this.logoutClick.bind(this)
  }

  async logoutClick() {
    await this.props.authLogout()
    location.reload()
  }

  logoutLink(): JSX.Element {
    const { auth } = this.props

    if (auth && auth.isLogin) {
      return <a onClick={this.logoutClick}>ログアウト</a>
    }
    return (
      <Link href={URL.LOGIN}>
        <a onClick={this.props.closeMenu}>ログイン</a>
      </Link>
    )
  }

  render(): JSX.Element {
    const { parts } = this.props

    const isSideMenuOpen = parts && parts.isSideMenuOpen
    const sideMenuClass = isSideMenuOpen ? 'open' : ''
    const menuBtnClass = isSideMenuOpen ? 'menu-btn on' : 'menu-btn'
    const layerPanelClass = isSideMenuOpen ? 'on' : ''

    return (
      <React.Fragment>
        <header className="header">
          <div className="wrapper">
            <Logo />
            <div className="nav">
              <div className="search">
                <form role="search" method="get" action="#">
                  <FontAwesomeIcon className="search-icon" icon="search" />
                  <label>
                    <input
                      type="search"
                      placeholder="検索..."
                      defaultValue=""
                      name="s"
                    />
                  </label>
                </form>
              </div>
              <div
                className={menuBtnClass}
                onClick={(e) => {
                  e.preventDefault()
                  this.props.toggleMenu()
                }}
              >
                <figure></figure>
                <figure></figure>
                <figure></figure>
              </div>
              <div id="side-menu" className={sideMenuClass}>
                <div className="side-menu-header">
                  <div className="search">
                    <form role="search" method="get" action="#">
                      <FontAwesomeIcon className="search-icon" icon="search" />
                      <label>
                        <input
                          type="search"
                          placeholder="検索..."
                          defaultValue=""
                          name="s"
                        />
                      </label>
                    </form>
                  </div>
                </div>
                <nav>
                  <ul>
                    <li>
                      <Link href={URL.HOME}>
                        <a onClick={this.props.closeMenu}>HOME</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={URL.MEMBER}>
                        <a onClick={this.props.closeMenu}>マイページ</a>
                      </Link>
                    </li>
                    <li>{this.logoutLink()}</li>
                  </ul>
                </nav>
              </div>
              <div id="layer-panel" className={layerPanelClass}></div>
            </div>
          </div>
        </header>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    parts: state.parts,
    auth: state.auth,
  }
}

const mapDispatchToProps = { toggleMenu, closeMenu, authLogout }

export default connect(mapStateToProps, mapDispatchToProps)(CommonHeader)
