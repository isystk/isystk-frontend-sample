// Reducerは、Stateの状態をデザインして、アクションをハンドリングします。
// また、Reducerは、前の状態とアクションを取り、次の状態を返す純粋な関数です。

import { Reducer } from "redux";
import * as object_assign from "object-assign";
import * as _ from "lodash";

import { Consts } from "../store/StoreTypes";
import {
  ConstsAppAction,
  READ_CONSTS,
} from "../actions/index";

export function ConstsReducer(
  consts: Consts,
  action: ConstsAppAction
): Consts {
  if (typeof consts == "undefined") {
    return {};
  }

  switch (action.type) {
    case READ_CONSTS:
      return _.mapKeys(action.response.data.data, "name");
    default:
      return consts;
  }

  return consts;
}

export default ConstsReducer;
