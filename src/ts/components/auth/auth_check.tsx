import * as React from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Auth } from "../../store/StoreTypes";
import { Link, withRouter } from "react-router-dom";

import { authCheck } from "../../actions";

interface IProps {
  auth: Auth;
  authCheck;
  history;
}

interface IState {
}

export class AuthCheck extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.checkAuth();
  }

  async checkAuth() {
    await this.props.authCheck();

    // ログインしてなければログイン画面へとばす
    if (!this.props.auth.isLogin) {
      this.props.history.push("/login?redirectUrl="+ window.location);
    }
  }

  render() {
    return (
      <React.Fragment>{this.props.children}</React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = { authCheck };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AuthCheck));
