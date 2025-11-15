import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function TaskCard({ task, onComplete }) {
  return (
    <Card
      sx={{
        marginBottom: 2,
        padding: 2,
        width: "30%",
        bgcolor: "#9049A4",
        color: "#F0C5FD",
        borderRadius: 10,
        boxShadow: 1,
        "&:hover": {
          bgcolor: "#7F3F92",
          boxShadow: 1,
          transform: "scale(1.001)",
        },
        transition: "all 0.2s ease-in-out",
      }}
    >
      <CardContent>
        {/* Task title and checkbox container */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6" sx={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "15px"
          }}
          >
            {task.title}
          </Typography>

          <Box
            onClick={() => !task.completed && onComplete(task.id)}
            sx={{
              width: 30,
              height: 30,
              bgcolor: task.completed ? "green" : "#F0C5FD",
              borderRadius: 2,
              border: "2px solid #F0C5FD",
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

        {task.description && (
          <Typography variant="body2" color="#F4DBFB" sx={{ mt: 1 }}>
            {task.description}
          </Typography>
        )}

        <Typography sx={{ mt: 1 }}>
          Points: <b>{task.points}</b>
        </Typography>

        {task.frequency && (
          <Typography variant="caption">Frequency: {task.frequency}</Typography>
        )}
      </CardContent>
    </Card>
  );
}
