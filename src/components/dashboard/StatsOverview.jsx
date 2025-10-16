import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Flame, Trophy, Award } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const statCards = [
  {
    icon: Star,
    label: "Total Stars",
    key: "total_stars",
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    icon: Flame,
    label: "Current Streak",
    key: "current_streak",
    suffix: " days",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    icon: Trophy,
    label: "Challenges Completed",
    key: "challenges_completed",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: Award,
    label: "Submissions",
    key: "submissions_count",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
];

export default function StatsOverview({ userStats, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <Skeleton className="h-12 w-12 rounded-xl mb-4" />
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => {
        const IconComponent = stat.icon;
        const value = userStats?.[stat.key] || 0;

        return (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}
                  >
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  {userStats?.level && index === 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {userStats.level.replace("_", " ")}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {value}
                  {stat.suffix || ""}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
