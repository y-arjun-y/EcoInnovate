import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const podiumColors = [
  { bg: "bg-amber-400", text: "text-amber-900", shadow: "shadow-amber-500/50" }, // 1st
  { bg: "bg-slate-400", text: "text-slate-900", shadow: "shadow-slate-500/50" }, // 2nd
  {
    bg: "bg-amber-600",
    text: "text-amber-900",
    shadow: "shadow-yellow-700/50",
  }, // 3rd
];

const rankOrder = [1, 0, 2]; // 2nd, 1st, 3rd

export default function FeaturedInnovators({ topInnovators, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
                <Skeleton className="h-6 w-32 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </CardContent>
            </Card>
          ))}
      </div>
    );
  }

  const podiumInnovators = rankOrder
    .map((i) => topInnovators[i])
    .filter(Boolean);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 items-end">
      {podiumInnovators.map((innovator, index) => {
        const rank = rankOrder[index];
        const isFirst = rank === 0;

        return (
          <motion.div
            key={innovator.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * rank, type: "spring", stiffness: 100 }}
            className={`relative ${isFirst ? "md:scale-110" : ""}`}
          >
            <Card
              className={`border-0 shadow-xl ${podiumColors[rank].shadow} bg-gradient-to-br from-white/80 to-slate-50`}
            >
              <CardContent className="p-6 text-center relative">
                <div
                  className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-white/50 ${
                    isFirst ? "w-16 h-16" : "w-12 h-12"
                  }`}
                >
                  <div
                    className={`w-full h-full rounded-full flex items-center justify-center ${podiumColors[rank].bg}`}
                  >
                    <Crown className={`w-6 h-6 ${podiumColors[rank].text}`} />
                  </div>
                </div>

                <div className="w-24 h-24 rounded-full mx-auto my-8 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold text-3xl">
                    {innovator.user_email.charAt(0).toUpperCase()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 truncate">
                  {innovator.user_email.split("@")[0]}
                </h3>
                <p className="text-sm text-green-600 font-medium capitalize mb-4">
                  {innovator.level.replace("_", " ")}
                </p>

                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${podiumColors[rank].bg} bg-opacity-20`}
                >
                  <Star className={`w-5 h-5 ${podiumColors[rank].text}`} />
                  <span
                    className={`font-bold text-lg ${podiumColors[rank].text}`}
                  >
                    {innovator.total_stars}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
