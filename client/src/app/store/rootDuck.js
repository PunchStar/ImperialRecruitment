import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "./ducks/auth.duck";
import * as user from "./ducks/user.duck";
import * as activity from "./ducks/activity.duck";
import * as shortcut from "./ducks/shortcut.duck";
import * as pageLink from "./ducks/pageLink.duck";
import * as currentState from "./ducks/currentState.duck";

import { metronic } from "../../_metronic";

const appReducer = combineReducers({
  auth: auth.authReducer,
  i18n: metronic.i18n.reducer,
  builder: metronic.builder.reducer,
  user: user.userReducer,
  activity: activity.activityReducer,
  shortcut: shortcut.shortcutReducer,
  pageLink: pageLink.pageLinkReducer,
  currentState: currentState.currentStateReducer,
});

export const rootReducer = (state, action) => {
  // if (action.type === 'LOGOUT') {
  //   state = undefined
  // }  
  return appReducer(state, action)
}

export function* rootSaga() {
  yield all([auth.saga(), user.saga(), activity.saga(), shortcut.saga(), pageLink.saga(), currentState.saga()]);
}
