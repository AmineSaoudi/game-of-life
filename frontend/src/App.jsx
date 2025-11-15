import Navbar from './pages/landingpageFolder/navbar.jsx'
import { Toolbar } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/landingpageFolder/landingpage.jsx';
import TasksPage from "./pages/TasksPage/tasksPage.jsx"
import HabitsPage from "./pages/HabitsPage/habitsPage.jsx"

function App() {
  return (
    <>
    <Navbar/>
    <Toolbar/>
    <Routes>
        <Route path="/" element={<LandingPage />} />   {/* default / home */}
        <Route path="/Tasks" element={<TasksPage />} />
        <Route path="/Habits" element={<HabitsPage />} />
      </Routes>
      </>
  )
}

export default App;
