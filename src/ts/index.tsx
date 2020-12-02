import * as React from "react";
import * as ReactDom from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

import reducers from "./reducers";
import CommonHeader from "./components/common/common_header";
import PostsIndex from "./components/posts/posts_index";
import EventsIndex from "./components/events/events_index";
import EventsNew from "./components/events/events_new";
import EventsShow from "./components/events/events_show";
import { NotFound } from "./components/NotFound";

// 開発環境の場合は、redux-devtools-extension を利用できるようにする
const enhancer =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk);
const store = createStore(reducers, enhancer);

ReactDom.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={PostsIndex} />
          <Route path="/events" component={EventsIndex} />
          <Route path="/events/new" component={EventsNew} />
          <Route path="/events/:id" component={EventsShow} />
          <Route exact path="/events" component={EventsIndex} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("appContainer")
);
