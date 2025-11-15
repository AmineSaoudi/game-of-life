import Navbar from "./pages/landingpageFolder/navbar.jsx";
import { Toolbar } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/landingpageFolder/landingpage.jsx";
import TasksPage from "./pages/TasksPage/tasksPage.jsx";
import HabitsPage from "./pages/HabitsPage/habitsPage.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import AuthRoute from "./routes/AuthRoute.jsx";
import GuestRoute from "./routes/GuestRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Newlogin from "./pages/LoginPage/Newloginpage.jsx"

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Toolbar />
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/" element={<LandingPage />} /> {/* default / home */}
          <Route path="/Tasks" element={<TasksPage />} />
          <Route path="/Habits" element={<HabitsPage />} />
        </Route>

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Newlogin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
export default App;
