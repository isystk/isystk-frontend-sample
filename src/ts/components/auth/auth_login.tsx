import * as React from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link, withRouter } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

import { Auth } from "../../StoreTypes";
import { authCheck, authLogin } from "../../actions";

// ↓ 表示用のデータ型
interface AppStateProperties {
  auth: Auth;
}

interface AppDispatchProperties {
  authCheck;
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

  componentWillMount() {
    this.checkAuth();
  }

  async checkAuth() {

    await this.props.authCheck();

    // 既にログイン済みの場合はマイページ画面へとばす
    if (this.props.auth.isLogin) {
      this.props.history.push("/member");
    }
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

    const { auth } = this.props;

    if (auth.isLogin) {
      this.props.history.push("/member");
    }

  }

  render(): JSX.Element {
    // pristineは、フォームが未入力状態の場合にtrueを返す
    // submittingは、既にSubmit済みの場合にtrueを返す
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    const style = {
      margin: 12,
    };
//     const { auth } = this.props;
// console.log(auth)
    return (
      <React.Fragment>
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
    auth: state.auth
  };
};

const mapDispatchToProps = { authCheck, authLogin };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ validate, form: "authLoginForm" })(withRouter(AuthLogin)));
