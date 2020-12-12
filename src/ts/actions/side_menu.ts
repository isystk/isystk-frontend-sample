import { Action } from "redux";
import axios from "axios";
import { Dispatch } from "redux";

//  アクションは『何か』が起こった時、Storeに『どんなデータ』を利用するかということを定義します。
//  ActionCreatorであるstore.dispatch()を使ってStoreに送信しますが、storeについてはこの記事の最後にまとめています。(※ こちら)
//  ただし、アプリケーションの状態がどのように変化するかはここでは指定しません。(→Reducerがやること)
//  あくまでどんな挙動があるかだけを定義します。
export interface SideMenuAppAction extends Action {
  isOpen: boolean;
}

export const TOGGLE_MENU = "TOGGLE_MENU";
export const CLOSE_MENU = "CLOSE_MENU";

export const toggleMenu = () => (dispatch: Dispatch): void => {
  dispatch({ type: TOGGLE_MENU });
};

export const closeMenu = () => (dispatch: Dispatch): void => {
  dispatch({ type: CLOSE_MENU });
};
