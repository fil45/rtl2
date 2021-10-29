import { actionTypes } from "./index";

const actions = {
  getUsers: () => ({ type: actionTypes.GET_USERS }),
  getUsersSuccess: (payload) => ({
    type: actionTypes.GET_USERS_SUCCESS,
    payload,
  }),
  resetState: () => ({ type: actionTypes.RESET_STATE }),
  resetStateSuccess: (payload) => ({
    type: actionTypes.RESET_STATE_SUCCESS,
    payload,
  }),
};

export default actions;
