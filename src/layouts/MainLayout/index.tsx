import React from "react";
import HeaderComponent from "../../components/HeaderComponent";
import SideBar from "../../components/SideBar";
import { Outlet } from "react-router-dom"; // Import Outlet
import "./style.scss";

const MainLayout = () => {
  return (
    <div className="main-layout-container">
      <HeaderComponent />
      <div className="main-layout-container_content">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
