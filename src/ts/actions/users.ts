import { Action } from "redux";
import axios from "axios";
import { Dispatch } from "redux";
import * as _ from "lodash";
import { API_ENDPOINT } from "../common/constants/api";
import { API } from "../utilities";

//  アクションは『何か』が起こった時、Storeに『どんなデータ』を利用するかということを定義します。
//  ActionCreatorであるstore.dispatch()を使ってStoreに送信しますが、storeについてはこの記事の最後にまとめています。(※ こちら)
//  ただし、アプリケーションの状態がどのように変化するかはここでは指定しません。(→Reducerがやること)
//  あくまでどんな挙動があるかだけを定義します。
export interface UsersAppAction extends Action {
  response?: any;
  id: number;
}

export const CREATE_USER = "CREATE_USER";

export const registConfirm = (values: any) => async (dispatch: Dispatch): Promise<void> => {
  dispatch({ type: CREATE_USER, values });
};

export const registMail = (values: any) => async (dispatch: Dispatch): Promise<void> => {
  const response = await API.post(`${API_ENDPOINT.ENTRY_REGIST}`, values);
};

export const registComplete = (onetimeKey: string) => async (dispatch: Dispatch): Promise<void> => {
  const response = await API.put(`${API_ENDPOINT.ENTRY_REGIST}/${onetimeKey}`);
};
