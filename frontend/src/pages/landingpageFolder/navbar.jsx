import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* Left side: logo/title */}
        <Typography variant="h6"  sx={{ flexGrow: 1 }}>
          Game Of Life
        </Typography>

        {/* Right side: nav buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Rewards</Button>
          <Button color="inherit">Game</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;