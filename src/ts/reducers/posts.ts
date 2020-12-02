// Reducerは、Stateの状態をデザインして、アクションをハンドリングします。
// また、Reducerは、前の状態とアクションを取り、次の状態を返す純粋な関数です。

import { Reducer } from "redux";
import * as object_assign from "object-assign";
import * as _ from "lodash";

import { Posts } from "../StoreTypes";
import {
  PostsAppAction,
  CREATE_EVENT,
  READ_POSTS,
  READ_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
} from "../actions/index";

export function PostsReducer(
  posts: Posts,
  action: PostsAppAction
): Posts {
  if (typeof posts == "undefined") {
    return {};
  }

  switch (action.type) {
    case CREATE_EVENT:
    case READ_EVENT:
    case UPDATE_EVENT:
      const data = action.response.data;
      return { ...posts, [data.id]: data };
    case READ_POSTS:
      return action.response.data.data;
    case DELETE_EVENT:
      delete posts[action.id];
      return { ...posts };
    default:
      return posts;
  }

  return posts;
}

export default PostsReducer;
