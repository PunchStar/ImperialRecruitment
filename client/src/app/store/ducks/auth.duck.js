import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import * as routerHelpers from "../../router/RouterHelpers";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  UpdateRealUser: "[UpdateRealUser] Action",
};

const initialAuthState = {
  user: undefined,
  token: undefined,
  role: undefined,
};

// export const reducer = persistReducer(
//   { storage, key: "personal-auth", whitelist: ["user", "token"] },
//     (state = initialAuthState, action) => {
export const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { user, token, role } = action.payload;
        return {user, token, role};
      }

      case actionTypes.Register: {
        const { user, token, role } = action.payload;
        return {user, token, role};
      }

      case actionTypes.UpdateRealUser: {
        const { user } = action.payload;
        return {...state, user};
      }

      case actionTypes.Logout: {
        routerHelpers.forgotLastLocation();
        localStorage.removeItem("isDashboardFirstRender");
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;

        return { ...state, user };
      }

      default:
        return state;
    }
  }
// );

export const actions = {
  login: userData => ({ type: actionTypes.Login, payload: userData }),
  register: user => ({
    type: actionTypes.Register,
    payload: user
  }),
  updateRealUser: user => ({ type: actionTypes.UpdateRealUser, payload: { user } }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
  fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } })
};

export function* saga() {
  // yield takeLatest(actionTypes.Login, function* loginSaga() {
  //   yield put(actions.requestUser());
  // });

  // yield takeLatest(actionTypes.Register, function* registerSaga() {
  //   yield put(actions.requestUser());
  // });

  // yield takeLatest(actionTypes.UserRequested, function* userRequested() {
  //   const { data: user } = yield getUserByToken();

  //   yield put(actions.fulfillUser(user));
  // });
}
