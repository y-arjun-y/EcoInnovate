import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";

const connectionTypes = [
  { value: "colleague", label: "Colleague" },
  { value: "mentor", label: "Mentor/Mentee" },
  { value: "collaborator", label: "Collaborator" },
  { value: "friend", label: "Friend" },
  { value: "classmate", label: "Classmate" },
];

export default function ConnectDialog({
  open,
  onOpenChange,
  person,
  onConnect,
  isConnecting,
}) {
  const [connectionType, setConnectionType] = useState("collaborator");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onConnect({
      connection_type: connectionType,
      message:
        message ||
        `Hi ${
          person.full_name || person.email.split("@")[0]
        }, I'd like to connect with you on EcoDesign!`,
    });
  };

  const defaultMessages = {
    colleague: `Hi ${
      person.full_name || person.email.split("@")[0]
    }, I'd like to connect as we seem to work in similar sustainability fields.`,
    mentor: `Hi ${
      person.full_name || person.email.split("@")[0]
    }, I'm interested in learning from your expertise and would appreciate connecting.`,
    collaborator: `Hi ${
      person.full_name || person.email.split("@")[0]
    }, I'd love to explore potential collaboration opportunities on sustainability projects.`,
    friend: `Hi ${
      person.full_name || person.email.split("@")[0]
    }, I'd like to connect and expand my network in the sustainability community.`,
    classmate: `Hi ${
      person.full_name || person.email.split("@")[0]
    }, I noticed we share similar educational backgrounds and would like to connect.`,
  };

  const handleConnectionTypeChange = (type) => {
    setConnectionType(type);
    if (!message) {
      setMessage(defaultMessages[type]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-blue-600" />
            Connect with {person.full_name || person.email.split("@")[0]}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Connection Type</Label>
            <Select
              value={connectionType}
              onValueChange={handleConnectionTypeChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {connectionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Personal Message</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message..."
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isConnecting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Send Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
