import React, { useState, useEffect } from 'react'
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'
import * as _ from 'lodash'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getPost } from '@/actions'
import { Post } from '@/store/StoreTypes'
import { URL } from '@/common/constants/url'
import { SimpleSlider } from '@/components/common/slider'
import Modal from '@/components/common/modal'
import SnsShare from '@/components/common/sns_share'
import { useRouter } from 'next/router'
import { API_ENDPOINT } from '@/common/constants/api'

// for ssg
import fetch from 'node-fetch'
import https from 'https'
const agent = new https.Agent({
  rejectUnauthorized: false,
})

// ↓ 表示用のデータ型
interface IProps {
  post: Post
  getPost
  match
  history
}

interface IState {}

const initialState: Post = {
  postId: null,
  title: '',
  text: '',
  registTimeMMDD: '',
  imageList: [],
  tagList: [],
}

const PostsShow = (props: IProps) => {
  const router = useRouter()
  const [id, setId] = useState()

  // この部分を追加
  useEffect(() => {
    // idがqueryで利用可能になったら処理される
    if (router.asPath !== router.route) {
      setId(Number(router.query.id))
    }
  }, [router])

  useEffect(() => {
    // パスの投稿IDから投稿データを取得する
    const f = async () => {
      if (id) await props.getPost(id)
    }
    f()
  }, [id])

  const { post = initialState } = props

  return (
    <Layout title={post.title}>
      <main>
        <section>
          {
            //<!-- パンくず -->
          }
          <nav className="breadcrumb">
            <ul>
              <li>
                <Link href={URL.HOME}>
                  <a>
                    <FontAwesomeIcon icon="home" />
                    <span>HOME</span>
                  </a>
                </Link>
              </li>
              <li>{post && post.title}</li>
            </ul>
          </nav>

          <div className="entry-header">
            <h1 className="entry-title">{post && post.title}</h1>
            <div className="article-img">
              <SimpleSlider>
                {post &&
                  _.map(post.imageList, (image, index) => (
                    <img
                      alt="sample1"
                      width="644"
                      src={image.imageUrl}
                      key={index}
                    />
                  ))}
              </SimpleSlider>
            </div>
            <div className=" clearfix"></div>
          </div>
          <div className="entry-content">
            <p>{post && post.text}</p>
          </div>
          <div className="clearfix"></div>
          <div className="entry-meta">
            <FontAwesomeIcon icon="clock" />
            {post && post.registTimeMMDD}
          </div>
          <div className="entry-tags">
            <div className="section-tag">
              <ul>
                <li>タグ： </li>
                {post &&
                  _.map(post.tagList, (tag, index) => (
                    <li key={index}>
                      <a href="#" rel="tag">
                        {tag.tagName}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <SnsShare />
        </section>
      </main>
      <Modal>
        <SnsShare title={post.title} url={`${URL.POSTS}/${id}`} />
      </Modal>
    </Layout>
  )
}

const mapStateToProps = (state, ownProps) => {
  const posts = state.posts
  return {
    post: posts ? posts : initialState,
  }
}

const mapDispatchToProps = { getPost }

export default connect(mapStateToProps, mapDispatchToProps)(PostsShow)

/** ここからSSGでビルドする場合の設定 */

// // 投稿IDの一覧を取得
// export async function getStaticPaths() {
//   const res = await fetch(`${API_ENDPOINT.POSTS}`, {agent})
//   const posts = await res.json()
//   const paths = posts.data.map(post => `/posts/${post.postId}`)
//   return { paths, fallback: false }
// }

// // 各投稿データを取得
// export async function getStaticProps({ params }) {
//   const res = await fetch(`${API_ENDPOINT.POSTS}/${params.id}`, {agent})
//   const post = await res.json()
//   console.log(post.data[0])
//   return { props: { post: post.data[0] } }
// }

// export default PostsShow

/** ここまでSSGでビルドする場合の設定 */
