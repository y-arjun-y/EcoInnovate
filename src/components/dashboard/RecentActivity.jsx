import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { format } from "date-fns";

const submissionTypeColors = {
  image: "bg-blue-100 text-blue-800",
  video: "bg-purple-100 text-purple-800",
  cad_model: "bg-green-100 text-green-800",
  document: "bg-gray-100 text-gray-800",
};

export default function RecentActivity({ submissions, loading }) {
  if (loading) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 border rounded-lg"
                >
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-48 mb-2" />
                    <Skeleton className="h-3 w-32" />
                  </div>
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
        <CardTitle className="text-xl flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {submissions.length === 0 ? (
          <div className="text-center py-8">
            <Upload className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No recent submissions</p>
            <p className="text-sm text-gray-400 mt-1">
              Start participating in challenges to see activity here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.slice(0, 5).map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50/50 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Upload className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {submission.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      className={
                        submissionTypeColors[submission.submission_type]
                      }
                    >
                      {submission.submission_type.replace("_", " ")}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {format(
                        new Date(submission.created_date),
                        "MMM d, HH:mm"
                      )}
                    </span>
                  </div>
                </div>
                {submission.total_score && (
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      {submission.total_score.toFixed(1)}
                    </p>
                    <p className="text-xs text-gray-400">score</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
