import Entity from "./Entity";

// Initialize entities
const Challenge = new Entity("Challenge", {});
const DailyFact = new Entity("DailyFact", {});
const UserAchievement = new Entity("UserAchievement", {});
const Submission = new Entity("Submission", {});
const Connection = new Entity("Connection", {});
const Message = new Entity("Message", {});
const Review = new Entity("Review", {});

// Seed some mock data for development
const seedData = () => {
  // Sample Challenges
  Challenge.create({
    title: "Zero Waste Week Challenge",
    description: "Reduce your household waste to near zero for one week",
    status: "active",
    difficulty: "medium",
    points: 100,
    participants: 234,
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    category: "waste-reduction",
  });

  Challenge.create({
    title: "Solar Energy Initiative",
    description: "Document your journey to installing solar panels",
    status: "active",
    difficulty: "hard",
    points: 250,
    participants: 89,
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    category: "renewable-energy",
  });

  Challenge.create({
    title: "Plant-Based Month",
    description: "Try a plant-based diet for 30 days",
    status: "active",
    difficulty: "easy",
    points: 150,
    participants: 456,
    endDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    category: "sustainable-living",
  });

  // Sample Daily Facts
  DailyFact.create({
    title: "Ocean Plastic Crisis",
    content:
      "Every minute, one garbage truck of plastic is dumped into our oceans. By 2050, there could be more plastic than fish in the sea.",
    category: "ocean-conservation",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    source: "National Geographic",
    featured: true,
  });

  DailyFact.create({
    title: "Renewable Energy Growth",
    content:
      "Solar energy is now the cheapest source of electricity in history, making clean energy more accessible than ever.",
    category: "renewable-energy",
    imageUrl:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
    source: "International Energy Agency",
  });

  DailyFact.create({
    title: "Forest Conservation",
    content:
      "Trees absorb CO2 from the atmosphere. A single mature tree can absorb up to 48 pounds of CO2 per year.",
    category: "climate-action",
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    source: "World Wildlife Fund",
  });

  // Sample Submissions
  Submission.create({
    challengeId: 1,
    userId: 1,
    title: "My Zero Waste Journey - Day 5",
    description: "Successfully reduced waste by 80% using reusable containers",
    status: "approved",
    points: 50,
    likes: 23,
    comments: 8,
  });

  Submission.create({
    challengeId: 2,
    userId: 2,
    title: "Solar Panel Installation Progress",
    description: "Completed the initial assessment and planning phase",
    status: "pending",
    points: 0,
    likes: 12,
    comments: 4,
  });

  // Sample User Achievements
  UserAchievement.create({
    userId: 1,
    title: "First Challenge Completed",
    description: "Completed your first sustainability challenge",
    badgeIcon: "trophy",
    earnedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  });

  UserAchievement.create({
    userId: 1,
    title: "Community Builder",
    description: "Connected with 10 other eco-innovators",
    badgeIcon: "users",
    earnedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  });
};

// Seed data on initialization
seedData();

export {
  Challenge,
  DailyFact,
  UserAchievement,
  Submission,
  Connection,
  Message,
  Review,
};
