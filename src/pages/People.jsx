import React, { useState, useEffect } from "react";
import { User, Connection } from "@/entities/all";
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
import { Search, Users, MapPin, UserPlus, Filter } from "lucide-react";
import { motion } from "framer-motion";

import PeopleGrid from "../components/people/PeopleGrid";
import ConnectionRequests from "../components/people/ConnectionRequests";
import SuggestedConnections from "../components/people/SuggestedConnections";
import MyNetwork from "../components/people/MyNetwork";

export default function People() {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [connections, setConnections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [interestFilter, setInterestFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("discover");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPeople();
    loadConnections();
  }, []);

  useEffect(() => {
    filterPeople();
  }, [people, searchTerm, locationFilter, experienceFilter, interestFilter]);

  const loadPeople = async () => {
    try {
      const usersList = await User.list("-created_date");
      setPeople(usersList);
    } catch (error) {
      console.error("Error loading people:", error);
    }
    setLoading(false);
  };

  const loadConnections = async () => {
    try {
      const connectionsList = await Connection.list("-created_date");
      setConnections(connectionsList);
    } catch (error) {
      console.error("Error loading connections:", error);
    }
  };

  const filterPeople = () => {
    let filtered = people;

    if (searchTerm) {
      filtered = filtered.filter(
        (person) =>
          person.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.skills?.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          person.profession?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter !== "all") {
      filtered = filtered.filter((person) =>
        person.location?.includes(locationFilter)
      );
    }

    if (experienceFilter !== "all") {
      filtered = filtered.filter(
        (person) => person.experience_level === experienceFilter
      );
    }

    if (interestFilter !== "all") {
      filtered = filtered.filter((person) =>
        person.interests?.includes(interestFilter)
      );
    }

    setFilteredPeople(filtered);
  };

  const getUniqueLocations = () => {
    const locations = people.map((p) => p.location).filter(Boolean);
    return [...new Set(locations)];
  };

  const getUniqueInterests = () => {
    const interests = people.flatMap((p) => p.interests || []);
    return [...new Set(interests)];
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            EcoConnect Network
          </h1>
          <p className="text-lg text-gray-600">
            Connect with fellow sustainability enthusiasts and innovators
            worldwide
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="network">My Network</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="suggestions">Suggested</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            {/* Search and Filters */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search people..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select
                    value={locationFilter}
                    onValueChange={setLocationFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {getUniqueLocations().map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={experienceFilter}
                    onValueChange={setExperienceFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                      <SelectItem value="industry_professional">
                        Industry Pro
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={interestFilter}
                    onValueChange={setInterestFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Interests</SelectItem>
                      {getUniqueInterests().map((interest) => (
                        <SelectItem key={interest} value={interest}>
                          {interest}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <PeopleGrid
              people={filteredPeople}
              connections={connections}
              loading={loading}
              onConnectionUpdate={loadConnections}
            />
          </TabsContent>

          <TabsContent value="network">
            <MyNetwork connections={connections} loading={loading} />
          </TabsContent>

          <TabsContent value="requests">
            <ConnectionRequests
              connections={connections}
              loading={loading}
              onUpdate={loadConnections}
            />
          </TabsContent>

          <TabsContent value="suggestions">
            <SuggestedConnections
              people={people}
              connections={connections}
              loading={loading}
              onConnectionUpdate={loadConnections}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
