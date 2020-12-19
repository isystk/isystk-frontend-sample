import { Action } from "redux";
import axios from "axios";
import { Dispatch } from "redux";
import * as _ from "lodash";

//  アクションは『何か』が起こった時、Storeに『どんなデータ』を利用するかということを定義します。
//  ActionCreatorであるstore.dispatch()を使ってStoreに送信しますが、storeについてはこの記事の最後にまとめています。(※ こちら)
//  ただし、アプリケーションの状態がどのように変化するかはここでは指定しません。(→Reducerがやること)
//  あくまでどんな挙動があるかだけを定義します。
export interface MemberPostsAppAction extends Action {
  response?: any;
  id: number;
}

export const READ_MEMBER_POSTS = "READ_MEMBER_POSTS";
export const CREATE_MEMBER_POST = "CREATE_MEMBER_POST";
export const READ_MEMBER_POST = "READ_MEMBER_POST";
export const DELETE_MEMBER_POST = "DELETE_MEMBER_POST";
export const UPDATE_MEMBER_POST = "UPDATE_MEMBER_POST";

const ROOT_URL = "https://localhost/api/v1";

export const readMemberPosts = () => async (dispatch: Dispatch): Promise<void> => {
  const response = await axios.get(`${ROOT_URL}/member/posts/`);
  dispatch({ type: READ_MEMBER_POSTS, response });
};

export const postMemberPost = (values: any) => async (dispatch: Dispatch): Promise<void> => {
  const response = await axios.post(`${ROOT_URL}/member/posts/new`, values);
  dispatch({ type: CREATE_MEMBER_POST, response });
};

export const getMemberPost = (id: number) => async (dispatch: Dispatch): Promise<void> => {
  const response = await axios.get(`${ROOT_URL}/member/posts/p${id}`);
  dispatch({ type: READ_MEMBER_POST, response });
};

export const deleteMemberPost = (id: number) => async (dispatch: Dispatch): Promise<void> => {
  await axios.delete(`${ROOT_URL}/member/posts/p${id}/delete`);
  dispatch({ type: DELETE_MEMBER_POST, id });
};

export const putMemberPost = (values: any) => async (dispatch: Dispatch): Promise<void> => {
   console.log("values", values);
   const response = await axios.put(
    `${ROOT_URL}/member/posts/p${values.postId}/edit`,
    jsonToForm(values, new FormData())
  );
  dispatch({ type: UPDATE_MEMBER_POST, response });
};

export const jsonToForm = (params, formData, name = '') => {
  if (_.isArray(params)) formatArray(params, formData, name);
  if (_.isPlainObject(params)) formatObject(params, formData, name);
  return formData;
}

export const formatObject = (params, formData, name) => {
  _.forEach(params, (v, k) => {
    if (_.isArray(v) || _.isPlainObject(v)) {
      jsonToForm(v, formData, !name ? k : `${name}.${k}`);
      return;
    }
    formData.append(!name ? k : `${name}.${k}`, v);
  })
}

export const formatArray = (params, formData, name) => {
  _.map(params, (data, index) => {
    if (_.isArray(data) || _.isPlainObject(data)) {
      jsonToForm(data, formData, `${name}[${index}]`);
      return;
    }
    formData.append(`${name}[${index}]`, data);
  });
  return formData;
}