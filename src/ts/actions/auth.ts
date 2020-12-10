import { Action } from "redux";
import axios from "axios";
import { Dispatch } from "redux";

//  アクションは『何か』が起こった時、Storeに『どんなデータ』を利用するかということを定義します。
//  ActionCreatorであるstore.dispatch()を使ってStoreに送信しますが、storeについてはこの記事の最後にまとめています。(※ こちら)
//  ただし、アプリケーションの状態がどのように変化するかはここでは指定しません。(→Reducerがやること)
//  あくまでどんな挙動があるかだけを定義します。
export interface AuthAppAction extends Action {
  response?: any;
  loginId: string;
  password: string;
}

export const AUTH_CHECK = "AUTH_CHECK";
export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

const ROOT_URL = "https://localhost/api/v1";

export const authCheck = () => async (dispatch: Dispatch): Promise<void> => {
  const response = await axios.get(`${ROOT_URL}/auth/`);
  console.log(response);

};

export const authLogin = (values: any) => async (dispatch: Dispatch): Promise<void> => {
  const response = await axios.post(`${ROOT_URL}/authenticate`, makeFormDataFromParams(values) );

  console.log(response);

};

export const makeFormDataFromParams = (params: object): FormData => {
  const formData = new FormData();
  const appendParamsToForm = (variable, prefix = '') => {
    if (typeof variable !== 'object' || variable instanceof File) {
      formData.append(prefix, variable);
      return;
    }
    if (Array.isArray(variable)) {
      variable.forEach(value => appendParamsToForm(value, `${prefix}.`));
      return;
    }
    Object.keys(variable).forEach(key => {
      appendParamsToForm(
        variable[key] || '',
        prefix ? `${prefix}.${key}` : key
      );
    });
  };
  appendParamsToForm(params);
  return formData;
};

export const authLogout = () => async (dispatch: Dispatch): Promise<void> => {
  const response = await axios.post(`${ROOT_URL}/logout`);

  console.log(response);

};
