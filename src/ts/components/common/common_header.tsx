import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IState {
  isOpen: boolean;
}

export class CommonHeader extends React.Component<{}, IState> {

  constructor(props){
    super(props);
    this.state = {
        isOpen: false
    }
    this.menuClick = this.menuClick.bind(this);
  }

  menuClick(): void {
    this.setState({isOpen: !this.state.isOpen});
  }

  render(): JSX.Element {
    let sideMenuClass = this.state.isOpen ? "open" : "";
    let menuBtnClass = this.state.isOpen ? "menu-btn on" : "menu-btn";
    let layerPanelClass = this.state.isOpen ? "on" : "";

    return (
      <React.Fragment>
        <header className="header">
          <div className="wrapper">
              <div className="header-logo"><a href="#">ブログタイトル</a></div>
              <div className="nav">
                <div className="search">
                  <form role="search" method="get" action="#">
                    <FontAwesomeIcon className="search-icon" icon="search" />
                    <label>
                      <input type="search" placeholder="検索..." defaultValue="" name="s"/>
                    </label>
                  </form>
                </div>
                <div className={menuBtnClass} onClick={this.menuClick}><figure></figure><figure></figure><figure></figure></div>
                <div id="side-menu" className={sideMenuClass}>
                  <div className="side-menu-header">
                    <div className="search">
                      <form role="search" method="get" action="#">
                        <FontAwesomeIcon className="search-icon" icon="search" />
                        <label>
                          <input type="search" placeholder="検索..." defaultValue="" name="s"/>
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
                <div id="layer-panel" className={layerPanelClass}></div>
              </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}


export default connect(null, null)(CommonHeader);
