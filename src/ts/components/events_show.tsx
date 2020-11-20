import * as React from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { getEvent, deleteEvent, putEvent } from "../actions";

// ↓ 表示用のデータ型
interface AppDispatchProperties {
  getEvent;
  deleteEvent;
  putEvent;
  match;
  history;
  handleSubmit;
  pristine;
  submitting;
  invalid;
}

export class EventsShow extends React.Component<AppDispatchProperties> {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) this.props.getEvent(id);
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

  async onDeleteClick() {
    const { id } = this.props.match.params;
    await this.props.deleteEvent(id);
    this.props.history.push("/");
  }

  async onSubmit(values) {
    await this.props.putEvent(values);
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
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field
              label="Title"
              name="title"
              type="text"
              component={this.renderField}
            />
          </div>
          <div>
            <Field
              label="Body"
              name="body"
              type="text"
              component={this.renderField}
            />
          </div>
          <RaisedButton
            label="登録"
            type="submit"
            style={style}
            disabled={pristine || submitting || invalid}
          />
          <RaisedButton
            label="キャンセル"
            style={style}
            containerElement={<Link to="/">キャンセル</Link>}
          />
          <RaisedButton
            label="削除"
            style={style}
            onClick={this.onDeleteClick}
          />
        </form>
      </React.Fragment>
    );
  }
}

const validate = (values) => {
  const errors = {
    title: "",
    body: "",
  };
  if (!values.title) errors.title = "Titleを入力して下さい";
  if (!values.body) errors.body = "Bodyを入力して下さい";
  return errors;
};

const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id];
  return { initialValues: event, event };
};

const mapDispatchToProps = { getEvent, deleteEvent, putEvent };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  // enableReinitialize をtrueにすると別ユーザーによってデータが変更されている場合でも常に最新のデータを取得して表示できる。
  reduxForm({ validate, form: "eventShowForm", enableReinitialize: true })(
    EventsShow
  )
);
