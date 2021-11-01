import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../redux";

export default function ReduxPage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const isLoading = useSelector((state) => state.loading);

  return (
    <div className="redux">
      <h2>REDUX</h2>

      <div className="users">
        <button onClick={() => dispatch(actions.getUsers())}>GET USERS</button>
        <button onClick={() => dispatch(actions.resetState())}>RESET STATE</button>

        {isLoading && <p>Loading ...</p>}
        {!users.length && !isLoading && <p>No users</p>}
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.id} {user.firstname} {user.lastname}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
