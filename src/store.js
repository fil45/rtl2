import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

const GET_USERS = "GET_USERS";
const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
const RESET_STATE = "RESET_STATE";

export const getUsers = () => ({ type: GET_USERS });
export const getUsersSuccess = (payload) => ({
  type: GET_USERS_SUCCESS,
  payload,
});
export const resetState = () => ({ type: RESET_STATE });

export const defaultState = {
  users: [],
  loading: false,
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: [], loading: true };
    case GET_USERS_SUCCESS:
      return { ...state, users: [...action.payload], loading: false };
    case RESET_STATE:
      return { ...defaultState };
    default:
      return state;
  }
};

export const store = createStore(reducer, applyMiddleware(thunk));
