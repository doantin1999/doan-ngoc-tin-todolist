import React from "react";
import "./style.scss";
import Task from "../Task";

interface TaskType {
  title: string;
  description: string;
  creator: string;
  status: string;
  id: string;
}

interface MainContentTaskProps {
  tasks: TaskType[];
}

const MainContentTask: React.FC<MainContentTaskProps> = (props) => {
  const renderTask = (tasks: TaskType[]) => {
    return tasks.map((task) => {
      return <Task key={task.id} task={task} />;
    });
  };

  return <div className="main-content-task">{renderTask(props.tasks)}</div>;
};

export default MainContentTask;
