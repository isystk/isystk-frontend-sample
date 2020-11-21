import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class CommonFooter extends React.Component {
  render(): JSX.Element {
    return (
      <React.Fragment>
         <footer className="footer">
            <div className="wrapper">
              <nav className="footer-nav">
                <ul>
                  <li><a href="./top.html" ><i className="fas fa-home"></i></a></li>
                  <li><a href="#" className="js-overlay" data-panel="#sns-share-overlay"><i className="fas fa-share-alt"></i></a></li>
                  <li><a href="#" className="js-open-menu"><i className="fas fa-bars"></i></a></li>
                  <li><a href="#" className="js-scroll-top"><i className="fas fa-chevron-up"></i></a></li>
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


export default connect(null, null)(CommonFooter);
