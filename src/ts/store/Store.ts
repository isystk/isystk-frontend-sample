// Storeとは、アプリケーションの状態(state)を保持します。
// getState()を介してstateへのアクセスを許可します。
// 状態をdispatch（アクション）によって更新できるようにする。
// subscribe（listener）を介してlistenerを登録します。
// subscribe（listener）によって返された関数を介して、listenerの登録解除を処理します。

import { combineReducers, createStore, ReducersMapObject } from "redux";

import { ConstsReducer } from "../reducers/consts";
import { PostsReducer } from "../reducers/posts";
import { EventsReducer } from "../reducers/events";
import { EntryReducer } from "../reducers/entry";
import { SideMenuReducer } from "../reducers/side_menu";

const reducers: ReducersMapObject = {
  ConstsReducer,
  PostsReducer,
  EventsReducer,
  EntryReducer,
  SideMenuReducer,
};

declare let window: any;

const rootReducer = combineReducers({
  ConstsReducer,
  PostsReducer,
  EventsReducer,
  EntryReducer,
  SideMenuReducer,
});

export default createStore(
  rootReducer,
  window.devToolsExtension ? window.devToolsExtension() : undefined
);
