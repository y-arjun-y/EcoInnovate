import React, { useState, useEffect } from "react";
import {
  Challenge,
  DailyFact,
  UserAchievement,
  Submission,
} from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Trophy,
  Star,
  Calendar,
  Users,
  Lightbulb,
  ArrowRight,
  Flame,
  Award,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

import ActiveChallenges from "../components/dashboard/ActiveChallenges";
import DailyFactCard from "../components/dashboard/DailyFactCard";
import StatsOverview from "../components/dashboard/StatsOverview";
import RecentActivity from "../components/dashboard/RecentActivity";

export default function Dashboard() {
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [todaysFact, setTodaysFact] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load active challenges
      const challenges = await Challenge.filter(
        { status: "active" },
        "-created_date",
        3
      );
      setActiveChallenges(challenges);

      // Load today's fact
      const today = format(new Date(), "yyyy-MM-dd");
      const facts = await DailyFact.filter(
        { fact_date: today },
        "-created_date",
        1
      );
      if (facts.length > 0) {
        setTodaysFact(facts[0]);
      } else {
        // Fallback to latest fact if no fact for today
        const latestFacts = await DailyFact.list("-fact_date", 1);
        if (latestFacts.length > 0) {
          setTodaysFact(latestFacts[0]);
        }
      }

      // Load recent submissions
      const submissions = await Submission.list("-created_date", 5);
      setRecentSubmissions(submissions);

      // Initialize user achievements if not exists
      const achievements = await UserAchievement.list();
      if (achievements.length === 0) {
        const newAchievement = await UserAchievement.create({
          user_email: "user@example.com", // This would be dynamic in real app
          total_stars: 0,
          current_streak: 0,
          longest_streak: 0,
          challenges_completed: 0,
          submissions_count: 0,
          reviews_given: 0,
          badges: [],
          level: "seedling",
          last_activity_date: format(new Date(), "yyyy-MM-dd"),
        });
        setUserStats(newAchievement);
      } else {
        setUserStats(achievements[0]);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-slate-50 to-green-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to EcoDesign Hub
          </h1>
          <p className="text-lg text-gray-600">
            Shape the future of sustainability through innovative design
          </p>
        </motion.div>

        {/* Stats Overview */}
        <StatsOverview userStats={userStats} loading={loading} />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Challenges & Activity */}
          <div className="lg:col-span-2 space-y-8">
            <ActiveChallenges challenges={activeChallenges} loading={loading} />
            <RecentActivity submissions={recentSubmissions} loading={loading} />
          </div>

          {/* Right Column - Daily Fact & Quick Actions */}
          <div className="space-y-6">
            <DailyFactCard fact={todaysFact} loading={loading} />

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to={createPageUrl("Challenges")} className="block">
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700 transition-all duration-200">
                    <Trophy className="w-4 h-4 mr-2" />
                    Browse Challenges
                  </Button>
                </Link>
                <Link to={createPageUrl("MySubmissions")} className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-green-200 hover:bg-green-50"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    My Submissions
                  </Button>
                </Link>
                <Link to={createPageUrl("Leaderboard")} className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-green-200 hover:bg-green-50"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    View Leaderboard
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Motivation Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-teal-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Keep Building!</h3>
                    <p className="text-sm text-green-100">
                      Every design idea contributes to a more sustainable
                      future.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
