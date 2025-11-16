import React from 'react';
import { Box, Typography } from '@mui/material';

const MainTitle = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 330,
        right: 150,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '2.4rem', md: '3.6rem', lg: '4.2rem' },
          fontWeight: 900,
          lineHeight: 1.05,
          textAlign: { xs: 'left', md: 'right' },
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          background: 'linear-gradient(135deg, #ffffff, #ffe6c7)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 10px 30px rgba(0,0,0,0.25)',
        }}
      >
        GAME OF LIFE
        {/* change to your app name */}
      </Typography>
    </Box>
  );
};

export default MainTitle;