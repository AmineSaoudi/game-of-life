const API_BASE_URL = 'http://10.121.13.65:3000/api';

const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
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

// ---- USERS (you can still keep this) ----
export const userApiCalls = {
  getUsers: async () => apiCall('/users'),
  // you can later change this to /me when you add real auth
  getCurrentUser: async () => apiCall('/users/1'), // for now, hardcoded if you want
};

// ---- TASKS (using /tasks for *current* user) ----
export const taskApiCalls = {
  // all tasks for the currently logged-in user
  getTasks: async () => {
    return apiCall('/tasks');  // backend already knows who the user is
  },

  // only tasks where type === "SINGLE"
  getSingleTasks: async () => {
    const tasks = await apiCall('/tasks');   // array of tasks for current user
    return tasks.filter(task => task.type === 'SINGLE');
  },
  getHabitTasks: async () => {
    const tasks = await apiCall('/tasks');   // array of tasks for current user
    return tasks.filter(task => task.type === 'HABIT');
  },
};
