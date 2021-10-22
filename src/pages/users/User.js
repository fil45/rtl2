import React from "react";

export default function User({ user, onDelete }) {
  const { id, firstname, lastname } = user;
  return (
    <li>
      <p>
        {id} {firstname} {lastname}
      </p>
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
}
