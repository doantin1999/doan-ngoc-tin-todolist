// UpdateTask.tsx

import React, { useEffect } from "react";
import TaskForm from "../../components/TaskForm";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { actfetchTaskById } from "../../redux/features/tasks/taskSlice";
import { RootState, AppDispatch } from "../../redux/store";

interface Task {
  id: string;
  title: string;
  creator: string;
  createAt: string;
  status: string;
  description: string;
}

const UpdateTask = () => {
  const dispatch: AppDispatch = useDispatch();
  const task = useSelector(
    (state: RootState) => state.task.currentTask
  ) as Task | null;
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      dispatch(actfetchTaskById(params.id));
    }
  }, [params.id, dispatch]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TaskForm isEdit={true} currentTask={task} />
    </div>
  );
};

export default UpdateTask;
