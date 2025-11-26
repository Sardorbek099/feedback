import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";

import FacultyList from "./pages/FacultyList";
import DepartmentsPage from "./pages/Departments";
import FeedbackPage from "./pages/FeedbackPage";
import LoginModal from "./components/LoginModal";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  return (
    <UserContextProvider>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<FacultyList />} />
          <Route path="/departments/:fid" element={<DepartmentsPage />} />
          <Route path="/feedback/:fid/:did" element={<FeedbackPage />} />
        </Routes>

        <Footer />
      </Router>
    </UserContextProvider>
  );
}
