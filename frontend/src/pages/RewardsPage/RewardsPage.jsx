import React, { useEffect, useState } from "react";
import { rewardApiCalls } from "../../utils/Api";

import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Stack,
  Divider,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

//import { rewardApiCalls } from "../../utils/Api";
import { useAuthContext } from "../../context/AuthContext";  // 👈 NEW
const initialRewardState = { name: "", description: "", price: 100 };

export default function RewardsMarket() {
  const { user, setUser } = useAuthContext();            // 👈 from context

  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingReward, setEditingReward] = useState(null);
  const [rewardForm, setRewardForm] = useState(initialRewardState);

  // keep local points in sync when user changes (e.g. after login)
  // useEffect(() => {
  //   setPoints(user?.points ?? 0);
  // }, [user]);

  // only load rewards from backend
  useEffect(() => {
    const loadRewards = async () => {
      try {
        setLoading(true);
        setError("");
        const rewardsRes = await rewardApiCalls.getRewards();
        setRewards(rewardsRes || []);
      } catch (e) {
        console.error("Failed to load rewards:", e);
        setError(e.message || "Failed to load rewards");
      } finally {
        setLoading(false);
      }
    };

    loadRewards();
  }, []);


  const reloadRewards = async () => {
    try {
      const rewardsRes = await rewardApiCalls.getRewards();
      setRewards(rewardsRes || []);
    } catch (e) {
      console.error("Failed to reload rewards:", e);
    }
  };

  const handleBuy = async (reward) => {
    if (!reward || reward.price > user.points) return;

    try {
      const updateduser = await rewardApiCalls.buyReward(reward.id);
      setUser(updateduser)
      

      // 👇 update user in context so navbar shows new points
      

      await reloadRewards();
    } catch (e) {
      console.error("Failed to buy reward:", e);
      setError(e.message || "Failed to buy reward");
    }
  };

  // ---- add / edit dialog ----
  const openCreateDialog = () => {
    setEditingReward(null);
    setRewardForm(initialRewardState);
    setDialogOpen(true);
  };

  const openEditDialog = (reward) => {
    setEditingReward(reward);
    setRewardForm({
      title: reward.name || "",
      description: reward.description || "",
      price: reward.price ?? 100,
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingReward(null);
    setRewardForm(initialRewardState);
  };

  const handleSaveReward = async () => {
    if (!rewardForm.name.trim()) return;

    const payload = {
      title: rewardForm.name.trim(),
      description: rewardForm.description.trim(),
      price: Number(rewardForm.price) || 0,
    };

    try {
      if (editingReward) {
        await rewardApiCalls.updateReward(editingReward.id, payload);
      } else {
        await rewardApiCalls.createReward(payload);
      }
      await reloadRewards();
      closeDialog();
    } catch (e) {
      console.error("Failed to save reward:", e);
      setError(e.message || "Failed to save reward");
    }
  };

  // ---- delete reward ----
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this reward?")) return;
    try {
      await rewardApiCalls.deleteReward(id);
      await reloadRewards();
    } catch (e) {
      console.error("Failed to delete reward:", e);
      setError(e.message || "Failed to delete reward");
    }
  };

  const handleChangeField = (field) => (e) => {
    const value = field === "cost" ? Number(e.target.value) : e.target.value;
    setRewardForm((prev) => ({ ...prev, [field]: value }));
  };

  // ---- UI (same style vibe as TasksPage) ----
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        boxSizing: "border-box",
        overflowX: "hidden",
        background: "linear-gradient(180deg, #fbfbfdff 0%, #e1cffcff 100%)",
        p: 3,
      }}
    >
      {/* Title & points */}
      <Box
        sx={{
          bgcolor: "#DAC1FF",
          color: "#7A2E8E",
          borderRadius: 1,
          boxShadow: "0px 4px 15px rgba(0,0,0,0.25)",
          border: "3px solid #9049A4",
          fontFamily: "'Press Start 2P', cursive",
          mb: 3,
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography fontSize="28px" sx={{ fontFamily: "'Press Start 2P', cursive" }}>
          Rewards Market
        </Typography>
        <Typography mt={2} fontSize="18px" sx={{ fontFamily: "'Press Start 2P', cursive" }}>
          Your Points:{" "}
          <span style={{ color: "#3b7b3f" }}>
            {loading ? "..." : user.points}
          </span>
        </Typography>
      </Box>

      {error && (
        <Typography color="error" textAlign="center" mb={2}>
          {error}
        </Typography>
      )}

      <Box sx={{ display: "flex", gap: 4, px: 2 }}>
        {/* Rewards list */}
        <Box sx={{ width: "55%" }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Available Rewards
          </Typography>

          {loading && (
            <Typography variant="body2" color="text.secondary">
              Loading rewards...
            </Typography>
          )}

          {!loading && rewards.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              No rewards yet. Add one on the right!
            </Typography>
          )}

          <Stack spacing={2}>
            {rewards.map((reward) => (
              <Box
                key={reward.id}
                sx={{
                  bgcolor: "#FFFFFF",
                  borderRadius: 2,
                  border: "1px solid #E0C4FF",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.10)",
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {reward.name}
                    </Typography>
                    {reward.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {reward.description}
                      </Typography>
                    )}
                    <Typography
                      variant="body2"
                      sx={{ mt: 1, fontWeight: "bold", color: "#7A2E8E" }}
                    >
                      Cost: {reward.price} pts
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Tooltip
                      title={user.points < reward.price ? "Not enough points" : "Buy reward"}
                    >
                      <span>
                        <Button
                          variant="contained"
                          startIcon={<ShoppingCartIcon />}
                          disabled={user.points < reward.price}
                          onClick={() => handleBuy(reward)}
                          sx={{
                            textTransform: "none",
                            background: "#7A2E8E",
                            "&:hover": { background: "#8E3DA3" },
                          }}
                        >
                          Buy
                        </Button>
                      </span>
                    </Tooltip>


                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDelete(reward.id)}
                        size="small"
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Manage panel */}
        <Box
          sx={{
            width: "45%",
            minHeight: "300px",
            bgcolor: "#F4E6FF",
            borderRadius: 3,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            border: "2px solid #A66CC7",
            p: 3,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Manage Rewards
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Create new rewards you can buy with your points, or edit/delete
            existing ones from the list on the left.
          </Typography>

          <Button
            onClick={openCreateDialog}
            sx={{
              background: "#7A2E8E",
              color: "#F7D8FF",
              fontFamily: "'Press Start 2P', cursive",
              fontSize: "14px",
              px: 4,
              py: 2,
              border: "3px solid #C38BFF",
              boxShadow: "0px 4px 0px #4D1B5B",
              textTransform: "none",
              transition: "0.2s",
              "&:hover": {
                background: "#8E3DA3",
                transform: "translateY(-2px)",
                boxShadow: "0px 6px 0px #4D1B5B",
              },
              "&:active": {
                transform: "translateY(1px)",
                boxShadow: "0px 2px 0px #4D1B5B",
              },
            }}
          >
            + Add Reward
          </Button>
        </Box>
      </Box>

      {/* Add/Edit dialog */}
      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editingReward ? "Edit Reward" : "Add New Reward"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Reward Name"
            fullWidth
            value={rewardForm.name}
            onChange={handleChangeField("name")}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            minRows={2}
            value={rewardForm.description}
            onChange={handleChangeField("description")}
          />
          <TextField
            margin="dense"
            label="Cost (points)"
            type="number"
            fullWidth
            value={rewardForm.price}
            onChange={handleChangeField("cost")}
            inputProps={{ min: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveReward}>
            {editingReward ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
