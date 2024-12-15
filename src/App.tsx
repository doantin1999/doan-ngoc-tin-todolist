import React from "react";
import "antd/dist/reset.css";
import HeaderComponent from "./components/HeaderComponent";
import SideBar from "./components/SideBar";
import MainLayout from "./layouts/MainLayout";
import "./style.scss";
import AddNewTask from "./pages/AddNewTask";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import DoingTasks from "./pages/DoingTasks";
import AllTasks from "./pages/AllTasks";
import NewTasks from "./pages/NewTasks";
import DoneTasks from "./pages/DoneTasks";
import UpdateTask from "./pages/UpdateTask";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.ALL_TASK} element={<AllTasks />} />
            <Route path={ROUTES.UPDATE_TASK} element={<UpdateTask />} />
            <Route path={ROUTES.NEW_TASK} element={<NewTasks />} />
            <Route path={ROUTES.DOING_TASK} element={<DoingTasks />} />
            <Route path={ROUTES.DONE_NEW} element={<DoneTasks />} />
            <Route path={ROUTES.ADD_NEW} element={<AddNewTask />} />
          </Route>
          <Route path={"/"} element={<Navigate to={ROUTES.ALL_TASK} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
