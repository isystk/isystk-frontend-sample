import * as React from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import * as _ from "lodash";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

import AppStore from "../../Store";
import { readPosts } from "../../actions";
import { Posts, Post } from "../../StoreTypes";

// ↓ 表示用のデータ型
interface AppStateProperties {
  posts: AppStateProperty[];
}
interface AppStateProperty {
  id: number;
  text: string;
}

interface AppDispatchProperties {
  readPosts;
}

export class PostsIndex extends React.Component<
  AppStateProperties & AppDispatchProperties,
  any
> {
  componentDidMount(): void {
    this.props.readPosts();
  }

  renderPosts(): JSX.Element {

    return _.map(this.props.posts, (post) => (
      <section key={post.postId}>
        <Link to={`/posts/${post.postId}`}>
          <div className="entry-header">
            <div className="category_link">{post.tagName}</div>
            <h2 className="entry-title">{post.title}</h2>
            <div className="entry-meta">
              <span>
                {post.registTimeMMDD}
              </span>
            </div>
          </div>
          <div className="entry-content">
            <img alt="sample1" width="300" height="174" src={post.imageUrl} className="attachment-medium size-medium wp-post-image" />
            <p>{post.text}</p>
            <div className="clearfix"></div>
          </div>
        </Link>
      </section>
    ));
  }

  render(): JSX.Element {
    const style = {
      position: "fixed",
      right: 12,
      bottom: 12,
    };
    return (
      <React.Fragment>
        {// メインビジュアル
        }
        <div className="mv">
            <img alt="main-visual" src="/assets/img/main-visual.jpg" width="100%"/>
            <div className="intro">
              <div className="box"><p className="title">フロントエンド サンプルアプリケーション</p></div>
            </div>
        </div>

        {// ナビゲーション（PC用）
        }
        <div id="pc-menu">
          <div className="wrapper">
            <nav>
              <ul>
                <li><Link to={`/`}>HOME</Link></li>
                <li><Link to={`/member/`}>マイページ</Link></li>
                <li><Link to={`/login/`}>ログイン</Link></li>
              </ul>
            </nav>
          </div>
        </div>

        {// コンテンツ
        }
        <div className="contents ">
          <div className="wrapper">
            <main>
              <div className="archive-top">
                <h1>投稿一覧</h1>
                <p></p>
                <p>すべてのユーザーの投稿を一覧で表示しています。</p>
              </div>
              <div className="box-list">
               {this.renderPosts()}
              </div>
            </main>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: _.map(state.posts, function (post) {
      return {
        postId: post.postId,
        tagName: (post.tagNameList && 0<post.tagNameList.length) ? post.tagNameList[0] : '',
        title: post.title,
        text: post.text,
        registTimeMMDD: post.registTimeMMDD,
        imageUrl: (post.imageUrlList && 0<post.imageUrlList.length) ? post.imageUrlList[0] : ''
      };
    })
  };
};

const mapDispatchToProps = { readPosts };

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);
