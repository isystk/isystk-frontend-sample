import { Action } from "redux";
import axios from "axios";
import { Dispatch } from "redux";

//  アクションは『何か』が起こった時、Storeに『どんなデータ』を利用するかということを定義します。
//  ActionCreatorであるstore.dispatch()を使ってStoreに送信しますが、storeについてはこの記事の最後にまとめています。(※ こちら)
//  ただし、アプリケーションの状態がどのように変化するかはここでは指定しません。(→Reducerがやること)
//  あくまでどんな挙動があるかだけを定義します。
export interface PostsAppAction extends Action {
  response?: any;
  id: number;
}

export const READ_POSTS = "READ_POSTS";
export const CREATE_POST = "CREATE_POST";
export const READ_POST = "READ_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";

const ROOT_URL = "https://localhost/api/v1";

export const readPosts = () => async (dispatch: Dispatch): Promise<void> => {
  const response = await axios.get(`${ROOT_URL}/posts/`);
  dispatch({ type: READ_POSTS, response });
};

export const getPost = (id: number) => async (dispatch: Dispatch): Promise<void> => {
  const response = await axios.get(`${ROOT_URL}/posts/${id}`);
  dispatch({ type: READ_POST, response });
};

export const deletePost = (id: number) => async (dispatch: Dispatch): Promise<void> => {
  await axios.delete(`${ROOT_URL}/posts/${id}`);
  dispatch({ type: DELETE_POST, id });
};

export const putPost = (values: any) => async (dispatch: Dispatch): Promise<void> => {
  const response = await axios.put(
    `${ROOT_URL}/posts/${values.id}`,
    values
  );
  dispatch({ type: UPDATE_POST, response });
};