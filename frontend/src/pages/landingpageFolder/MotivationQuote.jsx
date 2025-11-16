import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";

const QUOTES = [
  { text: "Small steps every day lead to big change.", author: "Unknown" },
  { text: "You don’t have to be perfect, just consistent.", author: "Unknown" },
  { text: "Action is the antidote to fear.", author: "Unknown" },
  { text: "Discipline is remembering what you want.", author: "David Campbell" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
];

function getQuoteOfTheDay() {
  const today = new Date();
  const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  return QUOTES[daysSinceEpoch % QUOTES.length];
}

const MotivationQuote = () => {
  const quote = useMemo(() => getQuoteOfTheDay(), []);

  return (
    <Box
      sx={{
        position: "relative",
        bottom: 250,
        right: 200,
        left: 520,

        /* Matching MainTitle box visual style */
        padding: "20px 30px",
        borderRadius: "20px",
        background: "rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(6px)",
        border: "3px solid rgba(255, 255, 255, 0.45)",
        boxShadow: "0px 6px 18px rgba(77, 27, 91, 0.25)",

        /* same skew for retro vibe */
        transform: "skewX(-2deg)",

        width: "fit-content",
        maxWidth: "400px",

        display: "flex",
        flexDirection: "column",
        gap: "6px",
        pointerEvents: "none",
      }}
    >
      {/* QUOTE TEXT */}
      <Typography
        variant="h5"
        sx={{
          fontFamily: "'Nunito', sans-serif",
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: { xs: "1.1rem", md: "1.25rem", lg: "1.35rem" },
          color: "#3b214f",
          opacity: 0.9,
          textAlign: "center",
          textShadow: "0 4px 12px rgba(108, 76, 207, 0.2)",
        }}
      >
        “{quote.text}”
      </Typography>

      {/* AUTHOR */}
      <Typography
        variant="subtitle2"
        sx={{
          fontFamily: "'Press Start 2P', cursive",
          fontSize: { xs: "0.6rem", md: "0.7rem" },
          color: "#7A2E8E",
          opacity: 0.85,
          textAlign: "center",
          letterSpacing: "1px",
        }}
      >
        — {quote.author}
      </Typography>
    </Box>
  );
};

export default MotivationQuote;
