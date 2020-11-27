// Reducerは、Stateの状態をデザインして、アクションをハンドリングします。
// また、Reducerは、前の状態とアクションを取り、次の状態を返す純粋な関数です。

import { Reducer } from "redux";
import * as object_assign from "object-assign";
import * as _ from "lodash";

import { SideMenu } from "../StoreTypes";
import {
  SideMenuAppAction,
  TOGGLE_MENU,
} from "../actions/index";

const initialState: SideMenu = {
    isOpen: false,
};

export function SideMenuReducer(
  state = initialState,
  action: SideMenuAppAction
): SideMenu {

  switch (action.type) {
    case TOGGLE_MENU:
      return {isOpen: !state.isOpen };
    default:
      return state;
  }

  return state;
}

export default SideMenuReducer;
