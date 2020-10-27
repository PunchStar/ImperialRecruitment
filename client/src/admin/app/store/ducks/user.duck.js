import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import * as routerHelpers from "../../router/RouterHelpers";

export const actionTypes = {
  AllUsers : "[AllUsers] Action",
  AddUser : "[AddUser] Action",
  UpdateUser : "[UpdateUser] Action",
  DeleteUser : "[DeleteUser] Action",
  Logout : "[Logout] Action",
};

const initialUserState = {
  users: [],
};

// export const reducer = persistReducer(
//   { storage, key: "personal-user", whitelist: ["users"] },
//   (state = initialUserState, action) => {
export const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
      case actionTypes.AllUsers: {
        const { allUsers } = action.payload;
        return { ...state, users: allUsers };
      }

      case actionTypes.AddUser: {
        const { allUsers } = action.payload;
        return { ...state, users: allUsers };
      }

      case actionTypes.UpdateUser: {
        const { allUsers } = action.payload;
        return { ...state, users: allUsers };
      }

      case actionTypes.DeleteUser: {
        const { allUsers } = action.payload;
        return { ...state, users: allUsers };
      }
      
      case actionTypes.Logout: {
        routerHelpers.forgotLastLocation();
        return initialUserState;
      }

      default:
        return state;
    }
  }
// );

export const actions = {
  allUsers: allUsers => ({ type: actionTypes.AllUsers, payload: { allUsers } }),
  addUser: allUsers => ({ type: actionTypes.AddUser, payload: { allUsers } }),
  updateUser: allUsers => ({ type: actionTypes.UpdateUser, payload: { allUsers } }),
  deleteUser: allUsers => ({ type: actionTypes.DeleteUser, payload: { allUsers } }),
  logout: () => ({ type: actionTypes.Logout }),

};

export function* saga() {
  // yield takeLatest(actionTypes.AllUsers, function* allUsersSaga() {
  //   yield put(actions.allUsers());
  // });

  // yield takeLatest(actionTypes.AddUser, function* addUserSaga() {
  //   yield put(actions.addUser());
  // });
}
