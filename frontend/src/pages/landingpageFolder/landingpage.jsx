import React from 'react';
import styles from "./landingpage.module.css"
import { Box, Typography } from '@mui/material';
import SingleTasksCard from "../RecurringTaskList/SingleTasksCard.jsx"
import HabitTasksCard from "../RecurringTaskList/HabitTasksCard.jsx"
import MotivationQuote from './MotivationQuote.jsx';




const LandingPage = () => {
  

  return (
    <Box className={styles.mainBox}>
      <SingleTasksCard currentUser={{ id: 1 }} />
      <HabitTasksCard currentUser={{ id: 1 }} />
      <MotivationQuote/>
    </Box>
  );
};

export default LandingPage;