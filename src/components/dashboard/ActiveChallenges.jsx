import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Trophy, Calendar, Users, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { format, differenceInDays } from "date-fns";

const categoryColors = {
  water_conservation: "bg-blue-100 text-blue-800",
  energy_efficiency: "bg-yellow-100 text-yellow-800",
  waste_reduction: "bg-green-100 text-green-800",
  sustainable_transport: "bg-purple-100 text-purple-800",
  green_building: "bg-teal-100 text-teal-800",
  renewable_energy: "bg-orange-100 text-orange-800",
  circular_economy: "bg-pink-100 text-pink-800",
};

const difficultyColors = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-red-100 text-red-800",
};

export default function ActiveChallenges({ challenges, loading }) {
  if (loading) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Trophy className="w-6 h-6 text-green-600" />
            Active Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="p-4 border rounded-xl">
                  <div className="flex justify-between items-start mb-3">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <Trophy className="w-6 h-6 text-green-600" />
            Active Challenges
          </CardTitle>
          <Link to={createPageUrl("Challenges")}>
            <Button
              variant="ghost"
              size="sm"
              className="text-green-600 hover:text-green-700"
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {challenges.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No active challenges at the moment</p>
            <p className="text-sm text-gray-400 mt-1">
              Check back soon for new opportunities!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {challenges.map((challenge, index) => {
              const daysLeft = differenceInDays(
                new Date(challenge.end_date),
                new Date()
              );

              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all duration-200 hover:bg-gray-50/50"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {challenge.title}
                    </h3>
                    <div className="flex gap-2">
                      <Badge className={categoryColors[challenge.category]}>
                        {challenge.category.replace(/_/g, " ")}
                      </Badge>
                      <Badge className={difficultyColors[challenge.difficulty]}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {challenge.brief || challenge.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{daysLeft} days left</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>
                          {challenge.submission_count || 0} submissions
                        </span>
                      </div>
                    </div>
                    <Link to={createPageUrl(`Challenge?id=${challenge.id}`)}>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Join Challenge
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
