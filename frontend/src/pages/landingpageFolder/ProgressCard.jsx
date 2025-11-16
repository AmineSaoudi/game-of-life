// src/components/ProgressCard.jsx
import React, { useEffect, useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  LinearProgress,
  Stack,
  CircularProgress,
} from '@mui/material';
import { taskApiCalls } from '../../utils/Api';

const ProgressCard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalPoints, setTotalPoints] = useState(0);
  const [completedPoints, setCompletedPoints] = useState(0);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        setError('');

        const singleTasks = await taskApiCalls.getSingleTasks();

        // assume each task has a `points` field; fall back to 1 if not
        const getPoints = (task) =>
          typeof task.points === 'number' ? task.points : 1;

        const total = singleTasks.reduce(
          (sum, task) => sum + getPoints(task),
          0
        );

        const completed = singleTasks
          .filter((task) => task.completed)
          .reduce((sum, task) => sum + getPoints(task), 0);

        setTotalPoints(total);
        setCompletedPoints(completed);
      } catch (err) {
        console.error('Failed to load single tasks:', err);
        setError('Failed to load single tasks');
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const percent =
    totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;

  return (
    <Paper
      elevation={4}
      sx={{
        m: 1,
        p: 2,
        borderRadius: 3,
        width: { xs: '100%', sm: 400 },
        bgcolor: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(4px)',
        boxSizing: 'border-box',
      }}
    >
      {loading ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <CircularProgress size={20} />
          <Typography variant="body2">Loading single-task progress…</Typography>
        </Stack>
      ) : error ? (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      ) : totalPoints === 0 ? (
        <Typography variant="body2">
          You don’t have any Single Tasks yet.
        </Typography>
      ) : (
        <>
          <Typography
            variant="subtitle2"
            sx={{ textTransform: 'uppercase', color: 'text.secondary', mb: 1 }}
          >
            Single Tasks Progress
          </Typography>

          <Box sx={{ mb: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {completedPoints} / {totalPoints} points
            </Typography>
            <Typography variant="caption" color="text.secondary">
              of Single Tasks have been completed
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={percent}
            sx={{ height: 10, borderRadius: 5, transition: 'all 0.5s ease-in-out' }}
          />

          <Box sx={{ mt: 0.5, textAlign: 'right' }}>
            <Typography variant="caption" color="text.secondary">
              {percent}%
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default ProgressCard;
