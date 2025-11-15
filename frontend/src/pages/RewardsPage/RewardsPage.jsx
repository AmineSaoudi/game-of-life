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
import { alpha } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";


// Yellow (low milestone) → Red (high milestone)
function getMilestoneColor(milestone, maxMilestone) {
  const ratio = milestone / maxMilestone; // 0..1
  const hue = 50 - 50 * ratio; // 50° (yellow) -> 0° (red)
  return `hsl(${hue}, 90%, 55%)`;
}

const DAILY_MILESTONES = [50, 100, 150, 200];
const LT_MILESTONES = [500, 1000, 1500, 2000];

const STORAGE_KEY = "rewardsState";

function getTodayString() {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

export default function RewardsPage() {
  const [dailyPoints, setDailyPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const [dailyRewards, setDailyRewards] = useState({
    50: "One hour break",
    100: "Buy a small treat",
    150: "One hour break",
    200: "Guilt-free evening",
  });
  const [longTermRewards, setLongTermRewards] = useState({
    500: "Reward for 500 pts",
    1000: "Reward for 1000 pts",
    1500: "Reward for 1500 pts",
    2000: "Reward for 2000 pts",
  });

  // Claimed status for each milestone (true = claimed)
  const [claimedDaily, setClaimedDaily] = useState({});
  const [claimedLT, setClaimedLT] = useState({});

  // ---------------------------------------------------------------------------
  // INITIAL LOAD: get data (currently localStorage, later from your backend)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const today = getTodayString();

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        // TODO: API – instead of reading from localStorage,
        // call your backend here to fetch:
        // - dailyPoints
        // - totalPoints
        // - dailyRewards / longTermRewards
        // - claimedDaily / claimedLT
        // For example: GET /api/rewards for this user.

        setTotalPoints(parsed.totalPoints ?? 0);
        setDailyRewards(parsed.dailyRewards ?? dailyRewards);
        setLongTermRewards(parsed.longTermRewards ?? longTermRewards);
        setClaimedLT(parsed.claimedLT ?? {});

        if (parsed.lastDailyDate === today) {
          setDailyPoints(parsed.dailyPoints ?? 0);
          setClaimedDaily(parsed.claimedDaily ?? {});
        } else {
          // New day => reset daily points & claimed daily rewards
          setDailyPoints(0);
          setClaimedDaily({});
        }
      } catch (e) {
        console.error("Failed to parse rewards state:", e);
      }
    }

    // If you get points from a central place (e.g. context or prop),
    // you can also setDailyPoints / setTotalPoints from props here instead.
  }, []); // run once on mount

  // ---------------------------------------------------------------------------
  // SAVE: whenever something changes, persist it
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const today = getTodayString();

    const stateToSave = {
      dailyPoints,
      totalPoints,
      dailyRewards,
      longTermRewards,
      claimedDaily,
      claimedLT,
      lastDailyDate: today,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));

    // TODO: API – this is where you’d sync changes to your backend.
    // Example:
    //   await api.updateRewards(stateToSave)
    // Called after user edits reward names or toggles claimed status.
  }, [dailyPoints, totalPoints, dailyRewards, longTermRewards, claimedDaily, claimedLT]);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const handleDailyRewardChange = (milestone, value) => {
    setDailyRewards((prev) => ({
      ...prev,
      [milestone]: value,
    }));
    // TODO: API – optionally debounce and PATCH just this reward text.
  };

  const handleLTRewardChange = (milestone, value) => {
    setLongTermRewards((prev) => ({
      ...prev,
      [milestone]: value,
    }));
    // TODO: API – optionally debounce and PATCH just this reward text.
  };

  const toggleDailyClaimed = (milestone) => {
    setClaimedDaily((prev) => ({
      ...prev,
      [milestone]: !prev[milestone],
    }));
    // TODO: API – PATCH claimed status for this daily reward.
  };

  const toggleLTClaimed = (milestone) => {
    setClaimedLT((prev) => ({
      ...prev,
      [milestone]: !prev[milestone],
    }));
    // TODO: API – PATCH claimed status for this long-term reward.
  };

  // ---------------------------------------------------------------------------
  // Progress bar values
  // (points themselves will come from elsewhere in your app later)
  // ---------------------------------------------------------------------------

  const dailyMax = DAILY_MILESTONES[DAILY_MILESTONES.length - 1];
  const ltMax = LT_MILESTONES[LT_MILESTONES.length - 1];

  const dailyProgress = Math.min((dailyPoints / dailyMax) * 100, 100);
  const ltProgress = Math.min((totalPoints / ltMax) * 100, 100);

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
            {/* TODO: API – dailyPoints should come from your tasks/XP system.
                This component just displays whatever value you pass in or load. */}
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Total Points</Typography>
            <Typography variant="h4">{totalPoints}</Typography>
            <Typography variant="body2" color="text.secondary">
              Lifetime points
            </Typography>
            {/* TODO: API – same here: totalPoints should come from backend. */}
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
                        transition: "background-color 0.2s ease, transform 0.2s ease",
                        borderLeft: `4px solid ${color}`,
                        bgcolor: claimed ? alpha(color, 0.18) : alpha(color, 0.05),
                        "&:hover": {
                        bgcolor: claimed ? alpha(color, 0.24) : alpha(color, 0.12),
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

                    {/* EDIT ICON */}
                    <IconButton size="small" sx={{ opacity: 0.6 }}>
                        <EditIcon fontSize="small" />
                    </IconButton>

                    {/* editable field */}
                    <TextField
                        size="small"
                        fullWidth
                        value={dailyRewards[m] || ""}
                        onChange={(e) => handleDailyRewardChange(m, e.target.value)}
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
                        transition: "background-color 0.2s ease, transform 0.2s ease",
                        borderLeft: `4px solid ${color}`,
                        bgcolor: claimed ? alpha(color, 0.18) : alpha(color, 0.05),
                        "&:hover": {
                        bgcolor: claimed ? alpha(color, 0.24) : alpha(color, 0.12),
                        transform: "translateX(2px)",
                        },
                    }}
                    >
                    <Typography
                        sx={{
                            minWidth: "80px",     // ← prevents wrapping
                            whiteSpace: "nowrap", // ← forces text to stay on one line
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

                    {/* EDIT ICON */}
                    <IconButton size="small" sx={{ opacity: 0.6 }}>
                        <EditIcon fontSize="small" />
                    </IconButton>

                    {/* Editable reward text */}
                    <TextField
                      size="small"
                      fullWidth
                      value={longTermRewards[m] || ""}
                      onChange={(e) =>
                        handleLTRewardChange(m, e.target.value)
                      }
                      placeholder="Describe your reward"
                      InputProps={{
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
}
