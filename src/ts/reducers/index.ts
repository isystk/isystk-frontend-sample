import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import posts from "./posts";
import events from "./events";
import sideMenu from "./side_menu";
import auth from "./auth";
import mainVisual from "./main_visual";

export default combineReducers({ posts, events, sideMenu, auth, mainVisual, form });
