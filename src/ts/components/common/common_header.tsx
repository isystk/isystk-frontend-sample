import * as React from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import * as _ from "lodash";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { toggleMenu } from "../../actions";

interface AppStateProperties {
    sideMenu: SideMenu;
}
interface SideMenu {
    isOpen: boolean;
}
interface AppDispatchProperties {
    toggleMenu;
}

export class CommonHeader extends React.Component<
    any,
    any
    > {

  render(): JSX.Element {

    let isOpen = this.props.sideMenu.isOpen;
    let sideMenuClass = isOpen ? "open" : "";
    let menuBtnClass = isOpen ? "menu-btn on" : "menu-btn";
    let layerPanelClass = isOpen ? "on" : "";

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
                <div className={menuBtnClass} onClick={this.props.toggleMenu}><figure></figure><figure></figure><figure></figure></div>
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


// const mapStateToProps = (state, ownProps) => {
//   return { sideMenu: state.sideMenu };
// };
//
// const mapDispatchToProps = { toggleMenu };
//
// export default connect(mapStateToProps, mapDispatchToProps)(CommonHeader);


export default CommonHeader;