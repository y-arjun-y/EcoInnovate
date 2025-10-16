import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, TrendingUp, FileText, Award } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const statCards = [
  {
    icon: FileText,
    label: "Total Submissions",
    key: "total",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: TrendingUp,
    label: "Average Score",
    key: "averageScore",
    suffix: "/10",
    color: "text-green-600",
    bgColor: "bg-green-100",
    format: (value) => value.toFixed(1),
  },
  {
    icon: Star,
    label: "Stars Earned",
    key: "totalStars",
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    icon: Award,
    label: "Completed",
    key: "reviewed",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

export default function SubmissionStats({ stats, loading }) {
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
        let value = stats[stat.key] || 0;

        if (stat.format) {
          value = stat.format(value);
        }

        return (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4`}
                >
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
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
