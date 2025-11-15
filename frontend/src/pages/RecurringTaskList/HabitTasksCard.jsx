import React from 'react';

import { useEffect, useState } from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import { mockTasksAPI } from '../../utils/MockApi.js'; // <-- adjust path to where you put it

const SingleTasksCard = ({ currentUser }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null); // helpful for debugging


  useEffect(() => {
  if (!currentUser?.id) return;

  let ignore = false;

  (async () => {
    try {
      const allTasks = await mockTasksAPI.getTasksForUser(currentUser.id);
      if (ignore) return;

      const topThreeSingleTasks = allTasks
        .filter((task) => task.type === 'SINGLE')
        .sort(
          (a, b) =>
            Number(b.points ?? 0) - Number(a.points ?? 0) // highest points first
        )
        .slice(0, 3); // only keep first 3

      setTasks(topThreeSingleTasks);
    } catch (err) {
      console.error(err);
      if (!ignore) setError(err);
    }
  })();

  return () => {
    ignore = true;
  };
}, [currentUser]);

  // For now, show something even if there are no tasks, so you can SEE the card
  if (error) {
    return <Typography color="error">Failed to load tasks</Typography>;
  }

  if (!tasks.length) {
    return (
      <Paper
        elevation={4}
        sx={{
          mt: 1,
          borderRadius: 3,
          p: 2,
          maxWidth: 600,
          width: '100%',
          bgcolor: 'rgba(255, 248, 240, 0.9)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
          Habitual Tasks
        </Typography>
        <Typography variant="body2">No single tasks found.</Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={4}
      sx={{
        mt: 1,
        borderRadius: 3,
        p: 1.5,
        maxWidth: 600,
        width: '100%',
        bgcolor: 'rgba(255, 248, 240, 0.9)',
        backdropFilter: 'blur(4px)',
        height: 'auto',          // ensure content-based height
        alignSelf: 'flex-start', // don't stretch if parent is flex
        boxSizing: 'border-box',
        }}
    >
      <Typography
        variant="subtitle1"          // was h6
        sx={{ mb: 1, fontWeight: 'bold' }}
      >
        Habitual Tasks
      </Typography>

      <List disablePadding dense>    {/* 👈 dense makes items shorter */}
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&:last-of-type': { mb: 0 },
              bgcolor: 'rgba(255,255,255,0.7)',
              py: 1,                 // vertical padding inside item
              px: 1.5,
            }}
          >
            <ListItemText
              primary={task.title}
              secondary={task.description}
            />

            <Stack spacing={0.5} alignItems="flex-end">
              <Chip
                size="small"
                label={`${task.points} pts`}
                color="secondary"
                variant="filled"
              />
              <Chip
                size="small"
                label={`Difficulty: ${task.difficulty}`}
                color="primary"
                variant="outlined"
              />
              {task.completed && (
                <Chip
                  size="small"
                  label="Completed"
                  color="success"
                  variant="filled"
                />
              )}
            </Stack>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SingleTasksCard;