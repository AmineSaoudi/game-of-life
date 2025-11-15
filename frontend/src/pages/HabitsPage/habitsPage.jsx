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
} from "@mui/material";

// This component is intentionally self-contained for now.
// Later we can move API logic into a separate "habitsService" file if you want.

export default function HabitsPage() {
  // ---------------------------------------------------------------------------
  // STATE
  // ---------------------------------------------------------------------------

  // All habits for the current user.
  // Shape of each habit:
  // {
  //   id: string | number,
  //   name: string,
  //   timesPerWeek: number,
  //   difficulty: number (0-5),
  //   description?: string,
  //   weeklyCount: number (how many times done THIS week),
  // }
  const [habits, setHabits] = useState([]);

  // Dialog open/close state
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Form fields for the "Create Habit" dialog
  const [newName, setNewName] = useState("");
  const [newTimesPerWeek, setNewTimesPerWeek] = useState("");
  const [newDifficulty, setNewDifficulty] = useState(3); // default mid difficulty
  const [newDescription, setNewDescription] = useState("");

  // Simple validation error display
  const [errors, setErrors] = useState({});

  // ---------------------------------------------------------------------------
  // INITIAL LOAD: fetch habits from backend (later) or local storage (for now).
  // ---------------------------------------------------------------------------
  useEffect(() => {
    // TODO: API – replace this whole block with a real API call, e.g.:
    //   const res = await fetch("/api/habits/me");
    //   const data = await res.json();
    //   setHabits(data);
    //
    // For now, we can try to load from localStorage so the page feels persistent.

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
  // SAVE HABITS LOCALLY whenever they change (temporary persistence)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const stateToSave = { habits };
    localStorage.setItem("habitsState", JSON.stringify(stateToSave));

    // TODO: API – in the real app, instead of (or in addition to) localStorage:
    //   await fetch("/api/habits/bulk-update", { method: "PUT", body: JSON.stringify(habits) })
    // Or more realistically, you will:
    //   - POST when creating a habit
    //   - PATCH when updating a habit
    // so you won't need this effect at all.
  }, [habits]);

  // ---------------------------------------------------------------------------
  // HANDLERS: open/close dialog
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
  // HANDLER: submit new habit
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

    if (newDifficulty < 0 || newDifficulty > 5) {
      newErrors.difficulty = "Difficulty must be between 0 and 5";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Construct the habit object that matches what the backend expects.
    const habitPayload = {
      name: newName.trim(),
      timesPerWeek: times,
      difficulty: newDifficulty,
      description: newDescription.trim() || null,
      weeklyCount: 0, // starts at 0 for the current week
      // Later you might also include userId, createdAt, etc.
    };

    // -----------------------------------------------------------------------
    // TODO: API – Create habit on backend
    // -----------------------------------------------------------------------
    // Example with fetch:
    //
    //   const res = await fetch("/api/habits", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(habitPayload),
    //   });
    //
    //   if (!res.ok) {
    //     // Handle error (show snackbar, error text, etc.)
    //     return;
    //   }
    //
    //   // The backend should respond with the created habit (with its id).
    //   const createdHabit = await res.json();
    //
    //   setHabits((prev) => [...prev, createdHabit]);
    //
    // For now, since we don't have a real backend hooked up,
    // we will just fake an id and update local state:

    const fakeId = Date.now(); // DO NOT use this in production, backend should give real id
    const createdHabit = { id: fakeId, ...habitPayload };

    setHabits((prev) => [...prev, createdHabit]);

    // Close dialog after success
    closeCreateDialog();
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* LEFT SIDE: habit list */}
        <Grid item xs={12} md={8}>
          <Stack spacing={2}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Habits
            </Typography>

            {/* List of habit cards */}
            {habits.length === 0 ? (
              <Typography color="text.secondary">
                You don't have any habits yet. Click "Create Habit +" to get started.
              </Typography>
            ) : (
              habits.map((habit) => (
                <Card
                  key={habit.id}
                  sx={{
                    borderRadius: 2,
                    border: "2px solid #0097a7", // teal-ish, like your sketch
                  }}
                >
                  <CardContent>
                    {/* Habit title */}
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {habit.name}
                    </Typography>

                    {/* Description, if provided */}
                    {habit.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                      >
                        {habit.description}
                      </Typography>
                    )}

                    {/* Times per week + placeholder for weekly counter */}
                    <Typography variant="body2">
                      {habit.timesPerWeek} times per week
                    </Typography>

                    {/* TODO: When we add the check-circle, we'll also show:
                        - "X times this week"
                        - Maybe a mini progress bar for this habit.
                        - And logic to reset weeklyCount every week. */}
                  </CardContent>
                </Card>
              ))
            )}
          </Stack>
        </Grid>

        {/* RIGHT SIDE: Create Habit button (for now; later we can add quotes, etc.) */}
        <Grid item xs={12} md={4}>
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

            {/* TODO: In the future, add:
                - Motivational quote card
                - "Points until next milestone" bar at the bottom of the page */}
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

          {/* Difficulty slider 0–5 */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Difficulty (0–5)
            </Typography>
            <Slider
              value={newDifficulty}
              min={0}
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