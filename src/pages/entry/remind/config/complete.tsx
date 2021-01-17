import * as React from 'react'
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'
import Link from 'next/link'
import * as _ from 'lodash'
import { URL } from '@/common/constants/url'
import Layout from '@/components/Layout'

interface IProps {
  match
}

interface IState {}

class EntryRemindConfigComplete extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
  }

  render(): JSX.Element {
    return (
      <Layout title="パスワード変更完了">
        <section>
          <div className="entry-header">
            <h1 className="entry-title">パスワード変更完了</h1>
          </div>
          <div className="entry-content">
            <p>
              パスワード変更が完了しました！
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

export default connect(null, null)(EntryRemindConfigComplete)
