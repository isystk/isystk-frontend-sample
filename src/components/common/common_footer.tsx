import * as React from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import $ from 'jquery'
import { URL } from '@/common/constants/url'

import { toggleMenu, closeMenu, showOverlay } from '@/actions'

interface IProps {
  toggleMenu
  closeMenu
  showOverlay
}
interface IState {
  scrollTop: number
}

class CommonFooter extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = { scrollTop: 0 }
    this.handleScroll = this.handleScroll.bind(this)
    this.scrollToTop = this.scrollToTop.bind(this)
  }

  componentDidMount(): void {
    process.browser && window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount(): void {
    process.browser && window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll(): void {
    this.setState({ scrollTop: $(window).scrollTop() as number })
  }
  scrollToTop(e): void {
    e.preventDefault()
    $('body,html').animate(
      {
        scrollTop: 0,
      },
      500
    )
  }

  render(): JSX.Element {
    const { scrollTop } = this.state

    let scrollTopClass = 'link hide'
    if (scrollTop > 100) {
      scrollTopClass = 'link '
    }

    return (
      <React.Fragment>
        <footer className="footer">
          <div className="wrapper">
            <nav className="footer-nav">
              <ul>
                <li>
                  <Link href={URL.HOME}>
                    <a onClick={this.props.closeMenu}>
                      <FontAwesomeIcon icon="home" />
                    </a>
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      this.props.showOverlay()
                    }}
                  >
                    <FontAwesomeIcon icon="share-alt" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      this.props.toggleMenu()
                    }}
                  >
                    <FontAwesomeIcon icon="bars" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="js-scroll-top"
                    onClick={this.scrollToTop}
                  >
                    <FontAwesomeIcon icon="chevron-up" />
                  </a>
                </li>
              </ul>
            </nav>
            <section className="follow-links">
              <ul className="menu">
                <li>
                  <a
                    href="https://profile.isystk.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/isystk/isystk-frontend-sample"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={['fab', 'github']} />
                    Github
                  </a>
                </li>
              </ul>
            </section>
            <section className="copylight">© 2020 isystk&apos;s sample</section>
          </div>
        </footer>
        <span id="page-top" className={scrollTopClass}>
          <a href="#" onClick={this.scrollToTop}>
            <FontAwesomeIcon icon="chevron-up" />
          </a>
        </span>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = { toggleMenu, closeMenu, showOverlay }

export default connect(null, mapDispatchToProps)(CommonFooter)
