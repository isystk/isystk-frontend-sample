import * as React from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as _ from "lodash";
import {CommonHeader, CommonFooter} from "../common";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { toggleMenu, getPost } from "../../actions";
import { SideMenu, Post } from "../../StoreTypes";

// ↓ 表示用のデータ型
interface AppStateProperties {
  post: Post;
  sideMenu: SideMenu;
}

interface AppDispatchProperties {
  toggleMenu;
  getPost;
  match;
  history;
}

export class PostsShow extends React.Component<AppStateProperties & AppDispatchProperties> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) this.props.getPost(id);
  }

  renderPostImages(): JSX.Element {
    return _.map(this.props.post.imageUrlList, (imageUrl) => (
      <img alt="sample1" width="644" src={imageUrl} />
    ));
  }

  render(): JSX.Element {

    if (!this.props.post) return (<React.Fragment></React.Fragment>);

    return (
      <React.Fragment>
        <CommonHeader sideMenu={this.props.sideMenu} toggleMenu={this.props.toggleMenu} />

        {//<!-- ナビゲーション（PC用） -->
        }
        <div id="pc-menu">
          <div className="wrapper">
            <nav>
              <ul>
                <li><a href="./top.html">HOME</a></li>
                <li className="page_item "><a href="#">メニューA</a></li>
                <li className="page_item "><a href="#">メニューB</a></li>
                <li className="page_item "><a href="#">メニューC</a></li>
              </ul>
            </nav>
          </div>
        </div>

        {//<!-- コンテンツ -->
        }
        <div className="contents">
          <div className="wrapper">
            <main>

              <section>

                {//<!-- パンくず -->
                }
                <nav className="breadcrumb">
                  <ul>
                    <li>
                      <a href="./top.html">
                        <i className="fas fa-home"></i><span>HOME</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span>カテゴリー１</span>
                      </a>
                    </li>
                    <li>
                      <span>カテゴリー１－１</span>
                    </li>
                  </ul>
                </nav>

                <div className="entry-header">
                  <h1 className="entry-title">{this.props.post.title}</h1>
                  <div className="article-img">
                    {this.renderPostImages()}
                  </div>
                  <ul className="sns-buttons">
                    <li className="share-twitter">
                    <a href="http://twitter.com/intent/tweet?text=タイトル%20http://blog.isystk.com/" target="_blank" rel="noreferrer">Twitter</a>
                    </li>
                    <li className="share-facebook">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=http://blog.isystk.com/" target="_blank" rel="noreferrer">Facebook</a>
                    </li>
                    <li className="share-hatena">
                    <a href="http://b.hatena.ne.jp/add?mode=confirm&url=http://blog.isystk.com/&title=タイトル" target="_blank" rel="noreferrer">はてブ</a>
                    </li>
                    <li className="share-pocket">
                    <a href="http://getpocket.com/edit?url=http://blog.isystk.com/" target="_blank" rel="noreferrer">Pocket</a>
                    </li>
                    <li className="share-line">
                    <a href="http://line.me/R/msg/text/?タイトル%0D%0Ahttp://blog.isystk.com/" rel="noreferrer">LINE</a>
                    </li>
                  </ul>
                  <div className=" clearfix"></div>
                </div>
                <div className="entry-content">
                  <p>{this.props.post.text}</p>
                </div>
                <div className="clearfix"></div>
                <div className="sns-buttons">
                  <ul className="sns-button">
                    <li><div className="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="button" data-action="like" data-size="small" data-share="true"></div></li>
                    <li><a href="https://twitter.com/share" className="twitter-share-button">Tweet</a></li>
                  </ul>
                </div>
                <div className="clearfix"></div>
                <div className="entry-meta">
                  <FontAwesomeIcon icon="clock" />
                  2020年3月2日
                  <span> / </span>
                  <span className="cat-data">
                    <a href="#" rel="category tag">カテゴリー</a>
                  </span>
                  <span> / </span>
                  <span className="post_comments_link">
                    コメント数(0)
                  </span>
                </div>
                <div className="entry-tags">
                  <div className="section-tag">
                    <ul><li>タグ： </li><li><a href="https://blog.isystk.com/tag/docker/" rel="tag">Docker</a></li><li><a href="https://blog.isystk.com/tag/java/" rel="tag">Java</a></li></ul>          </div>
                </div>

                <ul className="sns-buttons">
                  <li className="share-twitter">
                  <a href="http://twitter.com/intent/tweet?text=タイトル%20http://blog.isystk.com/" target="_blank" rel="noreferrer">Twitter</a>
                  </li>
                  <li className="share-facebook">
                  <a href="https://www.facebook.com/sharer/sharer.php?u=http://blog.isystk.com/" target="_blank" rel="noreferrer">Facebook</a>
                  </li>
                  <li className="share-hatena">
                  <a href="http://b.hatena.ne.jp/add?mode=confirm&url=http://blog.isystk.com/&title=タイトル" target="_blank" rel="noreferrer">はてブ</a>
                  </li>
                  <li className="share-pocket">
                  <a href="http://getpocket.com/edit?url=http://blog.isystk.com/" target="_blank" rel="noreferrer">Pocket</a>
                  </li>
                  <li className="share-line">
                  <a href="http://line.me/R/msg/text/?タイトル%0D%0Ahttp://blog.isystk.com/" target="_blank" rel="noreferrer">LINE</a>
                  </li>
                </ul>
                <div className=" clearfix"></div>

              </section>

            </main>

            {//<!-- サイドメニュー -->
            }
            <aside className="side-left" >
              <div id="sticky">
                <div id="sticky-navigator"></div>
              </div>
            </aside>

          </div>
        </div>

        <CommonFooter toggleMenu={this.props.toggleMenu} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const post = state.posts[ownProps.match.params.id];
  return {
    initialValues: post,
    post,
    sideMenu: state.sideMenu
  };
};

const mapDispatchToProps = { toggleMenu, getPost };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  PostsShow
);
