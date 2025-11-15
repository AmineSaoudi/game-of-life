import React from 'react';
import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';


//Business logic


const landingpage = () => {
    return(
        <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Typography variant="h3" component="h1">
        Welcome to My Landing Page
      </Typography>

      <Typography variant="body1">
        Start building your MUI layout here.
      </Typography>

      <Button variant="contained">
        Get Started
      </Button>
    </Box>
    ); 
};


export default landingpage;