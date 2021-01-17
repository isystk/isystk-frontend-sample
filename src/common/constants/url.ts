import Env from '../env/'

/**
 * フロントエンド用の URL を作成する
 */
const getFrontUrl = (path: string): string => {
  return [Env.internalEndpointUrl, path].join('')
}

/** API のエンドポイント */
export const URL = {
  /** HOME */
  HOME: getFrontUrl('/'),
  /** ログイン */
  LOGIN: getFrontUrl('/login'),
  /** 投稿詳細 */
  POSTS: getFrontUrl('/posts'),
  /** マイページ TOP */
  MEMBER: getFrontUrl('/member'),
  /** マイページ 投稿詳細 */
  MEMBER_POSTS: getFrontUrl('/member/posts'),
  /** マイページ 投稿 新規登録 */
  MEMBER_POSTS_NEW: getFrontUrl('/member/posts/new'),
  /** 会員登録 */
  ENTRY_REGIST: getFrontUrl('/entry/regist'),
  ENTRY_REGIST_CONFIRM: getFrontUrl('/entry/regist/confirm'),
  ENTRY_REGIST_MAIL: getFrontUrl('/entry/regist/mail'),
  ENTRY_REGIST_COMPLETE: getFrontUrl('/entry/regist/complete'),
  /** パスワード忘れ */
  ENTRY_REMIND: getFrontUrl('/entry/remind'),
  ENTRY_REMIND_MAIL: getFrontUrl('/entry/remind/mail'),
  /** パスワード再設定 */
  ENTRY_REMIND_CONFIG: getFrontUrl('/entry/remind/config'),
  ENTRY_REMIND_CONFIG_COMPLETE: getFrontUrl('/entry/remind/config/complete'),
}
