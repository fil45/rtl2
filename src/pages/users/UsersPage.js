import { useState } from "react";
import User from "./User";
import AddModal from "./AddModal";
import useFetch from "hooks/useFetch";
import { baseUrl } from "const";

export default function UsersPage() {
  const { data: users, isLoading, error, refetch } = useFetch(baseUrl);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const onDelete = (id) => {
    fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    }).then(() => {
      refetch();
    });
  };

  const onAdd = () => {
    setIsAddModalVisible(true);
  };

  const onCancel = () => {
    setIsAddModalVisible(false);
  };

  const onAddSubmit = (data) => {
    setIsAddModalVisible(false);

    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      refetch();
    });
  };

  return (
    <div className="users-page">
      <h2>USERS</h2>

      <ul>
        {users.map((user) => (
          <User key={user.id} user={user} onDelete={onDelete} />
        ))}
      </ul>

      <button onClick={onAdd}>Add</button>

      {isLoading && <p>Loading ...</p>}

      {!users.length && !isLoading && !error && <p>No users</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <AddModal
        isOpen={isAddModalVisible}
        onOk={onAddSubmit}
        onCancel={onCancel}
      />
    </div>
  );
}
