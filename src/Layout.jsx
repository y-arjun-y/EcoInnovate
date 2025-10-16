import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Home,
  Trophy,
  Upload,
  Star,
  Users,
  Lightbulb,
  Network,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Home,
  },
  {
    title: "Challenges",
    url: createPageUrl("Challenges"),
    icon: Trophy,
  },
  {
    title: "My Submissions",
    url: createPageUrl("MySubmissions"),
    icon: Upload,
  },
  {
    title: "People",
    url: createPageUrl("People"),
    icon: Network,
  },
  {
    title: "Leaderboard",
    url: createPageUrl("Leaderboard"),
    icon: Users,
  },
  {
    title: "Daily Discovery",
    url: createPageUrl("DailyFacts"),
    icon: Lightbulb,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-green-50">
        <style>
          {`
            :root {
              --eco-primary: #059669;
              --eco-secondary: #0d9488;
              --eco-accent: #0ea5e9;
              --eco-forest: #064e3b;
              --eco-sage: #6b7280;
            }
          `}
        </style>

        <Sidebar className="border-r border-green-100 bg-white/80 backdrop-blur-sm">
          <SidebarHeader className="border-b border-green-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-full" />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">EcoDesign</h2>
                <p className="text-sm text-green-600 font-medium">
                  Sustainability Hub
                </p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                Navigate
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`hover:bg-green-50 hover:text-green-700 transition-all duration-200 rounded-xl mb-1 group ${
                          location.pathname === item.url
                            ? "bg-green-50 text-green-700 shadow-sm"
                            : ""
                        }`}
                      >
                        <Link
                          to={item.url}
                          className="flex items-center gap-3 px-4 py-3"
                        >
                          <item.icon
                            className={`w-5 h-5 transition-colors ${
                              location.pathname === item.url
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                          />
                          <span className="font-medium text-sm">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-8">
              <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                Progress
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 py-3 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Star className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">
                          Stars Earned
                        </span>
                        <span className="font-bold text-gray-900">135</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">Streak</span>
                        <span className="font-bold text-gray-900">5 days</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Network className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">
                          Connections
                        </span>
                        <span className="font-bold text-gray-900">12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-green-100 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">
                  Eco Innovator
                </p>
                <p className="text-xs text-green-600 truncate">Sapling Level</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          {/* Mobile Header */}
          <header className="bg-white/90 backdrop-blur-sm border-b border-green-100 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-green-50 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-gray-900">EcoDesign</h1>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
