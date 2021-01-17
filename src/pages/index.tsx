import React, { useEffect } from 'react'
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'
import Link from 'next/link'
import Layout from '@/components/Layout'
import * as _ from 'lodash'
import { URL } from '@/common/constants/url'
import { readPosts, showMv, hideMv } from '@/actions'
import Modal from '@/components/common/modal'
import SnsShare from '@/components/common/sns_share'

interface IProps {
  readPosts
  showMv
  hideMv
  posts
}

const renderPosts = (props: IProps) => {
  return _.map(props.posts, (post) => (
    <section key={post.postId}>
      <Link href={`${URL.POSTS}/${post.postId}`}>
        <a>
          <div className="entry-header">
            <div className="category_link">{post.tagName}</div>
            <h2 className="entry-title">{post.title}</h2>
            <div className="entry-meta">
              <span>{post.registTimeMMDD}</span>
            </div>
          </div>
          <div className="entry-content">
            <img
              alt="sample1"
              width="300"
              height="174"
              src={post.imageUrl}
              className="attachment-medium size-medium wp-post-image"
            />
            <p>{post.text}</p>
            <div className="clearfix"></div>
          </div>
        </a>
      </Link>
    </section>
  ))
}

const IndexPage = (props: IProps) => {
  useEffect(() => {
    // すべての投稿データを取得する
    props.readPosts()
    // メインビジュアルを表示する
    props.showMv()

    return () => {
      // メインビジュアルを非表示にする
      props.hideMv()
    }
  }, [])

  return (
    <Layout title="Isystk&rsquo;s Frontend Sample">
      <main>
        <div className="archive-top">
          <h1>投稿一覧</h1>
          <p></p>
          <p>すべてのユーザーの投稿を一覧で表示しています。</p>
        </div>
        <div className="box-list">{renderPosts(props)}</div>
      </main>
      <Modal>
        <SnsShare title="Isystk&rsquo;s Frontend Sample" url={URL.HOME} />
      </Modal>
    </Layout>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: _.map(state.posts, function (post) {
      return {
        postId: post.postId,
        tagName:
          post.tagNameList && 0 < post.tagNameList.length
            ? post.tagNameList[0]
            : '',
        title: post.title,
        text: post.text,
        registTimeMMDD: post.registTimeMMDD,
        imageUrl:
          post.imageList && 0 < post.imageList.length
            ? post.imageList[0].imageUrl
            : '',
      }
    }),
  }
}

const mapDispatchToProps = { readPosts, showMv, hideMv }

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
