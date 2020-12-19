// Reducerは、Stateの状態をデザインして、アクションをハンドリングします。
// また、Reducerは、前の状態とアクションを取り、次の状態を返す純粋な関数です。

import { Reducer } from "redux";
import * as object_assign from "object-assign";
import * as _ from "lodash";

import { Posts } from "../store/StoreTypes";
import {
  MemberPostsAppAction,
  CREATE_MEMBER_POST,
  READ_MEMBER_POSTS,
  READ_MEMBER_POST,
  UPDATE_MEMBER_POST,
  DELETE_MEMBER_POST,
} from "../actions/index";

export function MemberPostsReducer(
  memberPosts: Posts,
  action: MemberPostsAppAction
): Posts {
  if (typeof memberPosts == "undefined") {
    return {};
  }

  switch (action.type) {
    case CREATE_MEMBER_POST:
    case READ_MEMBER_POST:
    case UPDATE_MEMBER_POST:
      const data = action.response.data.data[0];
      return { ...memberPosts, [data.postId]: data };
    case READ_MEMBER_POSTS:
      return _.mapKeys(action.response.data.data, "postId");
    case DELETE_MEMBER_POST:
      delete memberPosts[action.id];
      return { ...memberPosts };
    default:
      return memberPosts;
  }

  return memberPosts;
}

export default MemberPostsReducer;
