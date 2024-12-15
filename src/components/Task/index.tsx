import React from "react";
import "./style.scss";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

interface TaskType {
  title: string;
  creator: string;
  status: string;
  description: string;
  id: string;
}

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = (props) => {
  const navigate = useNavigate();
  const handleRedirectToDetailPage = () => {
    const taskId = props.task.id; // Lấy taskId từ props
    navigate(generatePath(ROUTES.UPDATE_TASK, { id: taskId })); // Điều hướng đến URL chi tiết
  };

  return (
    <div className="task-container">
      <div
        className="task-container_title"
        onClick={handleRedirectToDetailPage}
      >
        Title: {props.task.title}
      </div>
      <div className="task-container_author">Creator: {props.task.creator}</div>
      <div className="task-container_status">Status: {props.task.status}</div>
      <div className="task-container_divider"></div>
      <div className="task-container_description">
        <div className="task-container_des-title">Description:</div>
        <div className="task-container_des-content">
          {props.task.description}
        </div>
      </div>
    </div>
  );
};

export default Task;
