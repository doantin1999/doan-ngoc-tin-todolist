import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { TaskAPIs } from "../../../api/taskApis";
import { message } from "antd";

const initialState = {
  isLoading: false,
  currentTask: null as Record<string, any> | null,
  tasks: [],
  errors: null as SerializedError | null,
};

export const actfetchAllTask = createAsyncThunk(
  "tasks/fetchAllTask",
  async () => {
    const { data } = await TaskAPIs.getAllTasks();
    console.log("Fetched tasks:", data);
    return data;
  }
);

export const actfetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async (taskId: string) => {
    const { data } = await TaskAPIs.getTaskById(taskId);
    console.log("Fetched task:", data);
    return data;
  }
);

export const actUpdateTaskById = createAsyncThunk(
  "tasks/updateTaskById",
  async ({
    id,
    taskUpdate,
  }: {
    id: string;
    taskUpdate: Partial<Record<string, any>>;
  }) => {
    await TaskAPIs.UpdateTaskById(id, taskUpdate);
    return null;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetCurrentTask: (state) => {
      state.currentTask = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actfetchAllTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(actfetchAllTask.rejected, (state, action) => {
      state.errors = action.error ? action.error : null;
      state.isLoading = false;
    });
    builder.addCase(actfetchAllTask.fulfilled, (state, action) => {
      state.tasks = action.payload.tasks;
      state.errors = null;
      state.isLoading = false;
    });

    builder.addCase(actfetchTaskById.fulfilled, (state, action) => {
      state.currentTask = action.payload;
    });

    builder.addCase(actUpdateTaskById.fulfilled, (state, action) => {
      message.success("Cập nhật Task thành công");
    });
  },
});

export const actCreateNewTask = (task: any) => {
  return async (dispatch: any) => {
    try {
      await TaskAPIs.createTask(task);
      dispatch(actfetchAllTask());
    } catch (error) {}
  };
};

export const { setLoading } = taskSlice.actions;
export const tasksReducer = taskSlice.reducer;
