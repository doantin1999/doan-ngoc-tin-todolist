import React, { useEffect } from "react";
import "./style.scss";
import { Button, Input } from "antd";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  actCreateNewTask,
  actUpdateTaskById,
} from "../../redux/features/tasks/taskSlice";
import { ROUTES } from "../../constants/routes";
import { AppDispatch } from "../../redux/store";
import { TASK_STATUS } from "../../constants/task.constant";

interface FormValues {
  title: string;
  creator: string;
  createAt: string;
  status: string;
  description: string;
}

interface Task extends FormValues {
  id: string;
}

interface TaskFormProps {
  isEdit?: boolean;
  currentTask?: Task | null; // Sử dụng kiểu mới bao gồm cả id
}

const schema = Yup.object().shape({
  title: Yup.string().required("Please input title"),
  creator: Yup.string().required("Please input creator"),
  createAt: Yup.string().required("Create At is required"),
  status: Yup.string().required("Status is required"),
  description: Yup.string().required("Please input description"),
});

const TaskForm: React.FC<TaskFormProps> = ({ isEdit = false, currentTask }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const methods = useForm<FormValues>({
    defaultValues: {
      title: currentTask?.title || "",
      creator: currentTask?.creator || "",
      createAt:
        currentTask?.createAt || format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      status: currentTask?.status || TASK_STATUS.NEW,
      description: currentTask?.description || "",
    },
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = methods;

  const onValid = (formValue: FormValues) => {
    if (isEdit && currentTask?.id) {
      dispatch(
        actUpdateTaskById({
          id: currentTask.id,
          taskUpdate: formValue,
        })
      );
      return;
    }

    // Tạo mới Task
    dispatch(actCreateNewTask(formValue));
    navigate(ROUTES.ALL_TASK);
  };

  useEffect(() => {
    if (currentTask) {
      reset({
        title: currentTask.title || "",
        creator: currentTask.creator || "",
        createAt:
          currentTask.createAt || format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        status: currentTask.status || TASK_STATUS.NEW,
        description: currentTask.description || "",
      });
    }
  }, [currentTask, reset]);

  const handResetForm = () => {
    if (currentTask && currentTask.createAt) {
      reset({
        ...currentTask,
        createAt: format(new Date(currentTask.createAt), "yyyy-MM-dd HH:mm:ss"),
      });
    }
  };

  return (
    <div className="task-form-wrapper">
      <form className="task-form-container" onSubmit={handleSubmit(onValid)}>
        <div className="task-form">
          <label className="task-form_label">Title:</label>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <Input placeholder="Please Input..." {...field} />
            )}
          />
        </div>
        {!!errors.title?.message && (
          <span style={{ color: "red" }}>{errors.title.message}</span>
        )}

        <div className="task-form">
          <label className="task-form_label">Creator:</label>
          <Controller
            control={control}
            name="creator"
            render={({ field }) => (
              <Input placeholder="Please Input..." {...field} />
            )}
          />
        </div>
        {!!errors.creator?.message && (
          <span style={{ color: "red" }}>{errors.creator.message}</span>
        )}

        <div className="task-form">
          <label className="task-form_label">Create At:</label>
          <Controller
            control={control}
            name="createAt"
            render={({ field }) => <Input disabled value={field.value} />}
          />
        </div>
        {!!errors.createAt?.message && (
          <span style={{ color: "red" }}>{errors.createAt.message}</span>
        )}

        <div className="task-form">
          <label className="task-form_label">Description:</label>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <Input placeholder="Please Input..." {...field} />
            )}
          />
        </div>
        {!!errors.description?.message && (
          <span style={{ color: "red" }}>{errors.description.message}</span>
        )}

        <div className="task-form-btn">
          {isEdit && <Button onClick={handResetForm}>Reset</Button>}
          <Button htmlType="submit">
            {isEdit ? "Update Task" : "Save Task"}
          </Button>
          {isEdit && <Button danger>Delete</Button>}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
