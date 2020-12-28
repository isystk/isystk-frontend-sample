import * as React from "react";
import { Children } from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import * as _ from "lodash";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import FileUpload from "../common/file_upload";
import { getMemberPost, deleteMemberPost, putMemberPost } from "../../actions";
import { Post } from "../../store/StoreTypes";
import { URL } from "../../common/constants/url";

// ↓ 表示用のデータ型
interface AppStateProperties {
}

interface AppDispatchProperties {
  getMemberPost;
  deleteMemberPost;
  putMemberPost;
  match;
  history;
  handleSubmit;
  pristine;
  submitting;
  invalid;
  memberPost;
}

interface IState {
}

export class MemberShow extends React.Component<AppStateProperties & AppDispatchProperties, IState> {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.setImageList = this.setImageList.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (id) await this.props.getMemberPost(id);
  }

  renderField(field): JSX.Element {
    const style = {
      textAlign: 'left' as const,
      margin: 10
    };

    const {
      input,
      label,
      type,
      meta: { touched, error },
    } = field;
    return (
      <React.Fragment>
        <p style={style}>{label}</p>
        <TextField
          hintText={label}
          type={type}
          errorText={touched && error}
          {...input}
          fullWidth={true}
        />
      </React.Fragment>
    );
  }

  async onDeleteClick() {
    const { id } = this.props.match.params;
    await this.props.deleteMemberPost(id);
    this.props.history.push(URL.MEMBER);
  }

  async onSubmit(values): Promise<void> {
    await this.props.putMemberPost(values);
    this.props.history.push(URL.MEMBER);
  }

  setImageList(data) {
    const imageList = _.map(data, (image) => {
      return {
        imageId: image.imageId,
        imageUrl: image.imageUrlSquare
      }
    });
    // 画像を追加
    this.props.memberPost.imageList = _.concat(this.props.memberPost.imageList, imageList);
    this.forceUpdate();
  }

  render(): JSX.Element {
    // pristineは、フォームが未入力状態の場合にtrueを返す
    // submittingは、既にSubmit済みの場合にtrueを返す
    const { handleSubmit, pristine, submitting, invalid } = this.props;

    const { memberPost } = this.props;
    if (!memberPost) return null;

    const style = {
      margin: 12,
    };

    return (
      <React.Fragment>
        <section>
          <div className="entry-header">
            <h1 className="entry-title">投稿編集</h1>
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
                  props={{ imageList: memberPost.imageList }}
                  setImageList={this.setImageList}
                />
              </div>
              <RaisedButton
                label="キャンセル"
                style={style}
                containerElement={<Link to="/member">キャンセル</Link>}
              />
              <RaisedButton
                label="削除"
                style={style}
                onClick={this.onDeleteClick}
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
    imageList: "",
  };
  if (!values.title) errors.title = "タイトルを入力して下さい";
  if (!values.text) errors.text = "本文を入力して下さい";
  if (!values.imageList) errors.imageList = "画像を選択して下さい";
  return errors;
};

const mapStateToProps = (state, ownProps) => {
  const memberPost = state.memberPosts[ownProps.match.params.id];
  return {
    initialValues: memberPost,
    memberPost
  };
};

const mapDispatchToProps = { getMemberPost, deleteMemberPost, putMemberPost };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  // enableReinitialize をtrueにすると別ユーザーによってデータが変更されている場合でも常に最新のデータを取得して表示できる。
  reduxForm({ validate, form: "memberShowForm", enableReinitialize: true })(
    MemberShow
  )
);
