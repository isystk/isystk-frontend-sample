// Reducerは、Stateの状態をデザインして、アクションをハンドリングします。
// また、Reducerは、前の状態とアクションを取り、次の状態を返す純粋な関数です。

import { Reducer } from "redux";
import * as object_assign from "object-assign";
import * as _ from "lodash";

import { Posts } from "../StoreTypes";
import {
  PostsAppAction,
  READ_POSTS,
  READ_POST,
} from "../actions/index";

export function PostsReducer(
  posts: Posts,
  action: PostsAppAction
): Posts {
  if (typeof posts == "undefined") {
    return {};
  }

  switch (action.type) {
    case READ_POST:
      const data = action.response.data.data[0];
      return { ...posts, [data.postId]: data };
    case READ_POSTS:
      return _.mapKeys(action.response.data.data, "postId");
    default:
      return posts;
  }

  return posts;
}

export default PostsReducer;
