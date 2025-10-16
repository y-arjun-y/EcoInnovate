import React, { useState, useEffect } from "react";
import { DailyFact } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, Calendar, Lightbulb, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

import TodaysFeaturedFact from "../components/facts/TodaysFeaturedFact";
import FactCard from "../components/facts/FactCard";
import FactsGrid from "../components/facts/FactsGrid";

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "history", label: "History" },
  { value: "innovation", label: "Innovation" },
  { value: "future", label: "Future Tech" },
  { value: "breakthrough", label: "Breakthroughs" },
  { value: "sustainability", label: "Sustainability" },
  { value: "engineering", label: "Engineering" },
];

export default function DailyFacts() {
  const [facts, setFacts] = useState([]);
  const [filteredFacts, setFilteredFacts] = useState([]);
  const [todaysFact, setTodaysFact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFacts();
  }, []);

  useEffect(() => {
    filterFacts();
  }, [facts, searchTerm, categoryFilter, activeTab]);

  const loadFacts = async () => {
    try {
      const factsList = await DailyFact.list("-fact_date");
      setFacts(factsList);

      // Find today's fact
      const today = format(new Date(), "yyyy-MM-dd");
      const todayFact = factsList.find((fact) => fact.fact_date === today);
      if (todayFact) {
        setTodaysFact(todayFact);
      } else if (factsList.length > 0) {
        // Fallback to latest fact
        setTodaysFact(factsList[0]);
      }
    } catch (error) {
      console.error("Error loading facts:", error);
    }
    setLoading(false);
  };

  const filterFacts = () => {
    let filtered = facts;

    // Filter by category tab
    if (activeTab !== "all") {
      filtered = filtered.filter((fact) => fact.category === activeTab);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (fact) =>
          fact.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          fact.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category dropdown
    if (categoryFilter !== "all") {
      filtered = filtered.filter((fact) => fact.category === categoryFilter);
    }

    setFilteredFacts(filtered);
  };

  const getCategoryCounts = () => {
    const counts = {};
    facts.forEach((fact) => {
      counts[fact.category] = (counts[fact.category] || 0) + 1;
    });
    return counts;
  };

  const categoryCounts = getCategoryCounts();

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-slate-50 to-green-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            Daily Discovery
          </h1>
          <p className="text-lg text-gray-600">
            Explore fascinating facts from science, engineering, and innovation
            history
          </p>
        </motion.div>

        {/* Today's Featured Fact */}
        <TodaysFeaturedFact fact={todaysFact} loading={loading} />

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search facts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
                <TabsTrigger value="all" className="text-xs">
                  All ({facts.length})
                </TabsTrigger>
                <TabsTrigger value="history" className="text-xs">
                  History ({categoryCounts.history || 0})
                </TabsTrigger>
                <TabsTrigger value="innovation" className="text-xs">
                  Innovation ({categoryCounts.innovation || 0})
                </TabsTrigger>
                <TabsTrigger value="future" className="text-xs">
                  Future ({categoryCounts.future || 0})
                </TabsTrigger>
                <TabsTrigger value="sustainability" className="text-xs">
                  Sustainability ({categoryCounts.sustainability || 0})
                </TabsTrigger>
                <TabsTrigger value="engineering" className="text-xs">
                  Engineering ({categoryCounts.engineering || 0})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Facts Grid */}
        <FactsGrid facts={filteredFacts} loading={loading} />

        {/* No Results State */}
        {filteredFacts.length === 0 && !loading && (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No facts found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filters to discover more
                fascinating facts
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
