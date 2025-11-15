import mockUserTasks from '../data/mockTasks.json'; // <-- your JSON with SINGLE / HABIT / LONG_TERM etc.

export const mockTasksAPI = {


  async getTasksForUser(userId) {
    if (!userId) throw new Error('userId required');

    // fake network delay
    await new Promise((r) => setTimeout(r, 150));

    // right now this file is already "tasks for that user",
    // so just return everything. Later you can filter by userId.
    return mockUserTasks;
  },
};