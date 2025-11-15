import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';

const QUOTES = [
  { text: 'Small steps every day lead to big change.', author: 'Unknown' },
  { text: 'You don’t have to be perfect, just consistent.', author: 'Unknown' },
  { text: 'Action is the antidote to fear.', author: 'Unknown' },
  { text: 'Discipline is remembering what you want.', author: 'David Campbell' },
  { text: 'Success is the sum of small efforts repeated day in and day out.', author: 'Robert Collier' },
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
        position: 'fixed',
        bottom: 0,
        right: 0,
        width: '50vw',
        height: '50vh',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        boxSizing: 'border-box',
        pointerEvents: 'none', // so it doesn't block clicks
      }}
    >
      <Box sx={{ pointerEvents: 'auto', maxWidth: 420 }}>
        <Typography
          variant="h4"
          sx={{
            fontStyle: 'italic',
            mb: 2,
            color: '#2d0f0a',          // dark warm text
            textShadow: '0 2px 8px rgba(0,0,0,0.18)', // subtle depth
          }}
        >
          “{quote.text}”
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: '#2d0f0a' }}
        >
          — {quote.author}
        </Typography>
      </Box>
    </Box>
  );
};

export default MotivationQuote;
