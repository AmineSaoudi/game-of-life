import React from "react";
import { Box, Typography } from "@mui/material";

const MainTitle = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 330,
        right: 150,
        zIndex: 10,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: { xs: "2.2rem", md: "3.4rem", lg: "4rem" },
          fontWeight: 700,
          letterSpacing: "0.05em",
          lineHeight: 1.1,
          textAlign: { xs: "left", md: "right" },

          // Modern purple gradient title
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "var(--color-primary)",

          // Softer, more elegant shadow
          textShadow: "0 4px 12px rgba(108, 76, 207, 0.25)",
        }}
      >
        GAME OF LIFE
      </Typography>
    </Box>
  );
};

export default MainTitle;
