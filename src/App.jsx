import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Challenges from "./pages/Challenges";
import MySubmissions from "./pages/MySubmissions";
import People from "./pages/People";
import Leaderboard from "./pages/Leaderboard";
import DailyFacts from "./pages/DailyFacts";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/my-submissions" element={<MySubmissions />} />
        <Route path="/people" element={<People />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/daily-facts" element={<DailyFacts />} />
      </Routes>
    </Layout>
  );
}

export default App;
