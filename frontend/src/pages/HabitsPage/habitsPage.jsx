import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Stack,
  Grid,
  Slider,
  IconButton,
  Tooltip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { alpha } from "@mui/material/styles";

// Map difficulty (1–5) to color from green → red
function getDifficultyColor(difficulty) {
  // difficulty 1 -> ratio 0 (green), 5 -> ratio 1 (red)
  const ratio = (difficulty - 1) / 4;
  const hue = 120 - 120 * ratio; // 120° = green, 0° = red
  return `hsl(${hue}, 80%, 50%)`;
}

export default function HabitsPage() {
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------

  // Shape of each habit:
  // {
  //   id,
  //   name,
  //   timesPerWeek,
  //   difficulty (1-5),
  //   description,
  //   weeklyCount,   // how many times completed THIS week
  // }
  const [habits, setHabits] = useState([]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [newName, setNewName] = useState("");
  const [newTimesPerWeek, setNewTimesPerWeek] = useState("");
  const [newDifficulty, setNewDifficulty] = useState(3); // 1–5
  const [newDescription, setNewDescription] = useState("");

  const [errors, setErrors] = useState({});

  // ---------------------------------------------------------------------------
  // INITIAL LOAD: get habits from backend (later) or localStorage (now)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    // TODO: API – replace this with GET /api/habits for the logged-in user.
    const saved = localStorage.getItem("habitsState");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHabits(parsed.habits || []);
      } catch (e) {
        console.error("Failed to parse habits from localStorage:", e);
      }
    }
  }, []);

  // ---------------------------------------------------------------------------
  // SAVE to localStorage when habits change (temporary persistence)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const stateToSave = { habits };
    localStorage.setItem("habitsState", JSON.stringify(stateToSave));

    // TODO: API – in the real app:
    //   - POST /api/habits when creating a habit
    //   - PATCH /api/habits/:id when updating
    // so this effect will eventually not be needed.
  }, [habits]);

  // ---------------------------------------------------------------------------
  // DIALOG OPEN/CLOSE
  // ---------------------------------------------------------------------------

  const openCreateDialog = () => {
    setErrors({});
    setNewName("");
    setNewTimesPerWeek("");
    setNewDifficulty(3);
    setNewDescription("");
    setIsCreateOpen(true);
  };

  const closeCreateDialog = () => {
    setIsCreateOpen(false);
  };

  // ---------------------------------------------------------------------------
  // CREATE HABIT
  // ---------------------------------------------------------------------------

  const handleCreateHabit = async () => {
    const newErrors = {};

    if (!newName.trim()) {
      newErrors.name = "Name is required";
    }

    const times = Number(newTimesPerWeek);
    if (!times || times <= 0) {
      newErrors.timesPerWeek = "Times per week must be a positive number";
    }

    if (newDifficulty < 1 || newDifficulty > 5) {
      newErrors.difficulty = "Difficulty must be between 1 and 5";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const habitPayload = {
      name: newName.trim(),
      timesPerWeek: times,
      difficulty: newDifficulty,
      description: newDescription.trim() || null,
      weeklyCount: 0,
    };

    // -----------------------------------------------------------------------
    // TODO: API – create habit in backend
    // -----------------------------------------------------------------------
    // Example:
    //   const res = await fetch("/api/habits", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(habitPayload),
    //   });
    //   const createdHabit = await res.json();
    //
    //   setHabits((prev) => [...prev, createdHabit]);
    //
    // TEMP: fake id in frontend only:
    const fakeId = Date.now();
    const createdHabit = { id: fakeId, ...habitPayload };

    setHabits((prev) => [...prev, createdHabit]);

    closeCreateDialog();
  };

  // ---------------------------------------------------------------------------
  // LOG HABIT COMPLETION (check circle)
  // ---------------------------------------------------------------------------

  const handleLogHabit = async (habitId) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== habitId) return habit;

        // If habit already reached its weekly goal, do nothing (closed for week).
        if (habit.weeklyCount >= habit.timesPerWeek) {
          return habit;
        }

        const updated = {
          ...habit,
          weeklyCount: habit.weeklyCount + 1,
        };

        // -------------------------------------------------------------------
        // TODO: API – log this completion in backend:
        //   POST /api/habits/:id/log
        // Backend should:
        //   - increment weekly count for this habit
        //   - add points (difficulty * 10) to:
        //       * daily points
        //       * total points
        //     so the Rewards page can read updated values.
        //
        // You might also GET the updated habit and totals back in the response.
        // -------------------------------------------------------------------

        return updated;
      })
    );
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "white", // page background white
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={3}>
        {/* LEFT: habits list (wider) */}
        <Grid item xs={12} md={9}>
          <Stack spacing={2}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              Habits
            </Typography>

            {habits.length === 0 ? (
              <Typography color="text.secondary">
                You don't have any habits yet. Click "Create Habit +" to get started.
              </Typography>
            ) : (
              habits.map((habit) => {
                const color = getDifficultyColor(habit.difficulty || 1);
                const isClosed = habit.weeklyCount >= habit.timesPerWeek;

                return (
                  <Card
                    key={habit.id}
                    sx={{
                      borderRadius: 2,
                      border: `2px solid ${color}`,
                      backgroundColor: "white", // card background white
                    }}
                  >
                    <CardContent>
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="flex-start"
                        justifyContent="space-between"
                      >
                        {/* LEFT: title + description + weekly info */}
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              mb: 0.5,
                              color: isClosed ? "text.disabled" : "text.primary",
                            }}
                          >
                            {habit.name}
                          </Typography>

                          {habit.description && (
                            <Typography
                              variant="body2"
                              color={isClosed ? "text.disabled" : "text.secondary"}
                              sx={{ mb: 0.5 }}
                            >
                              {habit.description}
                            </Typography>
                          )}

                          <Typography
                            variant="body2"
                            sx={{ mb: 0.3 }}
                            color={isClosed ? "text.disabled" : "text.primary"}
                          >
                            {habit.timesPerWeek} times per week
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{ mb: 0.3 }}
                            color={isClosed ? "text.disabled" : "text.primary"}
                          >
                            {habit.weeklyCount} / {habit.timesPerWeek} times this week
                          </Typography>

                          <Typography
                            variant="body2"
                            color={isClosed ? "text.disabled" : color}
                          >
                            Difficulty: {habit.difficulty}/5
                          </Typography>
                        </Box>

                        {/* RIGHT: check circle to log completion */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Tooltip
                            title={
                              isClosed
                                ? "Goal reached for this week"
                                : "Click when you complete this habit"
                            }
                          >
                            <span>
                              <IconButton
                                onClick={() => handleLogHabit(habit.id)}
                                disabled={isClosed}
                                sx={{
                                  // tint background a bit with the difficulty color
                                  bgcolor: alpha(color, 0.06),
                                  "&:hover": {
                                    bgcolor: alpha(color, 0.15),
                                  },
                                }}
                              >
                                {isClosed ? (
                                  <CheckCircleIcon sx={{ color }} />
                                ) : (
                                  <RadioButtonUncheckedIcon sx={{ color }} />
                                )}
                              </IconButton>
                            </span>
                          </Tooltip>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </Stack>
        </Grid>

        {/* RIGHT: create habit button (narrower column) */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: { xs: "stretch", md: "flex-start" },
            }}
          >
            <Button
              variant="contained"
              onClick={openCreateDialog}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Create Habit +
            </Button>

            {/* TODO: later add:
                - Motivational quote card
                - "Points until next milestone" bar */}
          </Box>
        </Grid>
      </Grid>

      {/* --------------------------------------------------------------------- */}
      {/* CREATE HABIT DIALOG                                                   */}
      {/* --------------------------------------------------------------------- */}
      <Dialog open={isCreateOpen} onClose={closeCreateDialog} fullWidth maxWidth="sm">
        <DialogTitle>Create Habit</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {/* Name (required) */}
          <TextField
            label="Habit name"
            fullWidth
            required
            margin="normal"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />

          {/* Times per week (required) */}
          <TextField
            label="Times per week"
            type="number"
            fullWidth
            required
            margin="normal"
            value={newTimesPerWeek}
            onChange={(e) => setNewTimesPerWeek(e.target.value)}
            error={!!errors.timesPerWeek}
            helperText={errors.timesPerWeek || "Example: 3 = three times per week"}
            inputProps={{ min: 1 }}
          />

          {/* Difficulty slider 1–5 */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Difficulty (1–5)
            </Typography>
            <Slider
              value={newDifficulty}
              min={1}
              max={5}
              step={1}
              marks
              valueLabelDisplay="auto"
              onChange={(_, val) => setNewDifficulty(val)}
            />
            {errors.difficulty && (
              <Typography variant="caption" color="error">
                {errors.difficulty}
              </Typography>
            )}
          </Box>

          {/* Description (optional) */}
          <TextField
            label="Description (optional)"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCreateDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateHabit}>
            Save habit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
