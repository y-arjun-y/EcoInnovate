import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, UserX, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Connection } from "@/entities/all";

const connectionTypeColors = {
  colleague: "bg-blue-100 text-blue-800",
  mentor: "bg-purple-100 text-purple-800",
  collaborator: "bg-green-100 text-green-800",
  friend: "bg-pink-100 text-pink-800",
  classmate: "bg-yellow-100 text-yellow-800",
};

export default function ConnectionRequests({ connections, loading, onUpdate }) {
  const currentUserEmail = "user@example.com";
  const pendingRequests = connections.filter(
    (conn) =>
      conn.recipient_email === currentUserEmail && conn.status === "pending"
  );

  const handleAcceptRequest = async (connectionId) => {
    try {
      await Connection.update(connectionId, { status: "accepted" });
      onUpdate();
    } catch (error) {
      console.error("Error accepting connection:", error);
    }
  };

  const handleDeclineRequest = async (connectionId) => {
    try {
      await Connection.update(connectionId, { status: "declined" });
      onUpdate();
    } catch (error) {
      console.error("Error declining connection:", error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    );
  }

  if (pendingRequests.length === 0) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No pending requests
          </h3>
          <p className="text-gray-600">
            You'll see connection requests from other users here
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-orange-600" />
            Connection Requests ({pendingRequests.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-start gap-4 p-4 rounded-lg border bg-orange-50"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {request.requester_email.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {request.requester_email.split("@")[0]}
                  </h4>
                  <Badge
                    className={connectionTypeColors[request.connection_type]}
                    size="sm"
                  >
                    {request.connection_type}
                  </Badge>
                  {request.message && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {request.message}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleAcceptRequest(request.id)}
                  >
                    <UserCheck className="w-4 h-4 mr-1" />
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeclineRequest(request.id)}
                  >
                    <UserX className="w-4 h-4 mr-1" />
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
