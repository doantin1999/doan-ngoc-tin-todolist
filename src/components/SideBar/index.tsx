import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const SideBar = () => {
  return (
    <div className="side-bar-container">
      <ul className="side-bar-container_list">
        <li className="side-bar-container_list-item">
          <Link to={ROUTES.ALL_TASK}>ALLTASK</Link>
        </li>
        <li className="side-bar-container_list-item">
          <Link to={ROUTES.NEW_TASK}>NEWTASK</Link>
        </li>
        <li className="side-bar-container_list-item">
          <Link to={ROUTES.DOING_TASK}>DOINGTASK</Link>
        </li>
        <li className="side-bar-container_list-item">
          <Link to={ROUTES.DONE_NEW}>DONENEW</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
