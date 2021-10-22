import { useState } from "react";
import { Context } from "context";

export default function SelectedUsersContextProvider({ children }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  return (
    <Context.Provider value={{ selectedUsers, setSelectedUsers }}>
      {children}
    </Context.Provider>
  );
}
