import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Edit,
  Eye,
  Star,
  Calendar,
  FileText,
  Video,
  Image,
  File,
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  submitted: "bg-blue-100 text-blue-800",
  under_review: "bg-yellow-100 text-yellow-800",
  reviewed: "bg-green-100 text-green-800",
};

const submissionTypeIcons = {
  image: Image,
  video: Video,
  cad_model: File,
  document: FileText,
};

const submissionTypeColors = {
  image: "bg-blue-100 text-blue-800",
  video: "bg-purple-100 text-purple-800",
  cad_model: "bg-green-100 text-green-800",
  document: "bg-gray-100 text-gray-800",
};

export default function SubmissionCard({
  submission,
  challenge,
  index,
  onUpdate,
}) {
  const TypeIcon = submissionTypeIcons[submission.submission_type] || FileText;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2">
              {submission.title}
            </CardTitle>
            <Badge className={statusColors[submission.status]}>
              {submission.status.replace("_", " ")}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Badge className={submissionTypeColors[submission.submission_type]}>
              <TypeIcon className="w-3 h-3 mr-1" />
              {submission.submission_type.replace("_", " ")}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1">
            {challenge && (
              <div className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Challenge:</span>{" "}
                {challenge.title}
              </div>
            )}

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {submission.description}
            </p>

            {submission.total_score > 0 && (
              <div className="bg-green-50 rounded-lg p-3 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-green-800">
                    Overall Score
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    {submission.total_score.toFixed(1)}/10
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {submission.innovation_score > 0 && (
                    <div className="text-center">
                      <div className="text-gray-600">Innovation</div>
                      <div className="font-semibold">
                        {submission.innovation_score}
                      </div>
                    </div>
                  )}
                  {submission.sustainability_score > 0 && (
                    <div className="text-center">
                      <div className="text-gray-600">Sustainability</div>
                      <div className="font-semibold">
                        {submission.sustainability_score}
                      </div>
                    </div>
                  )}
                  {submission.feasibility_score > 0 && (
                    <div className="text-center">
                      <div className="text-gray-600">Feasibility</div>
                      <div className="font-semibold">
                        {submission.feasibility_score}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3 mt-auto">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {format(new Date(submission.created_date), "MMM d, yyyy")}
                </span>
              </div>
              {submission.stars_earned > 0 && (
                <div className="flex items-center gap-1 text-amber-600">
                  <Star className="w-4 h-4" />
                  <span>{submission.stars_earned}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {submission.status === "draft" ? (
                <Link
                  to={createPageUrl(`EditSubmission?id=${submission.id}`)}
                  className="flex-1"
                >
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Edit className="w-4 h-4 mr-2" />
                    Continue Editing
                  </Button>
                </Link>
              ) : (
                <Link
                  to={createPageUrl(`ViewSubmission?id=${submission.id}`)}
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="w-full border-green-200 hover:bg-green-50"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </Link>
              )}
            </div>

            {submission.file_urls && submission.file_urls.length > 0 && (
              <div className="text-xs text-gray-500">
                {submission.file_urls.length} file
                {submission.file_urls.length > 1 ? "s" : ""} attached
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
