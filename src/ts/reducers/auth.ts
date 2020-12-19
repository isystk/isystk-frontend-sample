// Reducerは、Stateの状態をデザインして、アクションをハンドリングします。
// また、Reducerは、前の状態とアクションを取り、次の状態を返す純粋な関数です。

import { Reducer } from "redux";
import * as object_assign from "object-assign";
import * as _ from "lodash";

import { Auth } from "../store/StoreTypes";
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
    return {isLogin: false};
  }

  switch (action.type) {
    case AUTH_CHECK:
    case AUTH_LOGIN:
      const { data, message } = action.response.data;
      if (!data) {
        return {
          isLogin: false,
          message: message,
        };
      }
      return {
        isLogin: (data.length !== 0 && data[0].familyName),
        familyName: data[0].familyName,
        message: message,
      };
    case AUTH_LOGOUT:
      return { isLogin: false };
    default:
      return auth;
  }

  return auth;
}

export default AuthReducer;
