import * as React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { toggleMenu } from "../../actions";

interface AppDispatchProperties {
    toggleMenu;
}

export class CommonFooter extends React.Component<AppDispatchProperties> {

  render(): JSX.Element {
    return (
      <React.Fragment>
         <footer className="footer">
            <div className="wrapper">
              <nav className="footer-nav">
                <ul>
                  <li><a href="./top.html" ><FontAwesomeIcon icon="home" /></a></li>
                  <li><a href="#" className="js-overlay" data-panel="#sns-share-overlay"><FontAwesomeIcon icon="share-alt" /></a></li>
                  <li><a href="#" className="js-open-menu" onClick={this.props.toggleMenu}><FontAwesomeIcon icon="bars" /></a></li>
                  <li><a href="#" className="js-scroll-top"><FontAwesomeIcon icon="chevron-up" /></a></li>
                </ul>
              </nav>
              <section className="follow-links">
                <ul className="menu">
                  <li><a href="#" >プライバシーポリシー</a></li>
                  <li><a href="#" >お問い合わせ</a></li>
                  <li><a href="#" >RSS</a></li>
                </ul>
              </section>
              <section className="copylight">© 2020 isystk's blog</section>
            </div>
         </footer>
      </React.Fragment>
    );
  }
}


export default CommonFooter;
