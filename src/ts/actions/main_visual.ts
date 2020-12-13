import { Action } from "redux";
import axios from "axios";
import { Dispatch } from "redux";

//  アクションは『何か』が起こった時、Storeに『どんなデータ』を利用するかということを定義します。
//  ActionCreatorであるstore.dispatch()を使ってStoreに送信しますが、storeについてはこの記事の最後にまとめています。(※ こちら)
//  ただし、アプリケーションの状態がどのように変化するかはここでは指定しません。(→Reducerがやること)
//  あくまでどんな挙動があるかだけを定義します。
export interface MainVisualAppAction extends Action {
  isShow: boolean;
}

export const SHOW_MV = "SHOW_MV";
export const HIDE_MV = "HIDE_MV";

export const showMv = () => (dispatch: Dispatch): void => {
  dispatch({ type: SHOW_MV });
};

export const hideMv = () => (dispatch: Dispatch): void => {
  dispatch({ type: HIDE_MV });
};
