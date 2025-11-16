import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, setUser, logout } = useAuthContext();

  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* Left side: logo/title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Game Of Life
        </Typography>

        {/* Right side: nav buttons */}

        <Box sx={{ display: "flex", gap: 2 }}>
          {user ? (
            <>
              <Button color="inherit" component={RouterLink} to="/">
                Home
              </Button>
              <Button color="inherit" component={RouterLink} to="/Tasks">
                Tasks
              </Button>
              <Button color="inherit" component={RouterLink} to="/Habits">
                Habits
              </Button>
              <Button color="inherit" component={RouterLink} to="/Rewards">
                Rewards
              </Button>

              {/* 👇 Greeting + Points */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1">
                  Hi <strong>{user.username}</strong> — {user.points} pts
                </Typography>
              </Box>

              <Button color="inherit" component={RouterLink} onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/signup">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
