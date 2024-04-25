import API from "../../api/axios";

export const createTask = async (taskData) => {
  try {
    const response = await API.post("/stask/", taskData);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error.response.data);
    throw error;
  }
};

export const getTasks = async () => {
  try {
    const response = await API.get("/stask/");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error.response.data);
    throw error;
  }
};

export const updateTask = async (id, updatedTaskData) => {
  try {
    const response = await API.put(`/stask/${id}`, updatedTaskData);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error.response.data);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await API.delete(`/stask/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error.response.data);
    throw error;
  }
};
