// Reducerは、Stateの状態をデザインして、アクションをハンドリングします。
// また、Reducerは、前の状態とアクションを取り、次の状態を返す純粋な関数です。

import * as _ from 'lodash'

import { Post } from '@/store/StoreTypes'
import {
  MemberPostsAppAction,
  CREATE_MEMBER_POST,
  READ_MEMBER_POSTS,
  READ_MEMBER_POST,
  UPDATE_MEMBER_POST,
  DELETE_MEMBER_POST,
} from '@/actions/index'

const initialState: Post[] = []

export function MemberPostsReducer(
  state = initialState,
  action: MemberPostsAppAction
): Post[] {
  switch (action.type) {
    case CREATE_MEMBER_POST:
    case READ_MEMBER_POST:
    case UPDATE_MEMBER_POST:
    case READ_MEMBER_POSTS:
      return action.response
    case DELETE_MEMBER_POST: {
      const list = _.mapKeys(state, 'postId')
      delete list[action.id]
      return _.map(list, (e) => e.value)
    }
    default:
      return state
  }

  return state
}

export default MemberPostsReducer
