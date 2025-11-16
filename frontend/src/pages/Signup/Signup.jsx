import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_ORIGIN}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username.toLowerCase(), password }),
          credentials: "include",
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Incorrect Username or Password");
        } else {
          throw new Error("Something went wrong");
        }
      }

      const authResponse = await res.json();
      console.log(authResponse);
      localStorage.setItem("token", authResponse.token);
      console.log(authResponse.user);
      setUser(authResponse.user);

      const from = location?.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fbfbfd 0%, #e1cffc 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 420,
          width: "100%",
          p: 4,
          borderRadius: "24px",
          backgroundColor: "#f4e6ff",
          border: "3px solid #9049a4",
          boxShadow: "0px 8px 20px rgba(77, 27, 91, 0.25)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* GAME TITLE */}
        <Typography
          component="h1"
          sx={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "1.4rem",
            textAlign: "center",
            color: "#7A2E8E",
            textShadow: "0px 3px 0px #4d1b5b",
            letterSpacing: "2px",
            mb: 1,
          }}
        >
          GAME OF LIFE
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "center",
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontWeight: 600,
            color: "#3b214f",
            mb: 1,
          }}
        >
          Create your player and start your streak 🌟
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            label="Username"
            fullWidth
            required
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#ffffff",
              },
            }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#ffffff",
              },
            }}
          />

          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{
                mt: 1,
                mb: 1,
                textAlign: "center",
                fontFamily: "'Nunito', system-ui, sans-serif",
              }}
            >
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
              py: 1.2,
              fontFamily: "'Press Start 2P', cursive",
              fontSize: "0.75rem",
              textTransform: "none",
              backgroundColor: "#7A2E8E",
              border: "3px solid #C38BFF",
              boxShadow: "0px 4px 0px #4D1B5B",
              "&:hover": {
                backgroundColor: "#8E3DA3",
                transform: "translateY(-2px)",
                boxShadow: "0px 6px 0px #4D1B5B",
              },
              "&:active": {
                transform: "translateY(1px)",
                boxShadow: "0px 2px 0px #4D1B5B",
              },
            }}
          >
            {loading ? "Signing up..." : "Sign Up!"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
