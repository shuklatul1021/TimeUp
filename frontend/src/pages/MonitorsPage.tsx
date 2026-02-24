import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Globe,
  Server,
  Shield,
  BarChart3,
  Search,
  MoreVertical,
  Pause,
  Trash2,
  Edit,
  ExternalLink,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Copy,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";

// — Types —
type MonitorStatus = "up" | "down" | "degraded" | "paused";
type MonitorType = "HTTP" | "TCP" | "DNS" | "SSL";

interface Monitor {
  id: string;
  name: string;
  url: string;
  type: MonitorType;
  status: MonitorStatus;
  uptime: number;
  responseTime: number;
  lastChecked: string;
  interval: number;
  region: string;
  certExpiry?: string;
  responseHistory: { time: string; value: number }[];
}

// — Mock Data —
const monitors: Monitor[] = [
  {
    id: "1",
    name: "Production API",
    url: "https://api.myapp.com/health",
    type: "HTTP",
    status: "up",
    uptime: 99.98,
    responseTime: 142,
    lastChecked: "12s ago",
    interval: 30,
    region: "US East",
    responseHistory: [
      { time: "00:00", value: 120 },
      { time: "04:00", value: 132 },
      { time: "08:00", value: 190 },
      { time: "12:00", value: 210 },
      { time: "16:00", value: 150 },
      { time: "20:00", value: 145 },
    ],
  },
  {
    id: "2",
    name: "Marketing Website",
    url: "https://www.myapp.com",
    type: "HTTP",
    status: "up",
    uptime: 99.95,
    responseTime: 89,
    lastChecked: "28s ago",
    interval: 60,
    region: "EU West",
    certExpiry: "45 days",
    responseHistory: [
      { time: "00:00", value: 80 },
      { time: "04:00", value: 95 },
      { time: "08:00", value: 110 },
      { time: "12:00", value: 98 },
      { time: "16:00", value: 85 },
      { time: "20:00", value: 78 },
    ],
  },
  {
    id: "3",
    name: "Database Server",
    url: "db.myapp.com:5432",
    type: "TCP",
    status: "degraded",
    uptime: 98.72,
    responseTime: 340,
    lastChecked: "5s ago",
    interval: 15,
    region: "US East",
    responseHistory: [
      { time: "00:00", value: 200 },
      { time: "04:00", value: 250 },
      { time: "08:00", value: 310 },
      { time: "12:00", value: 420 },
      { time: "16:00", value: 380 },
      { time: "20:00", value: 340 },
    ],
  },
  {
    id: "4",
    name: "Auth Service",
    url: "https://auth.myapp.com/status",
    type: "HTTP",
    status: "up",
    uptime: 99.99,
    responseTime: 56,
    lastChecked: "15s ago",
    interval: 30,
    region: "US West",
    responseHistory: [
      { time: "00:00", value: 45 },
      { time: "04:00", value: 52 },
      { time: "08:00", value: 60 },
      { time: "12:00", value: 58 },
      { time: "16:00", value: 55 },
      { time: "20:00", value: 48 },
    ],
  },
  {
    id: "5",
    name: "CDN Endpoint",
    url: "cdn.myapp.com",
    type: "DNS",
    status: "up",
    uptime: 100,
    responseTime: 12,
    lastChecked: "32s ago",
    interval: 60,
    region: "Global",
    responseHistory: [
      { time: "00:00", value: 10 },
      { time: "04:00", value: 11 },
      { time: "08:00", value: 14 },
      { time: "12:00", value: 13 },
      { time: "16:00", value: 12 },
      { time: "20:00", value: 11 },
    ],
  },
  {
    id: "6",
    name: "Payment Gateway",
    url: "https://pay.myapp.com/ping",
    type: "HTTP",
    status: "down",
    uptime: 95.4,
    responseTime: 0,
    lastChecked: "2m ago",
    interval: 15,
    region: "US East",
    responseHistory: [
      { time: "00:00", value: 120 },
      { time: "04:00", value: 130 },
      { time: "08:00", value: 0 },
      { time: "12:00", value: 0 },
      { time: "16:00", value: 0 },
      { time: "20:00", value: 0 },
    ],
  },
  {
    id: "7",
    name: "SSL Certificate",
    url: "myapp.com",
    type: "SSL",
    status: "up",
    uptime: 100,
    responseTime: 23,
    lastChecked: "1m ago",
    interval: 3600,
    region: "Global",
    certExpiry: "120 days",
    responseHistory: [
      { time: "00:00", value: 20 },
      { time: "04:00", value: 22 },
      { time: "08:00", value: 25 },
      { time: "12:00", value: 23 },
      { time: "16:00", value: 21 },
      { time: "20:00", value: 20 },
    ],
  },
  {
    id: "8",
    name: "Staging API",
    url: "https://staging-api.myapp.com",
    type: "HTTP",
    status: "paused",
    uptime: 97.2,
    responseTime: 0,
    lastChecked: "Paused",
    interval: 60,
    region: "US East",
    responseHistory: [],
  },
];

// — Helpers —

function statusColor(status: MonitorStatus) {
  switch (status) {
    case "up":
      return "bg-emerald-500";
    case "down":
      return "bg-red-500";
    case "degraded":
      return "bg-amber-500";
    case "paused":
      return "bg-gray-500";
  }
}

function statusBadge(status: MonitorStatus) {
  const map = {
    up: {
      cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      icon: <CheckCircle2 className="w-3 h-3 mr-1" />,
      label: "Up",
    },
    down: {
      cls: "bg-red-500/10 text-red-400 border-red-500/20",
      icon: <XCircle className="w-3 h-3 mr-1" />,
      label: "Down",
    },
    degraded: {
      cls: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      icon: <AlertTriangle className="w-3 h-3 mr-1" />,
      label: "Degraded",
    },
    paused: {
      cls: "bg-gray-500/10 text-gray-400 border-gray-500/20",
      icon: <Pause className="w-3 h-3 mr-1" />,
      label: "Paused",
    },
  };
  const s = map[status];
  return (
    <Badge className={`${s.cls} hover:brightness-110`}>
      {s.icon} {s.label}
    </Badge>
  );
}

function typeIcon(type: MonitorType) {
  switch (type) {
    case "HTTP":
      return <Globe className="w-4 h-4 text-blue-400" />;
    case "TCP":
      return <Server className="w-4 h-4 text-purple-400" />;
    case "DNS":
      return <BarChart3 className="w-4 h-4 text-cyan-400" />;
    case "SSL":
      return <Shield className="w-4 h-4 text-emerald-400" />;
  }
}

const uptimeDaysMap: Record<string, { day: number; status: MonitorStatus }[]> =
  {};
monitors.forEach((m) => {
  uptimeDaysMap[m.id] = Array.from({ length: 30 }, (_, i) => {
    const rand = Math.random();
    const status: MonitorStatus =
      m.status === "paused"
        ? "paused"
        : m.status === "down" && i > 20
          ? "down"
          : rand > 0.95
            ? "down"
            : rand > 0.9
              ? "degraded"
              : "up";
    return { day: 30 - i, status };
  });
});

// — Components —

function MiniUptimeBar({ monitorId }: { monitorId: string }) {
  const days = uptimeDaysMap[monitorId] || [];
  return (
    <TooltipProvider>
      <div className="flex gap-[1.5px] items-end">
        {days.map((d, i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <div
                className={`w-1 h-4 rounded-sm ${statusColor(d.status)} opacity-80 hover:opacity-100 transition-opacity`}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-gray-900 border-white/10 text-white text-xs">
              {d.day}d ago —{" "}
              {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

function MiniChart({ data }: { data: { time: string; value: number }[] }) {
  if (!data.length) return <div className="text-xs text-gray-600">No data</div>;
  return (
    <div className="h-12 w-32">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="miniGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={1.5}
            fillOpacity={1}
            fill="url(#miniGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// — Page —

export function MonitorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | MonitorStatus>(
    "all",
  );
  const [selectedMonitor, setSelectedMonitor] = useState<Monitor | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const filtered = monitors.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const counts = {
    all: monitors.length,
    up: monitors.filter((m) => m.status === "up").length,
    down: monitors.filter((m) => m.status === "down").length,
    degraded: monitors.filter((m) => m.status === "degraded").length,
    paused: monitors.filter((m) => m.status === "paused").length,
  };

  return (
    <DashboardLayout title="Monitors">
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search monitors..."
                className="w-72 pl-9 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-blue-500 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as "all" | MonitorStatus)}
            >
              <TabsList className="bg-white/5 border border-white/10 h-9">
                <TabsTrigger
                  value="all"
                  className="text-xs px-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  All ({counts.all})
                </TabsTrigger>
                <TabsTrigger
                  value="up"
                  className="text-xs px-3 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                >
                  Up ({counts.up})
                </TabsTrigger>
                <TabsTrigger
                  value="down"
                  className="text-xs px-3 data-[state=active]:bg-red-600 data-[state=active]:text-white"
                >
                  Down ({counts.down})
                </TabsTrigger>
                <TabsTrigger
                  value="degraded"
                  className="text-xs px-3 data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                >
                  Degraded ({counts.degraded})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-white/5 border border-white/10 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === "list" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
              >
                Grid
              </button>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-500 text-white h-9">
                  <Plus className="w-4 h-4 mr-2" /> Add Monitor
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0a0f1a] border-white/10 text-white max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    Create New Monitor
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Configure a new endpoint to monitor for uptime and
                    performance.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Monitor Name</Label>
                    <Input
                      placeholder="e.g. Production API"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Type</Label>
                      <Select>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/10 text-white">
                          <SelectItem value="http">HTTP(S)</SelectItem>
                          <SelectItem value="tcp">TCP Port</SelectItem>
                          <SelectItem value="dns">DNS</SelectItem>
                          <SelectItem value="ssl">SSL Certificate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">Check Interval</Label>
                      <Select>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Interval" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/10 text-white">
                          <SelectItem value="15">Every 15s</SelectItem>
                          <SelectItem value="30">Every 30s</SelectItem>
                          <SelectItem value="60">Every 1m</SelectItem>
                          <SelectItem value="300">Every 5m</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">URL / Host</Label>
                    <Input
                      placeholder="https://example.com/health"
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Region</Label>
                    <Select>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/10 text-white">
                        <SelectItem value="us-east">US East</SelectItem>
                        <SelectItem value="us-west">US West</SelectItem>
                        <SelectItem value="eu-west">EU West</SelectItem>
                        <SelectItem value="ap-south">AP South</SelectItem>
                        <SelectItem value="global">Global</SelectItem>
                      </SelectContent>
                    </Select>
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
                    Create Monitor
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Monitor Cards — Grid View */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((monitor, index) => (
              <motion.div
                key={monitor.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <Card
                  className="border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer group"
                  onClick={() => setSelectedMonitor(monitor)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${statusColor(monitor.status)} ${monitor.status === "up" ? "animate-pulse" : ""}`}
                        />
                        {typeIcon(monitor.type)}
                        <CardTitle className="text-sm text-white">
                          {monitor.name}
                        </CardTitle>
                      </div>
                      {statusBadge(monitor.status)}
                    </div>
                    <CardDescription className="text-gray-500 text-xs truncate">
                      {monitor.url}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <MiniChart data={monitor.responseHistory} />
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <p className="text-gray-500">Uptime</p>
                        <p
                          className={`font-medium ${monitor.uptime >= 99.9 ? "text-emerald-400" : monitor.uptime >= 99 ? "text-amber-400" : "text-red-400"}`}
                        >
                          {monitor.uptime}%
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500">Response</p>
                        <p className="font-medium text-white">
                          {monitor.responseTime > 0
                            ? `${monitor.responseTime}ms`
                            : "—"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500">Interval</p>
                        <p className="font-medium text-gray-300">
                          {monitor.interval >= 60
                            ? `${monitor.interval / 60}m`
                            : `${monitor.interval}s`}
                        </p>
                      </div>
                    </div>
                    <MiniUptimeBar monitorId={monitor.id} />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Monitor Table — List View */
          <Card className="border-white/5 bg-white/[0.02]">
            <CardContent className="p-0">
              {/* Header */}
              <div className="grid grid-cols-[1fr_100px_100px_100px_120px_80px_40px] gap-4 px-6 py-3 border-b border-white/5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span>Monitor</span>
                <span className="text-right">Status</span>
                <span className="text-right">Uptime</span>
                <span className="text-right">Response</span>
                <span className="text-right">Last Check</span>
                <span className="text-right">Region</span>
                <span></span>
              </div>
              {/* Rows */}
              <div className="divide-y divide-white/5">
                {filtered.length === 0 && (
                  <div className="p-12 text-center text-gray-500">
                    No monitors match your filters.
                  </div>
                )}
                {filtered.map((monitor, index) => (
                  <motion.div
                    key={monitor.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="grid grid-cols-[1fr_100px_100px_100px_120px_80px_40px] gap-4 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors group cursor-pointer"
                    onClick={() => setSelectedMonitor(monitor)}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-2 h-2 rounded-full shrink-0 ${statusColor(monitor.status)} ${monitor.status === "up" ? "animate-pulse" : ""}`}
                      />
                      {typeIcon(monitor.type)}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {monitor.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {monitor.url}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {statusBadge(monitor.status)}
                    </div>
                    <p
                      className={`text-sm font-medium text-right ${monitor.uptime >= 99.9 ? "text-emerald-400" : monitor.uptime >= 99 ? "text-amber-400" : "text-red-400"}`}
                    >
                      {monitor.uptime}%
                    </p>
                    <p className="text-sm text-right text-white">
                      {monitor.responseTime > 0
                        ? `${monitor.responseTime}ms`
                        : "—"}
                    </p>
                    <p className="text-sm text-right text-gray-400">
                      {monitor.lastChecked}
                    </p>
                    <p className="text-xs text-right text-gray-500">
                      {monitor.region}
                    </p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white hover:bg-white/5 h-8 w-8"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-gray-900 border-white/10 text-white"
                      >
                        <DropdownMenuItem className="hover:bg-white/5 cursor-pointer focus:bg-white/5">
                          <ExternalLink className="w-4 h-4 mr-2" /> Visit URL
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-white/5 cursor-pointer focus:bg-white/5">
                          <Copy className="w-4 h-4 mr-2" /> Copy URL
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-white/5 cursor-pointer focus:bg-white/5">
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-white/5 cursor-pointer focus:bg-white/5">
                          {monitor.status === "paused" ? (
                            <Play className="w-4 h-4 mr-2" />
                          ) : (
                            <Pause className="w-4 h-4 mr-2" />
                          )}
                          {monitor.status === "paused" ? "Resume" : "Pause"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="hover:bg-white/5 cursor-pointer text-red-400 focus:bg-white/5 focus:text-red-400">
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Monitor Detail Panel */}
        {selectedMonitor && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-white/5 bg-white/[0.02]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${statusColor(selectedMonitor.status)}`}
                    />
                    {typeIcon(selectedMonitor.type)}
                    <div>
                      <CardTitle className="text-white">
                        {selectedMonitor.name}
                      </CardTitle>
                      <CardDescription className="text-gray-500">
                        {selectedMonitor.url}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {statusBadge(selectedMonitor.status)}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white hover:bg-white/5"
                      onClick={() => setSelectedMonitor(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    {
                      label: "Uptime",
                      value: `${selectedMonitor.uptime}%`,
                      color:
                        selectedMonitor.uptime >= 99.9
                          ? "text-emerald-400"
                          : "text-amber-400",
                    },
                    {
                      label: "Response Time",
                      value:
                        selectedMonitor.responseTime > 0
                          ? `${selectedMonitor.responseTime}ms`
                          : "—",
                      color: "text-white",
                    },
                    {
                      label: "Check Interval",
                      value:
                        selectedMonitor.interval >= 60
                          ? `${selectedMonitor.interval / 60}m`
                          : `${selectedMonitor.interval}s`,
                      color: "text-gray-300",
                    },
                    {
                      label: "Region",
                      value: selectedMonitor.region,
                      color: "text-gray-300",
                    },
                    {
                      label: "Last Checked",
                      value: selectedMonitor.lastChecked,
                      color: "text-gray-300",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white/[0.02] rounded-lg p-3 border border-white/5"
                    >
                      <p className="text-xs text-gray-500">{stat.label}</p>
                      <p className={`text-lg font-semibold ${stat.color}`}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {selectedMonitor.responseHistory.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-3">
                      Response Time (24h)
                    </h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={selectedMonitor.responseHistory}>
                          <defs>
                            <linearGradient
                              id="detailGrad"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#3b82f6"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="95%"
                                stopColor="#3b82f6"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255,255,255,0.05)"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="time"
                            stroke="rgba(255,255,255,0.2)"
                            tick={{
                              fill: "rgba(255,255,255,0.4)",
                              fontSize: 12,
                            }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis
                            stroke="rgba(255,255,255,0.2)"
                            tick={{
                              fill: "rgba(255,255,255,0.4)",
                              fontSize: 12,
                            }}
                            axisLine={false}
                            tickLine={false}
                            unit="ms"
                          />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: "#111827",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: "8px",
                              color: "#fff",
                              fontSize: "12px",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#detailGrad)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">
                    30-Day Uptime
                  </h3>
                  <MiniUptimeBar monitorId={selectedMonitor.id} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Globe className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-300">
              No monitors found
            </h3>
            <p className="text-gray-500 mt-1">
              Try adjusting your search or filter.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
