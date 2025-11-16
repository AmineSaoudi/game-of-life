import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function TaskCard({ task, onComplete }) {
  return (
    <Card
      sx={{
        marginBottom: 2,
        padding: 0.5,
        width: "100%",
        bgcolor: "#E2CFFE",
        color: "#7A2E8E",
        border: "2px solid #e7b1f7ff",
        borderRadius: 2,
        boxShadow: 1,
        "&:hover": {
          bgcolor: "#d3b7feff",
          boxShadow: 1,
          transform: "scale(1.001)",
        },
        transition: "all 0.2s ease-in-out",
      }}
    >
      <CardContent>
        {/* Task title and checkbox container. So that they're on the same line. */}
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>

          {/* Task Title */}
          <Typography variant="h6" sx={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "15px",
            flexGrow: 1,
            wordBreak: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "normal"
          }}
          >
            {task.title}
          </Typography>

          {/* Checkbox */}
          <Box
            onClick={() => !task.completed && onComplete(task.id)}
            sx={{
              width: 30,
              height: 30,
              flexShrink: 0,
              bgcolor: task.completed ? "green" : "#faf6fbff",
              borderRadius: 0.5,
              border: "2px solid #e7b1f7ff",
              cursor: task.completed ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: task.completed ? "green" : "#F4DBFB",
                transform: task.completed ? "scale(1)" : "scale(1.1)",
              },
            }}
          >
            {/* Checkmark appears only when completed */}
            {task.completed && (
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 16,
                  transition: "all 0.3s ease",
                }}
              >
                ✓
              </Typography>
            )}
          </Box>
        </Box>

        {/* Task Description */}
        {task.description && (
          <Typography variant="body2" color="#8e40a2ff" sx={{ mt: 0.5 }}>
            {task.description}
          </Typography>
        )}

        {/* Task Due Date */}
        {task.duedate && (
          <Typography variant = "body2" color="#8e40a2ff" sx={{ mt: 1 }}>
            {task.duedate}
          </Typography>
        )
        }

        {/* Associated points/difficulty level */}
        <Typography sx={{ mt: 1 }}>
          Points: <b>{task.points}</b>
        </Typography>

        <Typography sx={{ mt: 0.5 }}>
          Difficulty: <b>{task.difficulty}</b>/5
        </Typography>

        {/* Task Frequency (for habit tasks) */}
        {task.frequency && (
          <Typography variant="caption">Frequency: {task.frequency}</Typography>
        )}
      </CardContent>
    </Card>
  );
}
