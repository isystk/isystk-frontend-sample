// Reducerは、Stateの状態をデザインして、アクションをハンドリングします。
// また、Reducerは、前の状態とアクションを取り、次の状態を返す純粋な関数です。

import { Reducer } from "redux";
import * as object_assign from "object-assign";
import * as _ from "lodash";

import { MainVisual } from "../store/StoreTypes";
import {
  MainVisualAppAction,
  SHOW_MV,
  HIDE_MV,
} from "../actions/index";

const initialState: MainVisual = {
    isShow: false,
};

export function MainVisualReducer(
  state = initialState,
  action: MainVisualAppAction
): MainVisual {

  switch (action.type) {
    case SHOW_MV:
      return {isShow: true };
    case HIDE_MV:
      return {isShow: false };
    default:
      return state;
  }

  return state;
}

export default MainVisualReducer;
