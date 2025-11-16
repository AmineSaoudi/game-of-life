import React from 'react';
import styles from "./landingpage.module.css"
import { Box, Typography } from '@mui/material';
import SingleTasksCard from '../RecurringTaskList/SingleTasksCard.jsx';
import HabitTasksCard from "../RecurringTaskList/HabitTasksCard.jsx"
import MotivationQuote from './MotivationQuote.jsx';
import ProgressCard from './ProgressCard.jsx';
import MainTitle from './MainTitle.jsx';





const LandingPage = () => {
  

  return (
    <Box className={styles.mainBox}>
      <SingleTasksCard currentUser={{ id: 1 }} />
      <HabitTasksCard currentUser={{ id: 1 }} />
      <MotivationQuote/>
      <Box
        sx={{
          position: 'fixed',
          top: 65,            // distance from top (px)
          right: 16,          // distance from right (px)
          zIndex: (theme) => theme.zIndex.drawer + 1, // stay above content
        }}
      >
        <ProgressCard/>
        <MainTitle/>
      </Box>
    </Box>
  );
};

export default LandingPage;