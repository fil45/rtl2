import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/octopus.png";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="brand">
        <NavLink to="/">
          <img src={logo} width="25" alt="logo" />
          <span>REACT TESTING LIBRARY DEMO</span>
        </NavLink>
      </div>
      <nav>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/redux">Redux</NavLink>
        <NavLink to="/context">Context</NavLink>
      </nav>
    </div>
  );
}
