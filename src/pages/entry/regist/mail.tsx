import * as React from 'react'
import Link from 'next/link'
import * as _ from 'lodash'
import { URL } from '@/common/constants/url'
import Layout from '@/components/Layout'

interface IProps {}

interface IState {}

class EntryRegistMail extends React.Component<IProps, IState> {
  constructor(props) {
    super(props)
  }

  render(): JSX.Element {
    return (
      <Layout title="会員登録メール送信完了">
        <section>
          <div className="entry-header">
            <h1 className="entry-title">会員登録メール送信完了</h1>
          </div>
          <div className="entry-content">
            <p>
              ご登録いただいたメールアドレスに、会員登録用のメールをお送りしました。
              <br />
              メールに書かれているURLをクリックすると会員登録が完了します。
            </p>
            <p>
              <Link href={URL.HOME}>
                <a>サイトトップに戻る &raquo;</a>
              </Link>
            </p>
          </div>
        </section>
      </Layout>
    )
  }
}

export default EntryRegistMail
