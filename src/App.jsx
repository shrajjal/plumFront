import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Quiz from "./components/Quiz";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Quiz Page with category param */}
        <Route path="/quiz/:topic" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
