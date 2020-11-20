import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class Header extends React.Component {
  render(): JSX.Element {
    return (
      <React.Fragment>
        <header className="header">
          <div className="wrapper">
              <div className="header-logo"><a href="#">ブログタイトル</a></div>
              <div className="nav">
                <div className="search">
                  <form role="search" method="get" action="#">
                    <i className="fas fa-search search-icon"></i>
                    <label>
                      <input type="search" placeholder="検索..." value="" name="s"/>
                    </label>
                  </form>
                </div>
                <div className="menu-btn"><figure></figure><figure></figure><figure></figure></div>
                <div id="side-menu">
                  <div className="side-menu-header">
                    <div className="search">
                      <form role="search" method="get" action="#">
                        <i className="fas fa-search search-icon"></i>
                        <label>
                          <input type="search" placeholder="検索..." value="" name="s"/>
                        </label>
                      </form>
                    </div>
                  </div>
                  <nav>
                    <ul>
                      <li><a href="./top.html">HOME</a></li>
                      <li><a href="#" >メニューA</a></li>
                      <li><a href="#" >メニューB</a></li>
                      <li><a href="#" >メニューC</a></li>
                    </ul>
                  </nav>
                </div>
                <div id="layer-panel"></div>
              </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}


export default connect(null, null)(Header);
