import React from "react";
import { User } from "@/entities/all"; // Assume we can get current user
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Upload, MessageSquare, Flame } from "lucide-react";

const levelColors = {
  seedling: "bg-green-100 text-green-800",
  sprout: "bg-lime-100 text-lime-800",
  sapling: "bg-emerald-100 text-emerald-800",
  tree: "bg-teal-100 text-teal-800",
  forest_guardian: "bg-cyan-100 text-cyan-800",
};

// Mock current user for highlighting
const currentUserEmail = "user@example.com";

export default function LeaderboardTable({ data, loading, sortBy }) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b-0">
            <TableHead className="w-12">Rank</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Level</TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 text-amber-500" /> Stars
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Upload className="w-4 h-4 text-blue-500" /> Submissions
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center gap-1">
                <MessageSquare className="w-4 h-4 text-purple-500" /> Reviews
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-orange-500" /> Streak
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user, index) => (
            <TableRow
              key={user.id}
              className={`transition-colors duration-300 ${
                user.user_email === currentUserEmail ? "bg-green-50" : ""
              }`}
            >
              <TableCell className="font-bold text-lg text-gray-600">
                {index + 1}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                    <span className="text-white font-medium text-lg">
                      {user.user_email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 truncate max-w-xs">
                      {user.user_email.split("@")[0]}
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-xs">
                      {user.user_email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`${levelColors[user.level]}`}>
                  {user.level.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell
                className={`text-center font-semibold ${
                  sortBy === "total_stars" ? "text-amber-600" : "text-gray-700"
                }`}
              >
                {user.total_stars}
              </TableCell>
              <TableCell
                className={`text-center font-semibold ${
                  sortBy === "submissions_count"
                    ? "text-blue-600"
                    : "text-gray-700"
                }`}
              >
                {user.submissions_count}
              </TableCell>
              <TableCell
                className={`text-center font-semibold ${
                  sortBy === "reviews_given"
                    ? "text-purple-600"
                    : "text-gray-700"
                }`}
              >
                {user.reviews_given}
              </TableCell>
              <TableCell
                className={`text-center font-semibold ${
                  sortBy === "longest_streak"
                    ? "text-orange-600"
                    : "text-gray-700"
                }`}
              >
                {user.longest_streak}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
