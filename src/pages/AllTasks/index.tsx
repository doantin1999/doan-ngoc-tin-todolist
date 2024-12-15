// AllTasks.tsx
import React, { useEffect } from "react";
import MainContentTask from "../../components/MainContentTask";
import { useDispatch, useSelector } from "react-redux";
import { actfetchAllTask } from "../../redux/features/tasks/taskSlice";
import { Spin } from "antd";
import { AppDispatch } from "../../redux/store";

const AllTasks = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, tasks } = useSelector((state: any) => state.task);

  useEffect(() => {
    dispatch(actfetchAllTask());
  }, [dispatch]);

  useEffect(() => {
    console.log("Tasks from Redux Store:", tasks);
  }, [tasks]);

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div>
      {tasks.length === 0 ? (
        <div>No tasks</div>
      ) : (
        <MainContentTask tasks={tasks} />
      )}
    </div>
  );
};

export default AllTasks;
