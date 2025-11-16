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
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "50vw",
        height: "50vh",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        boxSizing: "border-box",
        pointerEvents: "none", // does not block clicks
      }}
    >
      <Box sx={{ pointerEvents: "auto", maxWidth: "100%" }}>
        {/* QUOTE TEXT */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Inter, sans-serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: { xs: "1.2rem", md: "1.6rem", lg: "1.9rem" },
            color: "var(--color-text-main)",
            opacity: 0.9,

            // subtle shadow to give it depth like the title
            textShadow: "0 4px 12px rgba(108, 76, 207, 0.15)",
            mb: 1.5,
          }}
        >
          “{quote.text}”
        </Typography>

        {/* AUTHOR */}
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: { xs: "0.9rem", md: "1.1rem" },
            color: "var(--color-primary-dark)",
            opacity: 0.85,
          }}
        >
          — {quote.author}
        </Typography>
      </Box>
    </Box>
  );
};

export default MotivationQuote;
