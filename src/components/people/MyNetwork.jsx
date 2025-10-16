import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, MapPin, Briefcase } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const connectionTypeColors = {
  colleague: "bg-blue-100 text-blue-800",
  mentor: "bg-purple-100 text-purple-800",
  collaborator: "bg-green-100 text-green-800",
  friend: "bg-pink-100 text-pink-800",
  classmate: "bg-yellow-100 text-yellow-800",
};

export default function MyNetwork({ connections, loading }) {
  const acceptedConnections = connections.filter(
    (conn) => conn.status === "accepted"
  );

  if (loading) {
    return (
      <div className="space-y-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    );
  }

  if (acceptedConnections.length === 0) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No connections yet
          </h3>
          <p className="text-gray-600">
            Start connecting with people to build your sustainability network
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
            <Users className="w-6 h-6 text-blue-600" />
            My Network ({acceptedConnections.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {acceptedConnections.map((connection) => (
              <div
                key={connection.id}
                className="flex items-center gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                  {connection.recipient_email.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {connection.recipient_email.split("@")[0]}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      className={
                        connectionTypeColors[connection.connection_type]
                      }
                    >
                      {connection.connection_type}
                    </Badge>
                    {connection.common_interests &&
                      connection.common_interests.length > 0 && (
                        <span className="text-xs text-gray-500">
                          {connection.common_interests.length} shared interests
                        </span>
                      )}
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
