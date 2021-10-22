import React, { useState } from "react";
import Modal from "components/Modal";

export default function AddModal({ isOpen, onOk, onCancel }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState([]);

  const resetState = () => {
    setFirstname("");
    setLastname("");
    setAge("");
    setGender("");
    setErrors([]);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
    resetState();
  };

  const handleOk = (e) => {
    e.preventDefault();
    const newErrors = [];

    if (!firstname) {
      newErrors.push("firstname");
    }

    if (!lastname) {
      newErrors.push("lastname");
    }

    if (newErrors.length) {
      setErrors(newErrors);
      return;
    }

    if (!errors.length) {
      onOk({ firstname, lastname, age, gender });
      resetState();
    }
  };

  const onChange = (e) => {
    const handlers = {
      firstname: setFirstname,
      lastname: setLastname,
      age: setAge,
      gender: setGender,
    };
    handlers[e.target.name](e.target.value);
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="modal-content" role="dialog">
        <form>
          <h2>Add User</h2>

          <label>
            First Name
            <input
              name="firstname"
              placeholder="e.g. John"
              value={firstname}
              onChange={onChange}
              className={errors.includes("firstname") ? "invalid-input" : ""}
              autoFocus
            />
          </label>

          <label>
            Last Name
            <input
              name="lastname"
              placeholder="e.g. Doe"
              value={lastname}
              onChange={onChange}
              className={errors.includes("lastname") ? "invalid-input" : ""}
            />
          </label>

          <label>
            Age
            <input
              name="age"
              type="number"
              placeholder="e.g. 18"
              value={age}
              onChange={onChange}
              min="0"
              max="99"
            />
          </label>

          <label>
            Gender
            <select name="gender" value={gender} onChange={onChange}>
              <option value=""></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>

          <div className="buttons">
            <button onClick={handleOk}>OK</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
