import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Globe,
  Eye,
  ExternalLink,
  Edit,
  Trash2,
  MoreVertical,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Copy,
  Link2,
  Palette,
  Users,
  Clock,
  BarChart3,
} from "lucide-react";
import { DashboardLayout } from "../components/DashboardLayout";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";

// — Types —
type OverallStatus =
  | "operational"
  | "degraded"
  | "major_outage"
  | "maintenance";

interface StatusPageMonitor {
  name: string;
  status: "operational" | "degraded" | "down";
}

interface StatusPage {
  id: string;
  name: string;
  slug: string;
  customDomain?: string;
  overallStatus: OverallStatus;
  monitors: StatusPageMonitor[];
  isPublic: boolean;
  subscriberCount: number;
  lastUpdated: string;
  branding: {
    logo?: string;
    accentColor: string;
  };
}

// — Mock Data —
const statusPages: StatusPage[] = [
  {
    id: "sp-1",
    name: "MyApp Status",
    slug: "myapp",
    customDomain: "status.myapp.com",
    overallStatus: "degraded",
    monitors: [
      { name: "Production API", status: "operational" },
      { name: "Marketing Website", status: "operational" },
      { name: "Database Server", status: "degraded" },
      { name: "Auth Service", status: "operational" },
      { name: "Payment Gateway", status: "down" },
      { name: "CDN Endpoint", status: "operational" },
    ],
    isPublic: true,
    subscriberCount: 234,
    lastUpdated: "2 minutes ago",
    branding: { accentColor: "#3b82f6" },
  },
  {
    id: "sp-2",
    name: "Internal Systems",
    slug: "internal",
    overallStatus: "operational",
    monitors: [
      { name: "CI/CD Pipeline", status: "operational" },
      { name: "Staging Environment", status: "operational" },
      { name: "Dev Database", status: "operational" },
    ],
    isPublic: false,
    subscriberCount: 18,
    lastUpdated: "15 minutes ago",
    branding: { accentColor: "#8b5cf6" },
  },
  {
    id: "sp-3",
    name: "Partner API Status",
    slug: "partner-api",
    customDomain: "status.api.myapp.com",
    overallStatus: "operational",
    monitors: [
      { name: "REST API v2", status: "operational" },
      { name: "GraphQL API", status: "operational" },
      { name: "Webhook Delivery", status: "operational" },
      { name: "OAuth Service", status: "operational" },
    ],
    isPublic: true,
    subscriberCount: 1203,
    lastUpdated: "5 minutes ago",
    branding: { accentColor: "#10b981" },
  },
];

// — Helpers —

function overallStatusInfo(status: OverallStatus) {
  switch (status) {
    case "operational":
      return {
        label: "All Systems Operational",
        cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        icon: <CheckCircle2 className="w-4 h-4" />,
      };
    case "degraded":
      return {
        label: "Degraded Performance",
        cls: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        icon: <AlertTriangle className="w-4 h-4" />,
      };
    case "major_outage":
      return {
        label: "Major Outage",
        cls: "bg-red-500/10 text-red-400 border-red-500/20",
        icon: <XCircle className="w-4 h-4" />,
      };
    case "maintenance":
      return {
        label: "Under Maintenance",
        cls: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        icon: <Clock className="w-4 h-4" />,
      };
  }
}

function monitorStatusDot(status: StatusPageMonitor["status"]) {
  switch (status) {
    case "operational":
      return "bg-emerald-500";
    case "degraded":
      return "bg-amber-500";
    case "down":
      return "bg-red-500";
  }
}

// — Page —

export function StatusPagesPage() {
  return (
    <DashboardLayout title="Status Pages">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">
              Public and private status pages for your services. Keep your users
              informed.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-500 text-white h-9">
                <Plus className="w-4 h-4 mr-2" /> Create Status Page
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0a0f1a] border-white/10 text-white max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-white">
                  Create Status Page
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Set up a new status page to communicate service health to your
                  users.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label className="text-gray-300">Page Name</Label>
                  <Input
                    placeholder="e.g. MyApp Status"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Slug</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      timeup.io/status/
                    </span>
                    <Input
                      placeholder="my-app"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">
                    Custom Domain (optional)
                  </Label>
                  <Input
                    placeholder="status.example.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-300">Public Page</Label>
                    <p className="text-xs text-gray-500">
                      Anyone with the link can view
                    </p>
                  </div>
                  <Switch className="data-[state=checked]:bg-blue-600" />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white hover:bg-white/5"
                >
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                  Create Page
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Status Page Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {statusPages.map((page, index) => {
            const info = overallStatusInfo(page.overallStatus);
            return (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                          style={{
                            backgroundColor: page.branding.accentColor + "20",
                            color: page.branding.accentColor,
                          }}
                        >
                          {page.name.charAt(0)}
                        </div>
                        <div>
                          <CardTitle className="text-sm text-white">
                            {page.name}
                          </CardTitle>
                          <CardDescription className="text-xs text-gray-500">
                            {page.customDomain ||
                              `timeup.io/status/${page.slug}`}
                          </CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white hover:bg-white/5 h-8 w-8"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-gray-900 border-white/10 text-white"
                        >
                          <DropdownMenuItem className="hover:bg-white/5 cursor-pointer focus:bg-white/5">
                            <ExternalLink className="w-4 h-4 mr-2" /> View Page
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/5 cursor-pointer focus:bg-white/5">
                            <Copy className="w-4 h-4 mr-2" /> Copy Link
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/5 cursor-pointer focus:bg-white/5">
                            <Edit className="w-4 h-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/5 cursor-pointer focus:bg-white/5">
                            <Palette className="w-4 h-4 mr-2" /> Customize
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/10" />
                          <DropdownMenuItem className="hover:bg-white/5 cursor-pointer text-red-400 focus:bg-white/5 focus:text-red-400">
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Overall Status */}
                    <div
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg ${info.cls}`}
                    >
                      {info.icon}
                      <span className="text-sm font-medium">{info.label}</span>
                    </div>

                    {/* Monitor List */}
                    <div className="space-y-2">
                      {page.monitors.map((m) => (
                        <div
                          key={m.name}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-gray-300">{m.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 capitalize">
                              {m.status === "down"
                                ? "Down"
                                : m.status === "degraded"
                                  ? "Degraded"
                                  : "Operational"}
                            </span>
                            <div
                              className={`w-2 h-2 rounded-full ${monitorStatusDot(m.status)}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="bg-white/5" />

                    {/* Footer Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          {page.isPublic ? (
                            <Globe className="w-3 h-3" />
                          ) : (
                            <Eye className="w-3 h-3" />
                          )}
                          {page.isPublic ? "Public" : "Private"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {page.subscriberCount} subscribers
                        </span>
                      </div>
                      <span>Updated {page.lastUpdated}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Info Panel */}
        <Card className="border-white/5 bg-white/[0.02]">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg shrink-0">
                <Link2 className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white mb-1">
                  Share your status page
                </h3>
                <p className="text-sm text-gray-400">
                  Add your status page link to your website footer,
                  documentation, or support portal so users can check real-time
                  status and subscribe to updates. You can customize branding,
                  add a custom domain, and choose which monitors to display.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
