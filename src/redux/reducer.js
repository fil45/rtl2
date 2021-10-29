import { actionTypes } from './index';

const defaultState = {
  users: [],
  loading: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS:
      return { ...state, users: [], loading: true };
    case actionTypes.GET_USERS_SUCCESS:
      return { ...state, users: [...action.payload], loading: false };
    case actionTypes.RESET_STATE_SUCCESS:
      return { ...action.payload };
    default:
      return state;
  }
};

export { defaultState, reducer };
