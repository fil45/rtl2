import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "store";
import { fetchUsers } from "asyncActions";

export default function ReduxPage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const isLoading = useSelector((state) => state.loading);

  return (
    <div className="redux">
      <h2>REDUX</h2>

      <div className="users">
        <button onClick={() => dispatch(fetchUsers())}>GET USERS</button>
        <button onClick={() => dispatch(resetState())}>RESET STATE</button>

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
