import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Submission } from "@/entities/all";
import { Plus, X } from "lucide-react";

export default function CreateSubmissionDialog({
  open,
  onOpenChange,
  challenges,
  onSubmissionCreated,
}) {
  const [formData, setFormData] = useState({
    challenge_id: "",
    title: "",
    description: "",
    submission_type: "image",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.challenge_id || !formData.title || !formData.description)
      return;

    setIsSubmitting(true);
    try {
      await Submission.create({
        ...formData,
        status: "draft",
      });

      setFormData({
        challenge_id: "",
        title: "",
        description: "",
        submission_type: "image",
      });

      onSubmissionCreated();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating submission:", error);
    }
    setIsSubmitting(false);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-green-600" />
            Create New Submission
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="challenge">Challenge</Label>
            <Select
              value={formData.challenge_id}
              onValueChange={(value) =>
                handleInputChange("challenge_id", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a challenge" />
              </SelectTrigger>
              <SelectContent>
                {challenges.map((challenge) => (
                  <SelectItem key={challenge.id} value={challenge.id}>
                    {challenge.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Submission Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Give your submission a descriptive title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your design solution and approach..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Submission Type</Label>
            <Select
              value={formData.submission_type}
              onValueChange={(value) =>
                handleInputChange("submission_type", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select submission type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image/Design</SelectItem>
                <SelectItem value="video">Video Presentation</SelectItem>
                <SelectItem value="cad_model">CAD Model</SelectItem>
                <SelectItem value="document">Document/Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={
                isSubmitting ||
                !formData.challenge_id ||
                !formData.title ||
                !formData.description
              }
            >
              {isSubmitting ? "Creating..." : "Create Draft"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
