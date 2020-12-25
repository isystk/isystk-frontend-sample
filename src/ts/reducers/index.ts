import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import posts from "./posts";
import events from "./events";
import users from "./users";
import sideMenu from "./side_menu";
import auth from "./auth";
import mainVisual from "./main_visual";
import memberPosts from "./member_posts";

export default combineReducers({ posts, events, users, sideMenu, auth, mainVisual, memberPosts, form });
