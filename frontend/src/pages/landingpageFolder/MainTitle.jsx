import React from "react";
import { Box, Typography } from "@mui/material";

const MainTitle = () => {
  return (
    <Box
      sx={{
        background: "#F4E6FF",
        border: "3px solid #9049A4",
        borderRadius: "20px",
        padding: "20px 28px",
        boxShadow: "0px 6px 15px rgba(77, 27, 91, 0.25)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: { xs: "1.4rem", md: "1.9rem", lg: "2.2rem" },
          fontWeight: 400,
          letterSpacing: "0.07em",
          lineHeight: 1.3,
          textAlign: "center",

          color: "#7A2E8E",
          textShadow: "0px 3px 0px #4D1B5B",

          padding: "8px 0",
        }}
      >
        GAME OF LIFE
      </Typography>
    </Box>
  );
};

export default MainTitle;
