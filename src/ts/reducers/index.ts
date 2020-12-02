import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import posts from "./posts";
import events from "./events";
import sideMenu from "./side_menu";

export default combineReducers({ posts, events, sideMenu, form });
