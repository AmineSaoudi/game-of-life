import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Collapse,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import TaskCard from "./TaskCard";
import { taskApiCalls } from "../../utils/Api.js";
import { useAuthContext } from "../../context/AuthContext.jsx";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const { refetchUser } = useAuthContext();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await taskApiCalls.getSingleTasks();
        console.log(data);
        setTasks(data);
      } catch (e) {
        setError(e);
        console.error("failed to load task", error);
      }
    };

    fetchTasks();
  }, []);

  // --Popup window for adding new task logic--

  // controls popup visibility
  const [open, setOpen] = useState(false);

  const initialTaskState = {
    title: "",
    description: "",
    dueDate: "",
    difficulty: 1, // always a number
  };
  // initially fields of new task are empty
  const [newTask, setNewTask] = useState(initialTaskState);

  // logic for opening and closing the add task popup window
  const handleOpen = () => setOpen(true);

  // when done creating a new task, reset new task fiels to empty
  // to accomodate next new task
  const handleClose = () => {
    setNewTask(initialTaskState);
    setOpen(false);
  };

  const handleAddTask = async () => {
    if (!newTask.title.trim()) return; // doesn't add new task if title is empty

    const newTaskObject = {
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      difficulty: newTask.difficulty,
      type: "NON_RECURRING",
    };

    // update the tasks list with the new task
    try {
      await taskApiCalls.createTask(newTaskObject);

      // reload from DB
      const updatedTasks = await taskApiCalls.getSingleTasks();
      setTasks(updatedTasks);

      handleClose();
    } catch (error) {
      console.error("Failed to create task:", error);
      setError(error.message || "Task creation failed");
    }
  };

  // updates completed field of given task when box is checked
  const handleComplete = async (taskId) => {
    try {
      const updatedTask = await taskApiCalls.updateTask(taskId, {
        completed: true,
      });

      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
      await refetchUser();
    } catch (err) {
      console.error("Failed to complete task:", err);
    }
  };

  // --Filtering task type logic--

  const [filter, setFilter] = useState("today");

  const filterTasks = (task) => {
    // current day at midnight
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const due = task.dueDate ? new Date(task.dueDate + "T00:00:00") : null;

    switch (filter) {
      case "today":
        return due && due.toDateString() === now.toDateString();
      case "upcoming":
        return due && due - now > 0 && due - now <= 14 * 24 * 60 * 60 * 1000;
      case "future":
        return due && due - now > 14 * 24 * 60 * 60 * 1000;
      case "overdue":
        return due && due < now && !task.completed;
      case "completed":
        return task.completed === true;
      default:
        return true;
    }
  };

  return (
    // Container for page
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        boxSizing: "border-box",
        overflowX: "hidden", // prevent horizontal scroll
        background: "linear-gradient(180deg, #fbfbfdff 0%, #e1cffcff 100%)",
      }}
    >
      {/* Title Card */}
      <Box
        sx={{
          bgcolor: "#DAC1FF",
          color: "#7A2E8E",
          borderRadius: 1,
          boxShadow: "0px 4px 15px rgba(0,0,0,0.25)",
          border: "3px solid #9049A4",
          fontFamily: "'Press Start 2P', cursive",
          mb: 3,
        }}
      >
        <Typography
          fontSize="35px"
          textAlign="center"
          sx={{
            fontFamily: "'Press Start 2P', cursive",
          }}
        >
          Tasks
        </Typography>
      </Box>

      {/* Filter Bar */}
      <Box
        sx={{
          display: "flex",
          width: "90%",
          mx: "auto",
          mt: 2,
          borderRadius: 1,
          overflow: "hidden",
          boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
        }}
      >
        {["today", "upcoming", "future", "overdue", "completed"].map(
          (section) => (
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
                borderRight: section !== "completed" ? "2px solid #CBA8EF" : "none",
                transition: "0.25s",
                "&:hover": {
                  bgcolor: filter === section ? "#7a3b90" : "#dcbfff",
                },
              }}
            >
              {section.toUpperCase()}
            </Box>
          )
        )}
      </Box>

      {/* Container for task list and components box */}
      <Box
        sx={{
          display: "flex",
          gap: 4,
          px: 5,
          mt: 3,
        }}
      >
        {/* Task List */}
        <Box sx={{ width: "50%" }}>
          {tasks
            .filter(filterTasks)
            .sort((a, b) => b.id - a.id) // newest completed first
            .map((task) =>
              filter === "completed" ? (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={handleComplete}
                />
              ) : (
                <Collapse key={task.id} in={!task.completed} timeout={300}>
                  <TaskCard task={task} onComplete={handleComplete} />
                </Collapse>
              )
            )}
        </Box>

        <Box
          sx={{
            width: "50%",
            minHeight: "300px",
            bgcolor: "#F4E6FF",
            borderRadius: 3,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            border: "2px solid #A66CC7",
            p: 3,
          }}
        >
          <Box textAlign="left" mt={1}>
            {/* Add Task Button */}
            <Button
              onClick={handleOpen}
              sx={{
                background: "#7A2E8E",
                color: "#F7D8FF",
                fontFamily: "'Press Start 2P', cursive",
                fontSize: "14px",
                px: 4,
                py: 2,
                border: "3px solid #C38BFF",
                boxShadow: "0px 4px 0px #4D1B5B",
                textTransform: "none",
                transition: "0.2s",
                "&:hover": {
                  background: "#8E3DA3",
                  transform: "translateY(-2px)",
                  boxShadow: "0px 6px 0px #4D1B5B",
                },
                "&:active": {
                  transform: "translateY(1px)",
                  boxShadow: "0px 2px 0px #4D1B5B",
                },
              }}
            >
              + Add Task
            </Button>
          </Box>
        </Box>
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
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />

          <TextField
            margin="dense"
            label="Due Date"
            type="date"
            // So that date picker appears below the label
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
          />

          <FormControl fullWidth margin="dense">
            <InputLabel>Difficulty</InputLabel>
            <Select
              value={newTask.difficulty}
              label="Difficulty"
              onChange={(e) =>
                setNewTask({ ...newTask, difficulty: Number(e.target.value) })
              }
              required
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAddTask}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
