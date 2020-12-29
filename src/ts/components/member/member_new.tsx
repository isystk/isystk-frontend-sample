import * as React from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Field, FieldArray, reduxForm, formValueSelector } from "redux-form";
import { Link } from "react-router-dom";
import * as _ from "lodash";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import FileUpload from "../common/file_upload";
import { postMemberPost } from "../../actions";
import { URL } from "../../common/constants/url";

interface IProps {
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

export class MemberNew extends React.Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.setImageList = this.setImageList.bind(this);
  }

  async onSubmit(values): Promise<void> {
    // 入力フォームをサーバーに送信する
    await this.props.postMemberPost(values);
    // マイページTOPに画面遷移する
    this.props.history.push(URL.MEMBER);
  }

  // 画像アップロード後のデータ更新処理
  setImageList(data) {
    const imageList = _.map(data, (image) => {
      return {
        imageId: image.imageId,
        imageUrl: image.imageUrlSquare
      }
    });
    if (!this.props.memberNewForm.values.imageList) {
      this.props.memberNewForm.values.imageList = [];
    }
    // 画像を追加
    this.props.memberNewForm.values.imageList = _.concat(this.props.memberNewForm.values.imageList, imageList);
    // TODO 自動でレンダリングされないので回避
    this.forceUpdate();
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

  render(): JSX.Element {
    // pristineは、フォームが未入力状態の場合にtrueを返す
    // submittingは、既にSubmit済みの場合にtrueを返す
    const { handleSubmit, pristine, submitting, invalid, memberNewForm } = this.props;

    if (!memberNewForm) {
      return null;
    }

    const style = {
      margin: 12,
    };
    return (
      <React.Fragment>
        <section>
          <div className="entry-header">
            <h1 className="entry-title">投稿登録</h1>
          </div>
          <div className="entry-content">
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
                  props={{ imageList: memberNewForm.values && memberNewForm.values.imageList }}
                  setImageList={this.setImageList}
                />
              </div>
              <RaisedButton
                label="キャンセル"
                style={style}
                containerElement={<Link to="/member">キャンセル</Link>}
              />
              <RaisedButton
                label="登録"
                type="submit"
                style={style}
                disabled={pristine || submitting || invalid}
              />
            </form>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const validate = (values) => {
  const errors = {
    title: "",
    text: "",
//     imageId: "",
  };
  if (!values.title) errors.title = "タイトルを入力して下さい";
  if (!values.text) errors.text = "本文を入力して下さい";
//   if (!values.imageId) errors.imageId = "画像を選択して下さい";
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
