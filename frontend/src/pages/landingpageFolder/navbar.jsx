import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuthContext();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "var(--color-bg)",  // switched from surface
        borderBottom: "1px solid var(--color-border-subtle)",
        boxShadow: "var(--shadow-soft)",
        px: 4,
        height: 72,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Toolbar disableGutters sx={{ width: "100%", display: "flex" }}>
        {/* LEFT — TITLE */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            color: "var(--color-primary)",       // unchanged
            letterSpacing: "0.03em",
            fontSize: "1.25rem",
          }}
        >
          Game Of Life
        </Typography>

        {/* RIGHT — NAV BUTTONS */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {user ? (
            <>
              {[
                { label: "Home", to: "/" },
                { label: "Tasks", to: "/Tasks" },
                { label: "Habits", to: "/Habits" },
                { label: "Rewards", to: "/Rewards" },
              ].map((item) => (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  sx={{
                    padding: "6px 18px",
                    borderRadius: "var(--radius-pill)",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    textTransform: "none",
                    backgroundColor: "var(--color-primary-soft)",
                    color: "var(--color-primary)",
                    boxShadow: "0 2px 6px rgba(108, 76, 207, 0.15)",

                    "&:hover": {
                      backgroundColor: "var(--color-primary)",
                      color: "white",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              {/* GREETING (fixed) */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "6px 14px",
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "var(--color-primary-soft)",
                  color: "var(--color-primary-dark)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                }}
              >
                Hi {user.username} • {user.points} pts
              </Box>

              {/* LOGOUT */}
              <Button
                onClick={logout}
                sx={{
                  padding: "6px 18px",
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "var(--color-primary-soft)",
                  color: "var(--color-primary)",
                  fontFamily: "Poppins, sans-serif",
                  textTransform: "none",
                  fontWeight: 500,

                  "&:hover": {
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                  },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={RouterLink}
                to="/login"
                sx={{
                  padding: "6px 18px",
                  borderRadius: "var(--radius-pill)",
                  fontFamily: "Poppins",
                  textTransform: "none",
                  backgroundColor: "var(--color-primary-soft)",
                  color: "var(--color-primary)",
                  "&:hover": {
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                  },
                }}
              >
                Login
              </Button>

              <Button
                component={RouterLink}
                to="/signup"
                sx={{
                  padding: "6px 18px",
                  borderRadius: "var(--radius-pill)",
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                  fontFamily: "Poppins",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "var(--color-primary-dark)",
                  },
                }}
              >
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
