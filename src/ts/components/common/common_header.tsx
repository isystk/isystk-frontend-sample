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
              <div className="header-logo"><Link to={`/`}>Isystk's Frontend Sample</Link></div>
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
                      <li><Link to={`/`}>HOME</Link></li>
                      <li><Link to={`/member/`}>マイページ</Link></li>
                      <li><Link to={`/login/`}>ログイン</Link></li>
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