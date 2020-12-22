import * as React from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import * as _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";
import { URL } from "../../common/constants/url";

import AppStore from "../../store/Store";
import { readMemberPosts } from "../../actions";
import { Events, Event } from "../../store/StoreTypes";

// ↓ 表示用のデータ型
interface AppStateProperties {
  posts: AppStateProperty[];
}
interface AppStateProperty {
  id: number;
  text: string;
}

interface AppDispatchProperties {
  readMemberPosts;
}

export class MemberIndex extends React.Component<
  AppStateProperties & AppDispatchProperties,
  any
> {
  componentDidMount(): void {
    this.props.readMemberPosts();
  }

  renderPosts(): JSX.Element {
    return _.map(this.props.posts, (post) => {

      const imageList = _.map(post.imageList, (image, index) => (
        <img src={image.imageUrl} width="100px" key={`image${index}`} />
      ));

      return <TableRow key={post.postId}>
        <TableRowColumn width="60px">{post.postId}</TableRowColumn>
        <TableRowColumn width="120px">{post.title}</TableRowColumn>
        <TableRowColumn>{ imageList }</TableRowColumn>
        <TableRowColumn width="120px">{post.registTime}</TableRowColumn>
        <TableRowColumn width="100px">
          <Link to={`${URL.MEMBER_POSTS}/p${post.postId}`}>詳細</Link>
        </TableRowColumn>
      </TableRow>
    });
  }

  render(): JSX.Element {
    return (
      <React.Fragment>
        <Link to={URL.MEMBER_POSTS_NEW}>新規登録</Link>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableRowColumn width="60px">ID</TableRowColumn>
              <TableRowColumn width="120px">タイトル</TableRowColumn>
              <TableRowColumn>画像</TableRowColumn>
              <TableRowColumn width="120px">投稿日時</TableRowColumn>
              <TableRowColumn width="100px"><br/></TableRowColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.renderPosts()}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    posts: _.map(state.memberPosts, function (post) {
      return {
        postId: post.postId,
        tagName: (post.tagNameList && 0<post.tagNameList.length) ? post.tagNameList[0] : '',
        title: post.title,
        text: post.text,
        registTime: moment(post.registTime).format('yyyy/MM/DD HH:mm:ss'),
        imageList: (post.imageList && 0<post.imageList.length) ? post.imageList : []
      };
    })
  };
};

const mapDispatchToProps = { readMemberPosts };

export default connect(mapStateToProps, mapDispatchToProps)(MemberIndex);
