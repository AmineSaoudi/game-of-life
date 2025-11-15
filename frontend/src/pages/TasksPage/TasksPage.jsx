import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import TaskCard from "./TaskCard"; 

export default function TasksPage() {
  // Example tasks 
  const [tasks, setTasks] = useState([
    // this will be json data from backend
    {
      id: 1,
      title: "Take out the garbage",
      description: "Before 8pm",
      points: 10,
      completed: false,
    },
    {
      id: 2,
      title: "Finish homework",
      points: 20,
      completed: false,
    }
  ]);

  // When user presses "Mark Complete"
  const handleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      (task.id === taskId) ? { ...task, completed: true } : task
    ));
  };

  return (
    <Box sx={{ 
      padding: 1,
      width: '100%', 
      bgcolor: "blue",
      }}>
      <Typography variant="h3" textAlign="center" mb={3}>
        Your Tasks
      </Typography>

      {/* Task List */}
      <Box sx={{ width: '100%', marginLeft: 0 }}>
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onComplete={handleComplete} 
          />
        ))}
      </Box>

      {/* Add Task Button */}
      <Box textAlign="center" mt={3}>
        <Button variant="contained">
          Add Task
        </Button>
      </Box>
    </Box>
  );
}
