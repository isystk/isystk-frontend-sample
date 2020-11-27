import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import events from "./events";
import sideMenu from "./side_menu";

export default combineReducers({ events, sideMenu, form });
