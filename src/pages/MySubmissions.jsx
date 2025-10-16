import React, { useState, useEffect } from "react";
import { Submission, Challenge, Review } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Upload,
  Search,
  Plus,
  Eye,
  Edit,
  Star,
  TrendingUp,
  FileText,
  Clock,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

import SubmissionCard from "../components/submissions/SubmissionCard";
import SubmissionStats from "../components/submissions/SubmissionStats";
import CreateSubmissionDialog from "../components/submissions/CreateSubmissionDialog";

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  submitted: "bg-blue-100 text-blue-800",
  under_review: "bg-yellow-100 text-yellow-800",
  reviewed: "bg-green-100 text-green-800",
};

export default function MySubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [challengeFilter, setChallengeFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    loadSubmissions();
    loadChallenges();
  }, []);

  useEffect(() => {
    filterSubmissions();
  }, [submissions, searchTerm, statusFilter, challengeFilter, activeTab]);

  const loadSubmissions = async () => {
    try {
      // In a real app, we'd filter by current user
      const submissionsList = await Submission.list("-created_date");
      setSubmissions(submissionsList);
    } catch (error) {
      console.error("Error loading submissions:", error);
    }
    setLoading(false);
  };

  const loadChallenges = async () => {
    try {
      const challengesList = await Challenge.list("-created_date");
      setChallenges(challengesList);
    } catch (error) {
      console.error("Error loading challenges:", error);
    }
  };

  const filterSubmissions = () => {
    let filtered = submissions;

    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter(
        (submission) => submission.status === activeTab
      );
    }

    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(
        (submission) =>
          submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (submission) => submission.status === statusFilter
      );
    }

    // Filter by challenge
    if (challengeFilter !== "all") {
      filtered = filtered.filter(
        (submission) => submission.challenge_id === challengeFilter
      );
    }

    setFilteredSubmissions(filtered);
  };

  const getSubmissionStats = () => {
    const stats = {
      total: submissions.length,
      drafts: submissions.filter((s) => s.status === "draft").length,
      submitted: submissions.filter((s) => s.status === "submitted").length,
      under_review: submissions.filter((s) => s.status === "under_review")
        .length,
      reviewed: submissions.filter((s) => s.status === "reviewed").length,
      averageScore: 0,
      totalStars: 0,
    };

    const reviewedSubmissions = submissions.filter((s) => s.total_score > 0);
    if (reviewedSubmissions.length > 0) {
      stats.averageScore =
        reviewedSubmissions.reduce((sum, s) => sum + s.total_score, 0) /
        reviewedSubmissions.length;
    }

    stats.totalStars = submissions.reduce(
      (sum, s) => sum + (s.stars_earned || 0),
      0
    );

    return stats;
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-green-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-start mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Submissions
            </h1>
            <p className="text-lg text-gray-600">
              Track your progress and manage your design submissions
            </p>
          </div>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Submission
          </Button>
        </motion.div>

        {/* Stats Overview */}
        <SubmissionStats stats={getSubmissionStats()} loading={loading} />

        {/* Filters and Tabs */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-6">
          <CardContent className="p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-4"
            >
              <TabsList className="grid grid-cols-5 w-full md:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
                <TabsTrigger value="submitted">Submitted</TabsTrigger>
                <TabsTrigger value="under_review">Review</TabsTrigger>
                <TabsTrigger value="reviewed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={challengeFilter}
                onValueChange={setChallengeFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Challenge" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Challenges</SelectItem>
                  {challenges.map((challenge) => (
                    <SelectItem key={challenge.id} value={challenge.id}>
                      {challenge.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Submissions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubmissions.map((submission, index) => {
            const challenge = challenges.find(
              (c) => c.id === submission.challenge_id
            );
            return (
              <SubmissionCard
                key={submission.id}
                submission={submission}
                challenge={challenge}
                index={index}
                onUpdate={loadSubmissions}
              />
            );
          })}
        </div>

        {filteredSubmissions.length === 0 && !loading && (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Upload className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {activeTab === "all"
                  ? "No submissions yet"
                  : `No ${activeTab} submissions`}
              </h3>
              <p className="text-gray-600 mb-4">
                {activeTab === "all"
                  ? "Start by joining a challenge and creating your first submission"
                  : `You don't have any ${activeTab} submissions at the moment`}
              </p>
              <Link to={createPageUrl("Challenges")}>
                <Button className="bg-green-600 hover:bg-green-700">
                  Browse Challenges
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        <CreateSubmissionDialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
          challenges={challenges.filter((c) => c.status === "active")}
          onSubmissionCreated={loadSubmissions}
        />
      </div>
    </div>
  );
}
