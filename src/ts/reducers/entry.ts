// Reducerは、Stateの状態をデザインして、アクションをハンドリングします。
// また、Reducerは、前の状態とアクションを取り、次の状態を返す純粋な関数です。

import { Reducer } from "redux";
import * as object_assign from "object-assign";
import * as _ from "lodash";

import { User } from "../store/StoreTypes";
import {
  EntryAppAction,
  CREATE_USER,
} from "../actions/index";

export function EntryReducer(
  user: User,
  action: EntryAppAction
): User {
  if (typeof user == "undefined") {
    return {};
  }

  switch (action.type) {
    case CREATE_USER:
      const data = action.values;
      return data;
    default:
      return user;
  }

  return user;
}

export default EntryReducer;
