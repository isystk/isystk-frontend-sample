// Reducerは、Stateの状態をデザインして、アクションをハンドリングします。
// また、Reducerは、前の状態とアクションを取り、次の状態を返す純粋な関数です。

import { Reducer } from "redux";
import * as object_assign from "object-assign";
import * as _ from "lodash";

import { Auth } from "../StoreTypes";
import {
  AuthAppAction,
  AUTH_CHECK,
  AUTH_LOGIN,
  AUTH_LOGOUT,
} from "../actions/index";

export function AuthReducer(
  auth: Auth,
  action: AuthAppAction
): Auth {
  if (typeof auth == "undefined") {
    return {isLogin: false, familyName: null};
  }

  switch (action.type) {
    case AUTH_CHECK:
    case AUTH_LOGIN:
      const { data } = action.response.data;
      console.log(data);
      if (!data) {
        return {isLogin: false, familyName: null};
      }
      return { isLogin: (data.length !== 0 && data[0].familyName), familyName: data[0].familyName };
    case AUTH_LOGOUT:
      return { isLogin: false, familyName: null };
    default:
      return auth;
  }

  return auth;
}

export default AuthReducer;
