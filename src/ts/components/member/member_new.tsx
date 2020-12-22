import * as React from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Field, FieldArray, reduxForm, formValueSelector } from "redux-form";
import { Link } from "react-router-dom";
import * as _ from "lodash";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import FileUpload from "../common/file_upload";
import { postMemberPost } from "../../actions";
import { Post } from "../../store/StoreTypes";
import { URL } from "../../common/constants/url";
const selector = formValueSelector('memberNewForm')

// ↓ 表示用のデータ型
interface AppStateProperties {
}

interface AppDispatchProperties {
  postMemberPost;
  history;
  handleSubmit;
  pristine;
  submitting;
  invalid;
  memberNewForm;
}

interface IState {
}

export class MemberNew extends React.Component<AppStateProperties & AppDispatchProperties, IState> {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.setImageList = this.setImageList.bind(this);
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
    console.log(values);
//     await this.props.postMemberPost(values);
//     this.props.history.push(URL.MEMBER);
  }

  setImageList(data) {
    const imageList = _.map(data, (image) => {
      return {
        imageId: image.imageId,
        imageUrl: image.imageUrlSquare
      }
    });
    // 画像を追加
    if (!this.props.memberNewForm.values.imageList) {
      this.props.memberNewForm.values.imageList = [];
    }
    this.props.memberNewForm.values.imageList = _.concat(this.props.memberNewForm.values.imageList, imageList);
    console.log(this.props.memberNewForm.values.imageList);
//     this.setState({ form: {memberNewForm: this.props.memberNewForm}});
    this.forceUpdate();
  }

  render(): JSX.Element {
    // pristineは、フォームが未入力状態の場合にtrueを返す
    // submittingは、既にSubmit済みの場合にtrueを返す
    const { handleSubmit, pristine, submitting, invalid, memberNewForm } = this.props;

    if (!memberNewForm) {
      return null;
    }

    if (!memberNewForm.values) {
      memberNewForm.values = {}
    }

    const style = {
      margin: 12,
    };
    return (
      <React.Fragment>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field
              label="タイトル"
              name="title"
              type="text"
              component={this.renderField}
            />
          </div>
          <div>
            <Field
              label="本文"
              name="text"
              type="text"
              component={this.renderField}
            />
          </div>
          <div>
            <FieldArray
              label="画像"
              name="imageList"
              component={FileUpload}
              props={{ imageList: memberNewForm.values.imageList }}
              setImageList={this.setImageList}
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
        </form>
      </React.Fragment>
    );
  }
}

const validate = (values) => {
  const errors = {
    title: "",
    text: "",
    imageList: "",
  };
  if (!values.title) errors.title = "タイトルを入力して下さい";
  if (!values.text) errors.text = "本文を入力して下さい";
  if (!values.imageList) errors.imageList = "画像を選択して下さい";
  return errors;
};

const mapStateToProps = (state, ownProps) => {
  const { memberNewForm } = state.form;
  return {
    memberNewForm
  };
};

const mapDispatchToProps = { postMemberPost };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ validate, form: "memberNewForm" })(MemberNew));
