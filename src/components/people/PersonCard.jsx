import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  UserPlus,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Connection } from "@/entities/all";

import ConnectDialog from "./ConnectDialog";

const experienceColors = {
  student: "bg-blue-100 text-blue-800",
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  expert: "bg-purple-100 text-purple-800",
  industry_professional: "bg-red-100 text-red-800",
};

export default function PersonCard({
  person,
  index,
  connections,
  onConnectionUpdate,
}) {
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Check connection status with this person
  const currentUserEmail = "user@example.com"; // This would be dynamic in a real app
  const existingConnection = connections.find(
    (conn) =>
      (conn.requester_email === currentUserEmail &&
        conn.recipient_email === person.email) ||
      (conn.recipient_email === currentUserEmail &&
        conn.requester_email === person.email)
  );

  const getConnectionStatus = () => {
    if (!existingConnection) return "none";
    if (existingConnection.status === "accepted") return "connected";
    if (existingConnection.status === "pending") {
      return existingConnection.requester_email === currentUserEmail
        ? "sent"
        : "received";
    }
    return existingConnection.status;
  };

  const connectionStatus = getConnectionStatus();

  const handleConnect = async (connectionData) => {
    setIsConnecting(true);
    try {
      await Connection.create({
        requester_email: currentUserEmail,
        recipient_email: person.email,
        ...connectionData,
      });
      onConnectionUpdate();
      setShowConnectDialog(false);
    } catch (error) {
      console.error("Error creating connection:", error);
    }
    setIsConnecting(false);
  };

  const renderConnectionButton = () => {
    switch (connectionStatus) {
      case "connected":
        return (
          <Button
            variant="outline"
            className="w-full border-green-200 text-green-700"
            disabled
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Connected
          </Button>
        );
      case "sent":
        return (
          <Button variant="outline" className="w-full" disabled>
            Request Sent
          </Button>
        );
      case "received":
        return (
          <Button className="w-full bg-green-600 hover:bg-green-700">
            Accept Request
          </Button>
        );
      default:
        return (
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowConnectDialog(true)}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Connect
          </Button>
        );
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {person.full_name?.charAt(0)?.toUpperCase() ||
                  person.email.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg text-gray-900 truncate">
                  {person.full_name || person.email.split("@")[0]}
                </h3>
                {person.profession && (
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {person.profession}
                  </p>
                )}
                {person.location && (
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {person.location}
                  </p>
                )}
              </div>
              {person.is_mentor && (
                <Badge className="bg-amber-100 text-amber-800 text-xs">
                  Mentor
                </Badge>
              )}
            </div>

            {person.bio && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {person.bio}
              </p>
            )}

            {person.university && (
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                <GraduationCap className="w-3 h-3" />
                <span>{person.university}</span>
              </div>
            )}

            {person.experience_level && (
              <div className="mb-4">
                <Badge className={experienceColors[person.experience_level]}>
                  {person.experience_level.replace("_", " ")}
                </Badge>
              </div>
            )}

            {person.skills && person.skills.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {person.skills.slice(0, 3).map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {person.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{person.skills.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2">
              {renderConnectionButton()}

              {connectionStatus === "connected" && (
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <ConnectDialog
        open={showConnectDialog}
        onOpenChange={setShowConnectDialog}
        person={person}
        onConnect={handleConnect}
        isConnecting={isConnecting}
      />
    </>
  );
}
