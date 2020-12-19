import * as React from "react";
import { Children } from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Field, FieldArray, Button, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import * as _ from "lodash";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import FileUpload from "../common/file_upload";
import { getMemberPost, deleteMemberPost, putMemberPost } from "../../actions";
import { Post } from "../../StoreTypes";

// ↓ 表示用のデータ型
interface AppStateProperties {
  initialValues: Post;
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
  memberPost: Post;
}

export class MemberShow extends React.Component<AppStateProperties & AppDispatchProperties, IState> {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.setImageList = this.setImageList.bind(this);

    this.state = {
      memberPost: {} as Post
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (id) await this.props.getMemberPost(id);

    this.setState({
      memberPost: this.props.initialValues
    });
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
    this.props.history.push("/member/");
  }

  async onSubmit(values) {
//     await this.props.putMemberPost(values);
    await this.props.putMemberPost(this.state.memberPost);
//     this.props.history.push("/member/");
  }

  setImageList(imageList) {
    const { memberPost } = this.state;
    this.setState({
      memberPost: {
        ...memberPost,
        imageList: _.map(imageList, (image, index) => (
          {
            imageId: image.imageId,
            imageUrl: image.imageUrlSquare
          }
        ))
      }
    });
  }

  render(): JSX.Element {
    // pristineは、フォームが未入力状態の場合にtrueを返す
    // submittingは、既にSubmit済みの場合にtrueを返す
    const { handleSubmit, pristine, submitting, invalid } = this.props;

    const { memberPost } = this.state;
    if (!memberPost) return null;

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
              type="text"
              component={FileUpload}
              props={
                {
                  imageList: memberPost.imageList
                }
              }
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
            containerElement={<Link to="/member/">キャンセル</Link>}
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
    initialValues: memberPost
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
