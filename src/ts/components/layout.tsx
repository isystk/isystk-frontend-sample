import * as React from "react";
import { Children } from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import * as _ from "lodash";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {CommonHeader, CommonFooter} from "./common";
import { authCheck, authLogout, toggleMenu, closeMenu } from "../actions";
import { SideMenu, Auth, MainVisual } from "../store/StoreTypes";
import { URL } from "../common/constants/url";

// ↓ 表示用のデータ型
interface AppStateProperties {
  sideMenu: SideMenu;
  auth: Auth;
  mainVisual: MainVisual;
}
interface AppDispatchProperties {
  authCheck;
  authLogout;
  toggleMenu;
  closeMenu;
}

export class Layout extends React.Component<
  AppStateProperties & AppDispatchProperties,
  any
> {

  constructor(props) {
    super(props);
    this.logoutClick = this.logoutClick.bind(this);
  }

  componentDidMount(): void {
    this.props.authCheck();
  }

  async logoutClick() {
    await this.props.authLogout();
//     this.props.history.push("/");
  }

  // メインビジュアル
  mainVisual(): JSX.Element {
    if (this.props.mainVisual.isShow) {
      return (<div className="mv">
            <img alt="main-visual" src="/assets/img/main-visual.jpg" width="100%"/>
            <div className="intro">
              <div className="box"><p className="title">フロントエンド サンプルアプリケーション</p></div>
            </div>
        </div>);
    }
  }

  logoutLink(): JSX.Element {

    const {auth} = this.props;

    if (auth.isLogin) {
      return (<a onClick={this.logoutClick}>ログアウト</a>);
    }
    return (<Link to={URL.LOGIN}>ログイン</Link>);
  }

  render(): JSX.Element {

//     const parentProp = {showMainVisual: this.showMainVisual}
//     const childrenWithProps = Children.map(
//       this.props.children,
//       (child) => {
//         return React.cloneElement(child as React.ReactElement<any>, parentProp);
//       },
//     );

    return (
      <React.Fragment>
        <CommonHeader sideMenu={this.props.sideMenu} toggleMenu={this.props.toggleMenu} closeMenu={this.props.closeMenu} auth={this.props.auth} authLogout={this.props.authLogout} />

        { this.mainVisual() }

        {// ナビゲーション（PC用）
        }
        <div id="pc-menu">
          <div className="wrapper">
            <nav>
              <ul>
                <li><Link to={URL.HOME}>HOME</Link></li>
                <li><Link to={URL.MEMBER}>マイページ</Link></li>
                <li>{this.logoutLink()}</li>
              </ul>
            </nav>
          </div>
        </div>

        { this.props.children }

        <CommonFooter toggleMenu={this.props.toggleMenu} closeMenu={this.props.closeMenu} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sideMenu: state.sideMenu,
    auth: state.auth,
    mainVisual: state.mainVisual
  };
};

const mapDispatchToProps = { authCheck, authLogout, toggleMenu, closeMenu };

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
