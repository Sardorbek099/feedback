import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";

import FacultyList from "./pages/FacultyList";
import DepartmentsPage from "./pages/Departments";
import FeedbackPage from "./pages/FeedbackPage";
import RatingsPage from "./pages/Ratings";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <UserContextProvider>
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          height: '100vh',
          display: "flex",
          flexDirection: "column",
          background: darkMode
            ? "radial-gradient(circle at top right, #0d0d0d, #1a1a1a)"
            : "radial-gradient(circle at top left, #c2880a, #ffb347)",
          position: "relative"
        }}
      >
        <Router>
          {/* Header */}
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />

          {/* Content */}
          <div
            style={{
              flex: 1,
              position: "relative",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Routes>
              <Route path="/" element={<FacultyList />} />
              <Route path="/departments/:fid" element={<DepartmentsPage />} />
              <Route path="/feedback/:fid/:did" element={<FeedbackPage />} />
              <Route path="/ratings" element={<RatingsPage />} />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />
        </Router>
      </div>
    </UserContextProvider>
  );
}
