import React, { useState } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, 
    Collapse, Slide } from "@mui/material";
import TaskCard from "./TaskCard"; 

export default function TasksPage() {
  // Example tasks 
  const [tasks, setTasks] = useState([
    // this will be json data from backend
    {
      id: 1,
      title: "Take out the garbage",
      description: "Before 8pm",
      dueDate: "2025-11-15",
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

  // --Popup window for adding new task logic--

  // controls popup visibility
  const [open, setOpen] = useState(false); 
  // initially fields of new task are empty
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    points: ""
  })

  // logic for opening and closing the add task popup window
  const handleOpen = () => setOpen(true);
  // when done creating a new task, reset new task fiels to empty
  // to accomodate next new task
  const handleClose = () => {
    setNewTask({ title: "", description: "", dueDate: "", points: "" });
    setOpen(false);
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return; // doesn't add new task if title is empty

    const newTaskObject = {
      // date used to ensure unique ids (assuming tasks not being created near simultaneously)
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
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

    // Remove after animation finishes (same as Collapse timeout)
    setTimeout(() => {
        setTasks(tasks => tasks.filter(task => task.id !== taskId));
    }, 400);
  };

  // --Filtering task type logic--

  const [filter, setFilter] = useState("today");

  const filterTasks = (task) => {
    // current day at midnight
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const due = task.dueDate ? new Date(task.dueDate + "T00:00:00") : null;

    switch(filter) {
        case "today":
        return due && due.toDateString() === now.toDateString();
        case "upcoming":
        return due && (due - now) > 0 && (due - now) <= 14 * 24 * 60 * 60 * 1000;
        case "future":
        return due && (due - now) > 14 * 24 * 60 * 60 * 1000;
        case "ongoing":
        return !due;
        case "overdue":
        return due && (due < now) && !task.completed;
        default:
        return true;
    }
  }

  return (
    // Container for page
    <Box sx={{ 
      width: "100%",
      minHeight: "100vh",
      boxSizing: "border-box",
      overflowX: "hidden",   // prevent horizontal scroll 
      background: "linear-gradient(180deg, #fbfbfdff 0%, #e1cffcff 100%)",
      }}>

      {/* Title Card */}
      <Box sx={{
        bgcolor: "#DAC1FF",
        color: "#7A2E8E",
        borderRadius: 1,
        boxShadow: "0px 4px 15px rgba(0,0,0,0.25)",
        border: "3px solid #9049A4",
        fontFamily: "'Press Start 2P', cursive",
        mb: 3,
      }}>     
        <Typography fontSize='35px' textAlign="center" sx={{ 
            fontFamily: "'Press Start 2P', cursive"
        }}>
            Tasks
        </Typography>
      </Box>


      {/* REFORMAT THIS */}
      {/* Filter Bar */}
      <Box 
        sx={{
          display: "flex",
          width: "90%",
          mx: "auto",
          mt: 2,
          borderRadius: 1,
          overflow: "hidden",
          boxShadow: "0 3px 10px rgba(0,0,0,0.15)"
        }}
      >
      {["today", "upcoming", "future", "ongoing", "overdue"].map(section => (
        <Box
            key={section}
            onClick={() => setFilter(section)}
            sx={{
                flex: 1,
                py: 2,
                textAlign: "center",
                cursor: "pointer",
                userSelect: "none",
                bgcolor: filter === section ? "#9049A4" : "#EFD7FF",
                color: filter === section ? "white" : "#5A3C7A",
                fontWeight: "bold",
                borderRight: section !== "overdue" ? "2px solid #CBA8EF" : "none",
                transition: "0.25s",
                "&:hover": {
                bgcolor: filter === section ? "#7a3b90" : "#dcbfff"
                }
            }}
        >
            {section.toUpperCase()}
        </Box>
      ))}
      </Box>



      {/* Add Task Button */}
      <Box textAlign="right" mt={3} mr={10}>
        <Button variant="contained" sx={{
            bgcolor: '#9049A4',
            color: '#F0C5FD'
        }}
        onClick={handleOpen}>
          Add Task
        </Button>
      </Box>

      {/* Task List */}
      <Box sx={{ width: '100%', px: 5 }}>
        {tasks.filter(filterTasks).map(task => (
            <Collapse key={task.id} in={!task.completed} timeout={300}>
                <TaskCard task={task} onComplete={handleComplete} />
            </Collapse>
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
            label="Due Date"
            type="date"
            // So that date picker appears below the label
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
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

