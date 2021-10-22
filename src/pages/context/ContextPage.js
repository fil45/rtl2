import React, { useContext } from "react";
import { Context } from "context";
import useFetch from "hooks/useFetch";
import { baseUrl } from "const";

export default function ContextPage() {
  const { data: users } = useFetch(baseUrl);
  const { selectedUsers, setSelectedUsers } = useContext(Context);

  const onChange = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((i) => i !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  return (
    <div className="context">
      <h2>CONTEXT</h2>
      {!users.length && <p>No users</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => onChange(user.id)}
              />
              {user.id} {user.firstname} {user.lastname}
            </label>
          </li>
        ))}
      </ul>
      <div data-testid="ids-list">{selectedUsers.join(",")}</div>
    </div>
  );
}
