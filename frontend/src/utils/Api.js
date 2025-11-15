// src/utils/Api.js
const API_BASE_URL = 'http://10.121.13.65:3000/api';

const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    // You can override method/headers/etc via options
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
      ...options.headers,
    },
    // If you're using cookies for auth, uncomment this:
    // credentials: 'include',
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ---- USERS ----
export const userApiCalls = {
  // all users (if your backend supports this)

  // current logged-in user (adjust to /me or /auth/me if that's your backend)
  getCurrentUser: async () => apiCall('/auth/me'),
};

// ---- TASKS (current user inferred from auth) ----
export const taskApiCalls = {
  // all tasks for the currently logged-in user
  getTasks: async () => apiCall('/tasks'),

  // only tasks where type === "SINGLE"
  getSingleTasks: async () => {
    const tasks = await apiCall('/tasks'); // array of tasks for current user
    return tasks.filter((task) => task.type === 'SINGLE');

  },

  // only tasks where type === "HABIT"
  getHabitTasks: async () => {
    const tasks = await apiCall('/tasks');
    return tasks.filter((task) => task.type === 'HABIT');
  },

  //*****CREATIONAL TASKS*****
  CreateTask: async(taskCreateReq)=> {
    return apiCall("/tasks", { method: 'PUT', Body: JSON.stringify(taskCreateReq)})

    
  }



};

// optional default export if you like importing the whole API as one object
export default {
  userApiCalls,
  taskApiCalls,
};
