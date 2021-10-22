import { getUsers, getUsersSuccess } from "./store";
const axios = require("axios");

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(getUsers());

    axios
      .get("http://localhost:3001/users")
      .then((res) => {
        dispatch(getUsersSuccess(res.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getUsersSuccess([]));
      });
  };
};
