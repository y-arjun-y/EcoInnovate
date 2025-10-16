import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ExternalLink, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { format } from "date-fns";

const categoryColors = {
  history: "bg-amber-100 text-amber-800 border-amber-200",
  innovation: "bg-blue-100 text-blue-800 border-blue-200",
  future: "bg-purple-100 text-purple-800 border-purple-200",
  breakthrough: "bg-green-100 text-green-800 border-green-200",
  sustainability: "bg-teal-100 text-teal-800 border-teal-200",
  engineering: "bg-red-100 text-red-800 border-red-200",
};

export default function TodaysFeaturedFact({ fact, loading }) {
  if (loading) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-6 w-24" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    );
  }

  if (!fact) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 mb-8">
        <CardContent className="p-8 text-center">
          <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No featured fact today
          </h3>
          <p className="text-gray-600">
            Check back tomorrow for a new fascinating discovery!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <Card className="border-0 shadow-xl bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 hover:shadow-2xl transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-600" />
              Today's Featured Discovery
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(fact.fact_date), "MMMM d, yyyy")}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Badge
              className={`${categoryColors[fact.category]} border text-sm`}
            >
              {fact.category}
            </Badge>
            {fact.read_time && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{fact.read_time} min read</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {fact.title}
            </h3>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {fact.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {fact.source && (
            <div className="flex items-center gap-2 pt-4 border-t border-orange-200">
              <ExternalLink className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">
                Source: <span className="font-medium">{fact.source}</span>
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
