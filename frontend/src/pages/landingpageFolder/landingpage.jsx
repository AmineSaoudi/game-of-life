import React from 'react';
import styles from "./landingpage.module.css";
import { Box } from '@mui/material';
import SingleTasksCard from '../RecurringTaskList/SingleTasksCard.jsx';
import HabitTasksCard from "../RecurringTaskList/HabitTasksCard.jsx";
import MotivationQuote from './MotivationQuote.jsx';
import ProgressCard from './ProgressCard.jsx';
import MainTitle from './MainTitle.jsx';

const LandingPage = () => {
  return (
    <Box className={styles.pageWrapper}>
      <Box className={styles.mainContent}>
        {/* Left column: tasks & habits */}
        <Box className={styles.leftColumn}>
          <SingleTasksCard currentUser={{ id: 1 }} />
          <HabitTasksCard currentUser={{ id: 1 }} />
        </Box>

        {/* Right column: progress + title */}
        <Box className={styles.rightColumn}>
          <ProgressCard />
          <MainTitle />
        </Box>
      </Box>

      {/* Bottom center: quote */}
      <Box className={styles.quoteWrapper}>
        <MotivationQuote />
      </Box>
    </Box>
  );
};

export default LandingPage;
