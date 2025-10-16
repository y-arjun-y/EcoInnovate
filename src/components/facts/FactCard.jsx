import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ExternalLink } from "lucide-react";
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

export default function FactCard({ fact, index }) {
  const [expanded, setExpanded] = React.useState(false);

  const shouldTruncate = fact.content.length > 200;
  const displayContent =
    expanded || !shouldTruncate
      ? fact.content
      : fact.content.substring(0, 200) + "...";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between mb-3">
            <Badge
              className={`${categoryColors[fact.category]} border text-xs`}
            >
              {fact.category}
            </Badge>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{format(new Date(fact.fact_date), "MMM d")}</span>
            </div>
          </div>

          <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2">
            {fact.title}
          </CardTitle>

          {fact.read_time && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{fact.read_time} min read</span>
            </div>
          )}
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1">
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {displayContent}
            </p>

            {shouldTruncate && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>

          {fact.source && (
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100 mt-4">
              <ExternalLink className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-500 truncate">
                {fact.source}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
