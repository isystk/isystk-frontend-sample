import * as React from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Field, reduxForm, getFormValues } from "redux-form";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import * as _ from "lodash";
import { readConst } from "../../actions";

import { registMail } from "../../actions";
import { Consts, User } from "../../store/StoreTypes";

// ↓ 表示用のデータ型
interface IProps {
  consts: {
    sex: Consts,
    prefecture: Consts,
  };
  user: User;
  readConst;
  registMail;
  history;
  handleSubmit;
  pristine;
  submitting;
  invalid;
}

interface IState {
}

export class EntryRegistConfirm extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    this.props.readConst();
  }

  renderFields(label, value): JSX.Element {
    return (
      <React.Fragment>
        <p><label>{label}</label></p>
        {value}
      </React.Fragment>
    )
  }

  render(): JSX.Element {
    // pristineは、フォームが未入力状態の場合にtrueを返す
    // submittingは、既にSubmit済みの場合にtrueを返す
    const { handleSubmit, pristine, submitting, invalid, user } = this.props;
    const style = {
      margin: 12,
    };

    return (
      <React.Fragment>
        <section>
          <div className="entry-header">
            <h1 className="entry-title">会員登録確認</h1>
          </div>
          <div className="entry-content">
            <div>
              <p><label>お名前</label></p>
              {this.renderFields('姓', user.familyName)}
              {this.renderFields('名', user.name)}
            </div>
            <div>
              <p><label>お名前カナ</label></p>
              {this.renderFields('セイ', user.familyNameKana)}
              {this.renderFields('メイ', user.nameKana)}
            </div>
            <div>
              {this.renderFields('メールアドレス', user.email)}
            </div>
            <div>
              {this.renderFields('性別', user.sex && ( () => _.mapKeys(this.props.consts.sex, "code")[user.sex].text) )}
            </div>
            <div>
              {this.renderFields('郵便番号', user.zip)}
              {this.renderFields('都道府県', user.prefectureId && ( () => _.mapKeys(this.props.consts.prefecture, "code")[user.prefectureId].text) )}
              {this.renderFields('市区町村', user.area)}
              {this.renderFields('町名番地', user.address)}
              {this.renderFields('建物名', user.building)}
            </div>
            <div>
              {this.renderFields('電話番号', user.tel)}
            </div>
            <div>
              {this.renderFields('誕生日', user.birthday)}
            </div>
            <RaisedButton
              label="戻る"
              style={style}
              containerElement={<Link to="/entry/regist">戻る</Link>}
            />
            <RaisedButton
              label="登録する"
              type="button"
              onClick={async (e)=> {
                e.preventDefault();
                await this.props.registMail(this.props.user);
                this.props.history.push("/entry/regist/complete/");
              }}
              style={style}
            />
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    consts: state.consts,
    user: state.users,
  };
};

const mapDispatchToProps = { readConst, registMail };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryRegistConfirm);
