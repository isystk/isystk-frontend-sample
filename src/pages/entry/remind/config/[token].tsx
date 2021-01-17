import * as React from 'react'
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'
import { Field, reduxForm, getFormValues } from 'redux-form'
import Link from 'next/link'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import * as _ from 'lodash'
import { URL } from '@/common/constants/url'
import { remindCheck, remindRegist } from '@/actions'
import { Remind } from '@/store/StoreTypes'
import Router, { withRouter } from 'next/router'
import Layout from '@/components/Layout'

interface IProps {
  token: string
  remind: Remind
  remindCheck
  remindRegist
  match
  history
  error
  handleSubmit
  pristine
  submitting
  invalid
  query
}

interface IState {}

class EntryRemindConfig extends React.Component<IProps, IState> {
  // パスからパラメータを取得する
  static async getInitialProps({ pathname, query, asPath }) {
    return { pathname, query, asPath }
  }

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  async componentDidMount() {
    if (this.props.query.token)
      await this.props.remindCheck(this.props.query.token)

    if (!this.props.remind.isValid) {
      alert('NotFound')
    }
  }

  renderField(field): JSX.Element {
    const {
      input,
      label,
      type,
      meta: { touched, error },
    } = field
    return (
      <React.Fragment>
        <p>
          <label>{label}</label>
        </p>
        <TextField
          type={type}
          errorText={touched && error}
          {...input}
          fullWidth={true}
        />
      </React.Fragment>
    )
  }

  async onSubmit(values): Promise<void> {
    await this.props.remindRegist(values)
    Router.push(URL.ENTRY_REMIND_CONFIG_COMPLETE)
  }

  render(): JSX.Element {
    // pristineは、フォームが未入力状態の場合にtrueを返す
    // submittingは、既にSubmit済みの場合にtrueを返す
    const {
      error,
      handleSubmit,
      pristine,
      submitting,
      invalid,
      remind,
    } = this.props
    const style = {
      margin: 12,
    }

    if (!remind) {
      return (
        <React.Fragment>
          <div>Loading...</div>
        </React.Fragment>
      )
    }

    return (
      <Layout title="パスワード変更">
        <section>
          <div className="entry-header">
            <h1 className="entry-title">パスワード変更</h1>
          </div>
          <div className="entry-content">
            <p>新しいパスワードを入力して下さい。</p>

            <form onSubmit={handleSubmit(this.onSubmit)}>
              {error && <div className="error">{error}</div>}
              <Field name="onetimeKey" type="hidden" component="input" />
              <div>
                <Field
                  label="パスワード"
                  name="password"
                  type="password"
                  component={this.renderField}
                />
                <Field
                  label="パスワード確認"
                  name="passwordConf"
                  type="password"
                  component={this.renderField}
                />
              </div>
              <RaisedButton
                label="キャンセル"
                style={style}
                onClick={(e) => {
                  e.preventDefault()
                  Router.push(URL.LOGIN)
                }}
              />
              <RaisedButton
                label="登録する"
                type="submit"
                style={style}
                disabled={pristine || submitting || invalid}
              />
            </form>
          </div>
        </section>
      </Layout>
    )
  }
}

const validate = (values) => {
  const errors = {
    onetimeKey: '',
    password: '',
    passwordConf: '',
  }
  if (!values.onetimeKey) errors.onetimeKey = 'トークンは必須です'
  if (!values.password) errors.password = 'パスワードを入力して下さい'
  if (!values.passwordConf)
    errors.passwordConf = 'パスワード確認を入力して下さい'
  if (values.password !== values.passwordConf)
    errors.passwordConf = '入力されたパスワードが一致しません'
  return errors
}

const mapStateToProps = (state, ownProps) => {
  const token = ownProps.query.token
  return {
    initialValues: { onetimeKey: token },
    remind: state.remind,
  }
}

const mapDispatchToProps = { remindCheck, remindRegist }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    validate,
    form: 'entryRemindConfigForm',
    enableReinitialize: true,
  })(EntryRemindConfig)
)
