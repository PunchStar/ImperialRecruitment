import * as routerHelpers from "../../router/RouterHelpers";

export const actionTypes = {
  AllCurrentStates : "[AllCurrentStates] Action",
  Logout : "[Logout] Action",
};

const initialCurrentStateState = {
  pageIndex: 0,
  isLinkShow: true,
};

export const currentStateReducer = (state = initialCurrentStateState, action) => {
    switch (action.type) {
      case actionTypes.AllCurrentStates: {
        const { pageIndex, isLinkShow } = action.payload;
        return { ...state, pageIndex, isLinkShow };
      }
      
      case actionTypes.Logout: {
        routerHelpers.forgotLastLocation();
        return initialCurrentStateState;
      }

      default:
        return state;
    }
  }
// );

export const actions = {
  allCurrentStates: allCurrentStates => ({ type: actionTypes.AllCurrentStates, payload: allCurrentStates }),
  logout: () => ({ type: actionTypes.Logout }),
};

export function* saga() {
  // yield takeLatest(actionTypes.AllCurrentStates, function* allCurrentStatesSaga() {
  //   yield put(actions.allCurrentStates());
  // });

  // yield takeLatest(actionTypes.AddCurrentState, function* addCurrentStateSaga() {
  //   yield put(actions.addCurrentState());
  // });
}
