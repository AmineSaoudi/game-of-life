import React, { useEffect, useState } from "react";
import { taskApiCalls } from "../../utils/Api.js";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

const HabitTasksCard = () => {
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await taskApiCalls.getHabitTasks();
        console.log("User habit tasks:", data);
        setTasks(data || []);
      } catch (err) {
        setError(err);
        console.error("Failed to load habit tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  const cardStyles = {
    m: 1,
    borderRadius: "16px",
    p: 2,
    width: { xs: "100%", sm: 600 },
    maxWidth: "100%",
    backgroundColor: "var(--color-surface)",
    boxShadow: "var(--shadow-soft)",
    border: "1px solid var(--color-border-subtle)",
    boxSizing: "border-box",
    alignSelf: "flex-start",
  };

  // error state
  if (error) {
    return (
      <Paper elevation={0} sx={cardStyles}>
        <Typography color="error" variant="body2">
          Failed to load habitual tasks
        </Typography>
      </Paper>
    );
  }

  // no tasks state
  if (!tasks.length) {
    return (
      <Paper elevation={0} sx={cardStyles}>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 1.5,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            color: "var(--color-text-main)",
          }}
        >
          Habitual Tasks
        </Typography>
        <Typography variant="body2" sx={{ color: "var(--color-text-muted)" }}>
          No habitual tasks found.
        </Typography>
      </Paper>
    );
  }

  const visibleTasks = tasks.slice(0, 3);

  return (
    <Paper elevation={0} sx={cardStyles}>
      <Typography
        variant="subtitle1"
        sx={{
          mb: 1.5,
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          color: "var(--color-text-main)",
        }}
      >
        Habitual Tasks
      </Typography>

      <List disablePadding dense>
        {visibleTasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              borderRadius: 2,
              mb: 1,
              "&:last-of-type": { mb: 0 },
              backgroundColor: "#F4F1FF",
              py: 1,
              px: 1.5,
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <ListItemText
              primaryTypographyProps={{
                style: {
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  color: "var(--color-text-main)",
                },
              }}
              secondaryTypographyProps={{
                style: {
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.85rem",
                  color: "var(--color-text-muted)",
                },
              }}
              primary={task.title}
              secondary={task.description}
            />

            <Stack spacing={0.5} alignItems="flex-end" sx={{ ml: 2 }}>
              {/* Points / XP for habit */}
              <Chip
                size="small"
                label={`${task.points} pts`}
                sx={{
                  backgroundColor: "var(--color-primary-soft)",
                  color: "var(--color-primary)",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  borderRadius: "999px",
                }}
              />

              {/* Frequency (if you have something like timesPerWeek) */}
              {task.timesPerWeek && (
                <Chip
                  size="small"
                  label={`${task.timesPerWeek}x / week`}
                  sx={{
                    backgroundColor: "white",
                    borderColor: "var(--color-border-subtle)",
                    borderWidth: 1,
                    borderStyle: "solid",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.7rem",
                    color: "var(--color-text-muted)",
                    borderRadius: "999px",
                  }}
                />
              )}

              {/* Difficulty */}
              <Chip
                size="small"
                label={`Difficulty: ${task.difficulty}`}
                sx={{
                  backgroundColor: "white",
                  borderColor: "var(--color-border-subtle)",
                  borderWidth: 1,
                  borderStyle: "solid",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.7rem",
                  color: "var(--color-text-muted)",
                  borderRadius: "999px",
                }}
              />

              {/* Completed indicator for the current week/day */}
              {task.completed && (
                <Chip
                  size="small"
                  label="On track"
                  sx={{
                    backgroundColor: "var(--color-difficulty-1)",
                    color: "#FFFFFF",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "0.7rem",
                    borderRadius: "999px",
                  }}
                />
              )}
            </Stack>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default HabitTasksCard;
