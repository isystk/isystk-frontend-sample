// Reducerは、Stateの状態をデザインして、アクションをハンドリングします。
// また、Reducerは、前の状態とアクションを取り、次の状態を返す純粋な関数です。

import * as _ from 'lodash'

import { Post } from '@/store/StoreTypes'
import { PostsAppAction, READ_POSTS, READ_POST } from '@/actions/index'

const initialState: Post[] = []

export function PostsReducer(
  state = initialState,
  action: PostsAppAction
): Post[] {
  switch (action.type) {
    case READ_POST:
    case READ_POSTS:
      return action.response
    default:
      return state
  }

  return state
}

export default PostsReducer
