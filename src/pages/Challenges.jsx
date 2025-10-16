import React, { useState, useEffect } from "react";
import { Challenge } from "@/entities/all";
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
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Search, Filter, Calendar, Users, Star } from "lucide-react";
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

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChallenges();
  }, []);

  useEffect(() => {
    filterChallenges();
  }, [challenges, searchTerm, categoryFilter, difficultyFilter, statusFilter]);

  const loadChallenges = async () => {
    try {
      const challengesList = await Challenge.list("-created_date");
      setChallenges(challengesList);
    } catch (error) {
      console.error("Error loading challenges:", error);
    }
    setLoading(false);
  };

  const filterChallenges = () => {
    let filtered = challenges;

    if (searchTerm) {
      filtered = filtered.filter(
        (challenge) =>
          challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (challenge) => challenge.category === categoryFilter
      );
    }

    if (difficultyFilter !== "all") {
      filtered = filtered.filter(
        (challenge) => challenge.difficulty === difficultyFilter
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (challenge) => challenge.status === statusFilter
      );
    }

    setFilteredChallenges(filtered);
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-green-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Design Challenges
          </h1>
          <p className="text-lg text-gray-600">
            Join sustainability challenges and make a real impact
          </p>
        </motion.div>

        {/* Filters */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search challenges..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="water_conservation">
                    Water Conservation
                  </SelectItem>
                  <SelectItem value="energy_efficiency">
                    Energy Efficiency
                  </SelectItem>
                  <SelectItem value="waste_reduction">
                    Waste Reduction
                  </SelectItem>
                  <SelectItem value="sustainable_transport">
                    Sustainable Transport
                  </SelectItem>
                  <SelectItem value="green_building">Green Building</SelectItem>
                  <SelectItem value="renewable_energy">
                    Renewable Energy
                  </SelectItem>
                  <SelectItem value="circular_economy">
                    Circular Economy
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={difficultyFilter}
                onValueChange={setDifficultyFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="review">In Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge, index) => {
            const daysLeft = differenceInDays(
              new Date(challenge.end_date),
              new Date()
            );
            const isExpired = daysLeft < 0;

            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full">
                  {challenge.image_url && (
                    <div className="w-full h-48 bg-gradient-to-r from-green-400 to-teal-500 rounded-t-xl" />
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
                        {challenge.title}
                      </h3>
                      {challenge.status === "active" && !isExpired && (
                        <Badge className="bg-green-100 text-green-800 ml-2">
                          Active
                        </Badge>
                      )}
                      {isExpired && (
                        <Badge variant="secondary" className="ml-2">
                          Expired
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2 mb-3">
                      <Badge className={categoryColors[challenge.category]}>
                        {challenge.category.replace(/_/g, " ")}
                      </Badge>
                      <Badge className={difficultyColors[challenge.difficulty]}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
                      {challenge.brief || challenge.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {isExpired ? "Ended" : `${daysLeft} days left`}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>
                            {challenge.submission_count || 0} submissions
                          </span>
                        </div>
                      </div>

                      {challenge.rewards_stars && (
                        <div className="flex items-center gap-1 text-sm text-amber-600">
                          <Star className="w-4 h-4" />
                          <span>{challenge.rewards_stars} stars reward</span>
                        </div>
                      )}

                      <Link
                        to={createPageUrl(`Challenge?id=${challenge.id}`)}
                        className="block"
                      >
                        <Button
                          className="w-full bg-green-600 hover:bg-green-700"
                          disabled={isExpired}
                        >
                          {isExpired ? "View Results" : "Join Challenge"}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredChallenges.length === 0 && !loading && (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No challenges found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or check back later for new
                challenges
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
