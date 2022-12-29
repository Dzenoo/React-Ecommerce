import React from "react";
import { CgProfile } from "react-icons/cg";

import "./UserItem.css";

const UserItem = (props) => {
  return (
    <li className="profile_bar">
      <CgProfile />
      <h2>{props.name}</h2>
    </li>
  );
};

export default UserItem;
