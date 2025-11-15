import React, { useState } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
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

  const [open, setOpen] = useState(false); // controls popup visibility
  // initially fields of new task are empty
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    points: ""
  })

  const handleOpen = () => setOpen(true);
  // when done creating a new task, reset new task fiels to empty
  //  to accomodate next new task
  const handleClose = () => {
    setNewTask({ title: "", description: "", points: "" });
    setOpen(false);
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return; // doesn't add new task if title is empty

    const newTaskObject = {
      // date used to ensure unique ids (assuming tasks not being created near simultaneously)
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      points: Number(newTask.points),
      completed: false
    };

    // update the tasks list with the new task
    setTasks([...tasks, newTaskObject]);
    handleClose();
  };

  // updates completed field of given task when box is checked
  const handleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      (task.id === taskId) ? { ...task, completed: true } : task
    ));
  };

  return (
    <Box sx={{ 
      width: "100%",
      minHeight: "100vh",
      boxSizing: "border-box",
      overflowX: "hidden",   // prevent horizontal scroll 
      bgcolor: '#B184BD'
      }}>
      <Typography variant="h3" textAlign="center" mb={3} sx={{ fontFamily: "'Press Start 2P', cursive"}}>
        Tasks
      </Typography>

      {/* Add Task Button */}
      <Box textAlign="center" mt={3}>
        <Button variant="contained" onClick={handleOpen}>
          Add Task
        </Button>
      </Box>

      {/* Task List */}
      <Box sx={{ width: '100%', marginLeft: 5 }}>
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onComplete={handleComplete} 
          />
        ))}
      </Box>

      {/* Add Task Popup Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Task Title"
            fullWidth
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />

          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />

          <TextField
            margin="dense"
            label="Point Value"
            type="number"
            fullWidth
            value={newTask.points}
            onChange={(e) => setNewTask({ ...newTask, points: e.target.value })}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAddTask}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

