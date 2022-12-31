import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";

import { AuthActions } from "../../shared/redux/auth-slice";
import Button from "../../shared/components/Form/Button";

import "./UserItem.css";
import { Link, NavLink } from "react-router-dom";

const DropMenu = (props) => {
  return (
    <ul className="drop__menu">
      {props.isLoggedIn && (
        <li>
          <Button action onClick={props.onClick}>
            Izloguj se
          </Button>
        </li>
      )}
    </ul>
  );
};

const UserItem = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isShowDrop, setShowDrop] = useState(false);

  const logout = () => {
    dispatch(AuthActions.logout());
  };

  const showDrop = () => {
    setShowDrop((prevState) => !prevState);
  };

  return (
    <li className="profile_bar" onClick={showDrop}>
      <div className="profile_desc">
        <CgProfile />
        <h2>{props.name}</h2>
      </div>

      {isShowDrop && <DropMenu isLoggedIn={isLoggedIn} onClick={logout} />}
    </li>
  );
};

export default UserItem;
