import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

export default function TaskCard({ task, onComplete }) {
  return (
    <Card sx={{ 
      marginBottom: 2, 
      padding: 2,
      width: '30%',
      bgcolor: 'lightblue',
      borderRadius: 10,
      boxShadow: 1,
      "&:hover": {
        boxShadow: 2,
        transform: "scale(1.01)",
      }
      }}
    >

      <CardContent>

        <Typography variant="h6">{task.title}</Typography>

        {task.description && (
          <Typography variant="body2" color="text.secondary">
            {task.description}
          </Typography>
        )}

        <Typography sx={{ marginTop: 1 }}>
          Points: <b>{task.points}</b>
        </Typography>

        {/* Frequency (for habits only) */}
        {task.frequency && (
          <Typography variant="caption">
            Frequency: {task.frequency}
          </Typography>
        )}

        <Box sx={{ marginTop: 2 }}>
          {!task.completed ? (
            <Button variant="contained" onClick={() => onComplete(task.id)}>
              Mark Complete
            </Button>
          ) : (
            <Typography color="green">Completed ✓</Typography>
          )}
        </Box>

      </CardContent>
    </Card>
  );
}
