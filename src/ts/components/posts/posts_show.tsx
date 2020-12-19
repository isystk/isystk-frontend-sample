import * as React from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as _ from "lodash";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { getPost } from "../../actions";
import { Post } from "../../StoreTypes";

// ↓ 表示用のデータ型
interface AppStateProperties {
  post: Post;
}

interface AppDispatchProperties {
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
    return _.map(this.props.post.imageList, (image, index) => (
      <img alt="sample1" width="644" src={image.imageUrl} key={index} />
    ));
  }

  renderPostTags(): JSX.Element {
    return _.map(this.props.post.tagNameList, (tagName, index) => (
      <li><a href="#" rel="tag" key={index}>{tagName}</a></li>
    ));
  }
  render(): JSX.Element {

    if (!this.props.post) return (<React.Fragment></React.Fragment>);

    return (
      <React.Fragment>

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
                      <Link to={`/`}>
                        <FontAwesomeIcon icon="home" /><span>HOME</span>
                      </Link>
                    </li>
                    <li>
                      {this.props.post.title}
                    </li>
                  </ul>
                </nav>

                <div className="entry-header">
                  <h1 className="entry-title">{this.props.post.title}</h1>
                  <div className="article-img">
                    {this.renderPostImages()}
                  </div>
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
                  {this.props.post.registTimeMMDD}
                </div>
                <div className="entry-tags">
                  <div className="section-tag">
                    <ul><li>タグ： </li>{this.renderPostTags()}</ul>          </div>
                </div>

                <ul className="sns-buttons">
                  <li className="share-twitter">
                  <a href={'http://twitter.com/intent/tweet?text='+this.props.post.title+'%20http://blog.isystk.com/'} target="_blank" rel="noreferrer">Twitter</a>
                  </li>
                  <li className="share-facebook">
                  <a href="https://www.facebook.com/sharer/sharer.php?u=http://blog.isystk.com/" target="_blank" rel="noreferrer">Facebook</a>
                  </li>
                  <li className="share-hatena">
                  <a href={'http://b.hatena.ne.jp/add?mode=confirm&url=http://blog.isystk.com/&title='+this.props.post.title} target="_blank" rel="noreferrer">はてブ</a>
                  </li>
                  <li className="share-pocket">
                  <a href="http://getpocket.com/edit?url=http://blog.isystk.com/" target="_blank" rel="noreferrer">Pocket</a>
                  </li>
                  <li className="share-line">
                  <a href={'http://line.me/R/msg/text/?'+this.props.post.title+'%0D%0Ahttp://blog.isystk.com/'} target="_blank" rel="noreferrer">LINE</a>
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

      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const post = state.posts[ownProps.match.params.id];
  return {
    initialValues: post,
    post
  };
};

const mapDispatchToProps = { getPost };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  PostsShow
);
