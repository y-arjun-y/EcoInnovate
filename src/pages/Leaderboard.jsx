import React, { useState, useEffect } from "react";
import { UserAchievement } from "@/entities/all";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

import FeaturedInnovators from "../components/leaderboard/FeaturedInnovators";
import LeaderboardTable from "../components/leaderboard/LeaderboardTable";

const sortOptions = {
  total_stars: "Top Innovators (Stars)",
  submissions_count: "Top Contributors (Submissions)",
  reviews_given: "Master Reviewers (Reviews)",
  longest_streak: "Most Consistent (Streak)",
};

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortBy, setSortBy] = useState("total_stars");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboardData();
  }, []);

  useEffect(() => {
    sortLeaderboard();
  }, [leaderboardData, sortBy]);

  const loadLeaderboardData = async () => {
    setLoading(true);
    try {
      const data = await UserAchievement.list();
      setLeaderboardData(data);
    } catch (error) {
      console.error("Error loading leaderboard data:", error);
    }
    setLoading(false);
  };

  const sortLeaderboard = () => {
    const sorted = [...leaderboardData].sort(
      (a, b) => (b[sortBy] || 0) - (a[sortBy] || 0)
    );
    setSortedData(sorted);
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-green-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hall of Innovators
          </h1>
          <p className="text-lg text-gray-600">
            Celebrating the top contributors in our sustainability community
          </p>
        </motion.div>

        {/* Top 3 Innovators */}
        <FeaturedInnovators
          topInnovators={leaderboardData
            .sort((a, b) => b.total_stars - a.total_stars)
            .slice(0, 3)}
          loading={loading}
        />

        {/* Leaderboard Table */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Award className="w-6 h-6 text-green-600" />
                Community Rankings
              </h2>
              <div className="w-64">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(sortOptions).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <LeaderboardTable
              data={sortedData}
              loading={loading}
              sortBy={sortBy}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
