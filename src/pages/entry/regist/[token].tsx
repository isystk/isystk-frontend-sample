import * as React from 'react'
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'
import Link from 'next/link'
import * as _ from 'lodash'
import { URL } from '@/common/constants/url'
import { registComplete } from '@/actions'
import Layout from '@/components/Layout'

// ↓ 表示用のデータ型
interface IProps {
  registComplete
  match
  query
}

interface IState {}

class EntryRegistComplete extends React.Component<IProps, IState> {
  // パスからパラメータを取得する
  static async getInitialProps({ pathname, query, asPath }) {
    return { pathname, query, asPath }
  }

  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    if (this.props.query.token)
      await this.props.registComplete(this.props.query.token)
  }

  render(): JSX.Element {
    return (
      <Layout title="会員登録完了">
        <section>
          <div className="entry-header">
            <h1 className="entry-title">会員登録完了</h1>
          </div>
          <div className="entry-content">
            <p>
              会員登録が完了しました！
              <br />
              引き続きお楽しみください。
            </p>

            <div className="form">
              <ul className="lists links">
                <li>
                  <Link href={URL.MEMBER}>
                    <a>マイページに移動する</a>
                  </Link>
                </li>
                <li>
                  <Link href={URL.HOME}>
                    <a>サイトトップに戻る</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

const mapDispatchToProps = { registComplete }

export default connect(null, mapDispatchToProps)(EntryRegistComplete)
