import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useAuthContext();

  const onLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

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
              <Button color="inherit" component={RouterLink} onClick={onLogout}>
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
