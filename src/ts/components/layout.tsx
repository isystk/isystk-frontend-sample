import * as React from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import * as _ from "lodash";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {CommonHeader, CommonFooter} from "./common";
import { authCheck, authLogout, toggleMenu, closeMenu } from "../actions";
import { SideMenu, Auth } from "../StoreTypes";

// ↓ 表示用のデータ型
interface AppStateProperties {
  sideMenu: SideMenu;
  auth: Auth;
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

  logoutLink(): JSX.Element {

    const {auth} = this.props;

    if (auth.isLogin) {
      return (<a onClick={this.logoutClick}>ログアウト</a>);
    }
    return (<Link to={`/login/`}>ログイン</Link>);
  }

  render(): JSX.Element {
    return (
      <React.Fragment>
        <CommonHeader sideMenu={this.props.sideMenu} toggleMenu={this.props.toggleMenu} closeMenu={this.props.closeMenu} auth={this.props.auth} authLogout={this.props.authLogout} />

        {// メインビジュアル
        }
        <div className="mv">
            <img alt="main-visual" src="/assets/img/main-visual.jpg" width="100%"/>
            <div className="intro">
              <div className="box"><p className="title">フロントエンド サンプルアプリケーション</p></div>
            </div>
        </div>

        {// ナビゲーション（PC用）
        }
        <div id="pc-menu">
          <div className="wrapper">
            <nav>
              <ul>
                <li><Link to={`/`}>HOME</Link></li>
                <li><Link to={`/member/`}>マイページ</Link></li>
                <li>{this.logoutLink()}</li>
              </ul>
            </nav>
          </div>
        </div>

        {this.props.children}

        <CommonFooter toggleMenu={this.props.toggleMenu} closeMenu={this.props.closeMenu} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sideMenu: state.sideMenu,
    auth: state.auth
  };
};

const mapDispatchToProps = { authCheck, authLogout, toggleMenu, closeMenu };

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
