import axios from "axios";

interface Task {
  title: string;
  creator: string;
  description: string;
}

export const TaskAPIs = {
  getAllTasks: async (): Promise<any> => {
    const response = await axios.get(`${process.env.REACT_APP_BE_URL}tasks`);
    return response.data;
  },

  getTaskById: async (taskId: string): Promise<any> => {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}tasks/${taskId}`
    );
    return response.data;
  },

  createTask: async (task: Task): Promise<any> => {
    return await axios.post(`${process.env.REACT_APP_BE_URL}tasks`, task);
  },

  UpdateTaskById: async (
    id: string,
    taskUpdate: Partial<Task>
  ): Promise<any> => {
    return await axios.patch(
      `${process.env.REACT_APP_BE_URL}tasks/${id}`,
      taskUpdate
    );
  },
};

export const getAllTasks = async () => {
  try {
    const response = await fetch("/path-to-your-api-endpoint");
    const data = await response.json();
    console.log("API Response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};
