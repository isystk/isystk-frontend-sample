import * as React from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {CommonHeader, CommonFooter} from "../common";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

import { toggleMenu, authLogin } from "../../actions";
import { SideMenu } from "../../StoreTypes";

// ↓ 表示用のデータ型
interface AppStateProperties {
  sideMenu: SideMenu;
}

interface AppDispatchProperties {
  toggleMenu;
  authLogin;
  history;
  handleSubmit;
  pristine;
  submitting;
  invalid;
}

export class AuthLogin extends React.Component<AppStateProperties & AppDispatchProperties> {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  renderField(field): JSX.Element {
    const {
      input,
      label,
      type,
      meta: { touched, error },
    } = field;
    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        {...input}
        fullWidth={true}
      />
    );
  }

  async onSubmit(values): Promise<void> {
    await this.props.authLogin(values);
    this.props.history.push("/");
  }

  render(): JSX.Element {
    // pristineは、フォームが未入力状態の場合にtrueを返す
    // submittingは、既にSubmit済みの場合にtrueを返す
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    const style = {
      margin: 12,
    };
    return (
      <React.Fragment>
        <CommonHeader sideMenu={this.props.sideMenu} toggleMenu={this.props.toggleMenu} />
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field
              label="ログインID"
              name="loginId"
              type="text"
              component={this.renderField}
            />
          </div>
          <div>
            <Field
              label="パスワード"
              name="password"
              type="password"
              component={this.renderField}
            />
          </div>
          <RaisedButton
            label="ログイン"
            type="submit"
            style={style}
            disabled={pristine || submitting || invalid}
          />
        </form>
        <CommonFooter toggleMenu={this.props.toggleMenu} />
      </React.Fragment>
    );
  }
}

const validate = (values) => {
  const errors = {
    loginId: "",
    password: "",
  };
  if (!values.loginId) errors.loginId = "ログインIDを入力して下さい";
  if (!values.password) errors.password = "パスワードを入力して下さい";
  return errors;
};

const mapStateToProps = (state, ownProps) => {
  return {
    sideMenu: state.sideMenu
  };
};

const mapDispatchToProps = { toggleMenu, authLogin };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ validate, form: "authLoginForm" })(AuthLogin));
