// src/components/RewardsDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Stack,
  TextField,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import EditIcon from "@mui/icons-material/Edit";
import { alpha } from "@mui/material/styles";

import { userApiCalls, taskApiCalls } from "../../utils/Api";

// Milestones (points)
const DAILY_MILESTONES = [100, 250, 500];
const LT_MILESTONES = [500, 1000, 1500, 2000];

// Simple color ramp based on how big the milestone is
const getMilestoneColor = (milestone, max) => {
  const ratio = milestone / max;
  if (ratio <= 0.33) return "#42a5f5"; // blue
  if (ratio <= 0.66) return "#ffb300"; // amber
  return "#66bb6a"; // green
};
// helper: is a given date string on *today* (local time)?
const isCompletedToday = (task) => {
  if (!task.completed || !task.completedAt) return false;

  const completedDate = new Date(task.completedAt);
  const now = new Date();

  return (
    completedDate.getFullYear() === now.getFullYear() &&
    completedDate.getMonth() === now.getMonth() &&
    completedDate.getDate() === now.getDate()
  );
};


const RewardsDashboard = () => {
  // ---------------------- POINTS STATE --------------------------------------
  const [dailyPoints, setDailyPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  // ---------------------- REWARD TEXT STATE ---------------------------------
  const [dailyRewards, setDailyRewards] = useState({
    100: "Take a 15-minute break to do something you enjoy",
    250: "Watch an episode of your favorite show",
    500: "Order a nice coffee or dessert",
  });

  const [longTermRewards, setLongTermRewards] = useState({
    500: "Treat yourself to a fancy coffee or dessert",
    1000: "Buy a small treat (book, game skin, candle, etc.)",
    1500: "Plan a fun outing: movie, museum, or day with friends",
    2000: "Bigger reward: new headphones, shoes, or a mini day trip",
  });

  // ---------------------- CLAIMED STATE -------------------------------------
  // object keyed by milestone: { "100": true, "250": false, ... }
  const [claimedDaily, setClaimedDaily] = useState({});
  const [claimedLT, setClaimedLT] = useState({});

  // ---------------------- LOAD DATA FROM API --------------------------------
  useEffect(() => {
  const loadPoints = async () => {
    try {
      // 1) Get user (for total points)
      const user = await userApiCalls.getCurrentUser();

      // 2) Get all tasks (for daily points)
      const tasks = await taskApiCalls.getTasks();

      // Total points: directly from user API
      const userTotalPoints = user?.points ?? 0;
      setTotalPoints(userTotalPoints);

      // Daily points: sum of points for tasks completed *today*
      const dailyFromTasks = (tasks || [])
        .filter(isCompletedToday)                 // 👈 use helper here
        .reduce((sum, t) => sum + (t.points ?? 0), 0);

      setDailyPoints(dailyFromTasks);
    } catch (err) {
      console.error("Failed to load points:", err);
      // you could set error state here if needed
    }
  };

  loadPoints();
}, []);

  // ---------------------- HANDLERS ------------------------------------------
  const handleDailyRewardChange = (milestone, value) => {
    setDailyRewards((prev) => ({
      ...prev,
      [milestone]: value,
    }));
  };

  const handleLTRewardChange = (milestone, value) => {
    setLongTermRewards((prev) => ({
      ...prev,
      [milestone]: value,
    }));
  };

  const toggleDailyClaimed = (milestone) => {
    setClaimedDaily((prev) => ({
      ...prev,
      [milestone]: !prev[milestone],
    }));
  };

  const toggleLTClaimed = (milestone) => {
    setClaimedLT((prev) => ({
      ...prev,
      [milestone]: !prev[milestone],
    }));
  };

  // ---------------------- DERIVED VALUES ------------------------------------
  const dailyMax = DAILY_MILESTONES[DAILY_MILESTONES.length - 1];
  const ltMax = LT_MILESTONES[LT_MILESTONES.length - 1];

  const dailyProgress =
    dailyMax > 0
      ? Math.min(100, Math.round((dailyPoints / dailyMax) * 100))
      : 0;

  const ltProgress =
    ltMax > 0
      ? Math.min(100, Math.round((totalPoints / ltMax) * 100))
      : 0;

  // ---------------------- RENDER --------------------------------------------
  return (
    <Box sx={{ p: 3 }}>
      {/* Top counters */}
      <Stack direction="row" spacing={2} mb={3}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Daily Points</Typography>
            <Typography variant="h4">{dailyPoints}</Typography>
            <Typography variant="body2" color="text.secondary">
              Resets every day
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Total Points</Typography>
            <Typography variant="h4">{totalPoints}</Typography>
            <Typography variant="body2" color="text.secondary">
              Lifetime points
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        {/* DAILY REWARDS ------------------------------------------------------ */}
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Daily Rewards
            </Typography>

            <Typography variant="body2" mb={1}>
              Progress to daily milestones
            </Typography>
            <LinearProgress
              variant="determinate"
              value={dailyProgress}
              sx={{ mb: 2 }}
            />
            <Typography variant="caption">
              {dailyPoints} / {dailyMax} pts
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1}>
              {DAILY_MILESTONES.map((m) => {
                const claimed = !!claimedDaily[m];
                const color = getMilestoneColor(m, dailyMax);

                return (
                  <Box
                    key={m}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      p: 0.5,
                      borderRadius: 1,
                      transition:
                        "background-color 0.2s ease, transform 0.2s ease",
                      borderLeft: `4px solid ${color}`,
                      bgcolor: claimed
                        ? alpha(color, 0.18)
                        : alpha(color, 0.05),
                      "&:hover": {
                        bgcolor: claimed
                          ? alpha(color, 0.24)
                          : alpha(color, 0.12),
                        transform: "translateX(2px)",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        minWidth: "80px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {m} pts
                    </Typography>

                    {/* Check-circle toggle */}
                    <Tooltip
                      title={
                        claimed
                          ? "Click to mark as unclaimed"
                          : "Click when you claim this reward"
                      }
                    >
                      <IconButton onClick={() => toggleDailyClaimed(m)}>
                        {claimed ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <RadioButtonUncheckedIcon />
                        )}
                      </IconButton>
                    </Tooltip>

                    {/* EDIT ICON (visual only for now) */}
                    <IconButton size="small" sx={{ opacity: 0.6 }}>
                      <EditIcon fontSize="small" />
                    </IconButton>

                    {/* Editable reward text */}
                    <TextField
                      size="small"
                      fullWidth
                      value={dailyRewards[m] || ""}
                      onChange={(e) =>
                        handleDailyRewardChange(m, e.target.value)
                      }
                      InputProps={{
                        sx: {
                          textDecoration: claimed ? "line-through" : "none",
                          opacity: claimed ? 0.6 : 1,
                        },
                      }}
                    />
                  </Box>
                );
              })}
            </Stack>
          </CardContent>
        </Card>

        {/* LONG-TERM REWARDS -------------------------------------------------- */}
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Long-term Rewards
            </Typography>

            <Typography variant="body2" mb={1}>
              Progress to long-term milestones
            </Typography>
            <LinearProgress
              variant="determinate"
              value={ltProgress}
              sx={{ mb: 2 }}
            />
            <Typography variant="caption">
              {totalPoints} / {ltMax} pts
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1}>
              {LT_MILESTONES.map((m) => {
                const claimed = !!claimedLT[m];
                const color = getMilestoneColor(m, ltMax);

                return (
                  <Box
                    key={m}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      p: 0.5,
                      borderRadius: 1,
                      transition:
                        "background-color 0.2s ease, transform 0.2s ease",
                      borderLeft: `4px solid ${color}`,
                      bgcolor: claimed
                        ? alpha(color, 0.18)
                        : alpha(color, 0.05),
                      "&:hover": {
                        bgcolor: claimed
                          ? alpha(color, 0.24)
                          : alpha(color, 0.12),
                        transform: "translateX(2px)",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        minWidth: "80px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {m} pts
                    </Typography>

                    {/* Check-circle toggle */}
                    <Tooltip
                      title={
                        claimed
                          ? "Click to mark as unclaimed"
                          : "Click when you claim this reward"
                      }
                    >
                      <IconButton onClick={() => toggleLTClaimed(m)}>
                        {claimed ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <RadioButtonUncheckedIcon />
                        )}
                      </IconButton>
                    </Tooltip>


                    {/* Editable reward text */}
                    <TextField
                      size="small"
                      fullWidth
                      value={longTermRewards[m] || ""}
                      onChange={(e) =>
                        handleLTRewardChange(m, e.target.value)
                      }
                      placeholder="Describe your reward"
                      slotProps={{
                        sx: {
                          transition: "all 0.2s ease",
                          textDecoration: claimed ? "line-through" : "none",
                          opacity: claimed ? 0.6 : 1,
                        },
                      }}
                    />
                  </Box>
                );
              })}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default RewardsDashboard;
