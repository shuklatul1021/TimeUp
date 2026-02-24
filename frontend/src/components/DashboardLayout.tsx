import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  Search,
  Globe,
  AlertTriangle,
  TrendingUp,
  Users,
  BarChart3,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const navItems = [
  { icon: BarChart3, label: "Dashboard", path: "/dashboard" },
  { icon: Globe, label: "Monitors", path: "/monitors" },
  { icon: AlertTriangle, label: "Incidents", path: "/incidents" },
  { icon: Users, label: "Status Pages", path: "/status-pages" },
  { icon: Bell, label: "Alerts", path: "/alerts" },
  { icon: TrendingUp, label: "Analytics", path: "/analytics" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function DashboardLayout({
  children,
  title,
  badge,
}: {
  children: React.ReactNode;
  title: string;
  badge?: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#030712] text-white flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 72 : 260 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="fixed inset-y-0 left-0 z-40 border-r border-white/5 bg-[#030712]/80 backdrop-blur-xl flex flex-col"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 gap-3 border-b border-white/5 shrink-0">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="p-1.5 bg-blue-600 rounded-lg shrink-0">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-bold text-lg tracking-tight whitespace-nowrap"
                >
                  TimeUp
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <TooltipProvider key={item.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-blue-600/10 text-blue-400"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      <AnimatePresence>
                        {!sidebarCollapsed && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="whitespace-nowrap"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  </TooltipTrigger>
                  {sidebarCollapsed && (
                    <TooltipContent
                      side="right"
                      className="bg-gray-900 border-white/10 text-white"
                    >
                      {item.label}
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-3 py-4 border-t border-white/5 shrink-0">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ChevronDown
              className={`w-5 h-5 shrink-0 transition-transform ${sidebarCollapsed ? "rotate-[-90deg]" : "rotate-90"}`}
            />
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="whitespace-nowrap"
                >
                  Collapse
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        animate={{ marginLeft: sidebarCollapsed ? 72 : 260 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="flex-1 min-h-screen"
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 border-b border-white/5 bg-[#030712]/60 backdrop-blur-xl flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
            {badge}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search..."
                className="w-64 pl-9 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-blue-500 h-9"
              />
            </div>

            <Separator orientation="vertical" className="h-6 bg-white/10" />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/alerts">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white hover:bg-white/5 relative"
                    >
                      <Bell className="w-5 h-5" />
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-900 border-white/10 text-white">
                  Notifications
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 hover:bg-white/5 px-2"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-blue-600 text-white text-xs">
                      AT
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-gray-900 border-white/10 text-white"
              >
                <DropdownMenuLabel className="text-gray-400">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  className="hover:bg-white/5 cursor-pointer focus:bg-white/5"
                  asChild
                >
                  <Link to="/settings">
                    <Settings className="w-4 h-4 mr-2" /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-white/5 cursor-pointer focus:bg-white/5"
                  asChild
                >
                  <Link to="/alerts">
                    <Bell className="w-4 h-4 mr-2" /> Notifications
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  className="hover:bg-white/5 cursor-pointer text-red-400 focus:bg-white/5 focus:text-red-400"
                  asChild
                >
                  <Link to="/auth">
                    <LogOut className="w-4 h-4 mr-2" /> Log Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </motion.main>
    </div>
  );
}
