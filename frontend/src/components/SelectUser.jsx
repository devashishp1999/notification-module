import React from "react";
import {data as usersList} from "../data";

const SelectUser = ({setUser}) => {
  return (
    <ul className="select-user">
      {usersList.map((user) => (
        <li className={user.role} onClick={() => setUser(user.username)}>
          {user.role} || {user.username}
        </li>
      ))}
    </ul>
  );
};

export default SelectUser;
