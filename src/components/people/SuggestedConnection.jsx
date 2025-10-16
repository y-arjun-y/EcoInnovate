import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import PeopleGrid from "./PeopleGrid";

export default function SuggestedConnections({
  people,
  connections,
  loading,
  onConnectionUpdate,
}) {
  const currentUserEmail = "user@example.com";

  // Filter out people who are already connected or have pending requests
  const connectedEmails = new Set(
    connections.map((conn) =>
      conn.requester_email === currentUserEmail
        ? conn.recipient_email
        : conn.requester_email
    )
  );

  // Simple suggestion algorithm based on shared interests and location
  const suggestedPeople = people
    .filter(
      (person) =>
        person.email !== currentUserEmail && !connectedEmails.has(person.email)
    )
    .slice(0, 6); // Show top 6 suggestions

  if (suggestedPeople.length === 0 && !loading) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No suggestions available
          </h3>
          <p className="text-gray-600">
            Complete your profile to get better connection suggestions
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-600" />
            Suggested Connections
          </CardTitle>
        </CardHeader>
      </Card>

      <PeopleGrid
        people={suggestedPeople}
        connections={connections}
        loading={loading}
        onConnectionUpdate={onConnectionUpdate}
      />
    </div>
  );
}
