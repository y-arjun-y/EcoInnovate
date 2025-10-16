import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Lightbulb, Clock, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const categoryColors = {
  history: "bg-amber-100 text-amber-800",
  innovation: "bg-blue-100 text-blue-800",
  future: "bg-purple-100 text-purple-800",
  breakthrough: "bg-green-100 text-green-800",
  sustainability: "bg-teal-100 text-teal-800",
  engineering: "bg-red-100 text-red-800",
};

export default function DailyFactCard({ fact, loading }) {
  if (loading) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Daily Discovery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!fact) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Daily Discovery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No fact available today</p>
            <p className="text-sm text-gray-400 mt-1">Check back tomorrow!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              Daily Discovery
            </CardTitle>
            <Link to={createPageUrl("DailyFacts")}>
              <Button
                variant="ghost"
                size="sm"
                className="text-yellow-700 hover:text-yellow-800"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge className={categoryColors[fact.category]}>
                {fact.category}
              </Badge>
              {fact.read_time && (
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{fact.read_time} min read</span>
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">{fact.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-4">
                {fact.content}
              </p>
            </div>

            {fact.source && (
              <p className="text-xs text-gray-400">Source: {fact.source}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
