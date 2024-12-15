import React from "react";
import "./style.scss";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
const HeaderComponent = () => {
  const navigate = useNavigate();
  const handleRedirectAddTask = () => {
    navigate(ROUTES.ADD_NEW);
  };
  return (
    <div className="header-container">
      <Button onClick={handleRedirectAddTask}>Create New Task</Button>
      <div className="header-container_search-area">
        <Input />
        <Button>Search</Button>
      </div>
    </div>
  );
};

export default HeaderComponent;
