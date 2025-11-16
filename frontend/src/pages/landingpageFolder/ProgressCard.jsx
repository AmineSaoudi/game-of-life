// src/components/ProgressCard.jsx
import React, { useEffect, useState } from "react";
import {
  Paper,
  Box,
  Typography,
  LinearProgress,
  Stack,
  CircularProgress,
} from "@mui/material";
import { taskApiCalls } from "../../utils/Api";

const ProgressCard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPoints, setTotalPoints] = useState(0);
  const [completedPoints, setCompletedPoints] = useState(0);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        setError("");

        const singleTasks = await taskApiCalls.getSingleTasks();

        const getPoints = (task) =>
          typeof task.points === "number" ? task.points : 1;

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
        console.error("Failed to load single tasks:", err);
        setError("Failed to load single tasks");
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
      elevation={0}
      sx={{
        m: 0,
        mb: 2,
        p: 2.5,
        borderRadius: "16px",
        width: { xs: "260px", sm: "300px", md: "320px" },
        backgroundColor: "var(--color-surface)",
        boxShadow: "var(--shadow-soft)",
        border: "1px solid var(--color-border-subtle)",
        boxSizing: "border-box",
      }}
    >
      {loading ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <CircularProgress size={18} />
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
            sx={{
              fontFamily: "Poppins, sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-text-muted)",
              mb: 1,
            }}
          >
            Single Tasks Progress
          </Typography>

          <Box sx={{ mb: 1 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, color: "var(--color-text-main)" }}
            >
              {completedPoints} / {totalPoints} points
            </Typography>
            <Typography variant="caption" sx={{ color: "var(--color-text-muted)" }}>
              of Single Tasks have been completed
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={percent}
            sx={{
              height: 8,
              borderRadius: 999,
              backgroundColor: "#EDEBFA",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "var(--color-primary)",
              },
            }}
          />

          <Box sx={{ mt: 0.75, textAlign: "right" }}>
            <Typography variant="caption" sx={{ color: "var(--color-text-muted)" }}>
              {percent}%
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default ProgressCard;
