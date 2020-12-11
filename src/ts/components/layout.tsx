import * as React from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import * as _ from "lodash";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {CommonHeader, CommonFooter} from "./common";
import { toggleMenu } from "../actions";
import { SideMenu } from "../StoreTypes";

// ↓ 表示用のデータ型
interface AppStateProperties {
  sideMenu: SideMenu;
}
interface AppDispatchProperties {
  toggleMenu;
}

export class Layout extends React.Component<
  AppStateProperties & AppDispatchProperties,
  any
> {
  componentDidMount(): void {
  }

  render(): JSX.Element {
    return (
      <React.Fragment>
        <CommonHeader sideMenu={this.props.sideMenu} toggleMenu={this.props.toggleMenu} />

        {this.props.children}

        <CommonFooter toggleMenu={this.props.toggleMenu} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sideMenu: state.sideMenu
  };
};

const mapDispatchToProps = { toggleMenu };

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
