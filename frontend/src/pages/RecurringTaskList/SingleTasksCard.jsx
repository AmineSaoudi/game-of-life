import React from 'react';
import { taskApiCalls } from "../../utils/Api.js"
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

const SingleTasksCard = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null); // helpful for debugging
  
  useEffect(() => {
      const fetchTasks = async () => {
        try {
          const data = await taskApiCalls.getSingleTasks();
          console.log('User tasks:', data);
          setTasks(data || []);
        } catch (err) {
          setError(err);
          console.error('Failed to load tasks:', err);
        }
      };
  
      fetchTasks(); // actually run the async function
    }, []);

  // For now, show something even if there are no tasks, so you can SEE the card
  if (error) {
    return <Typography color="error">Failed to load tasks</Typography>;
  }

  if (!tasks.length) {
    return (
      <Paper
        elevation={4}
        sx={{
          mt:1,
          borderRadius: 3,
          p: 1.5,
          width: { xs: '100%', sm: 600 },
          maxWidth: '100%',
          bgcolor: 'rgba(255, 248, 240, 0.9)',
          backdropFilter: 'blur(4px)',
          height: 'auto',          // ensure content-based height
          alignSelf: 'flex-start', // don't stretch if parent is flex
          boxSizing: 'border-box',
        }}
      >
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
          Single Tasks
        </Typography>
        <Typography variant="body2">No single tasks found.</Typography>
      </Paper>
    );
  }
  const visibleTasks = tasks.slice(0, 3);


  return (
    <Paper
      elevation={4}
      sx={{
        m:1,
        borderRadius: 3,
        p: 1.5,
        width: { xs: '100%', sm: 600 },
        maxWidth: '100%',
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
        Single Tasks
      </Typography>

      <List disablePadding dense>    {/* 👈 dense makes items shorter */}
        {visibleTasks.map((task) => (
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