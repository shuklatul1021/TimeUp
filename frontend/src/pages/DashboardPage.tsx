import { useState } from "react";
import {
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Server,
  Shield,
  Clock,
  MoreVertical,
  Pause,
  Trash2,
  Edit,
  ExternalLink,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
} from "recharts";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { DashboardLayout } from "../components/DashboardLayout";

// — Mock Data —

const responseTimeData = [
  { time: "00:00", value: 120 },
  { time: "02:00", value: 132 },
  { time: "04:00", value: 101 },
  { time: "06:00", value: 134 },
  { time: "08:00", value: 190 },
  { time: "10:00", value: 230 },
  { time: "12:00", value: 210 },
  { time: "14:00", value: 180 },
  { time: "16:00", value: 250 },
  { time: "18:00", value: 196 },
  { time: "20:00", value: 145 },
  { time: "22:00", value: 128 },
];

const incidentData = [
  { day: "Mon", incidents: 0 },
  { day: "Tue", incidents: 1 },
  { day: "Wed", incidents: 0 },
  { day: "Thu", incidents: 2 },
  { day: "Fri", incidents: 0 },
  { day: "Sat", incidents: 0 },
  { day: "Sun", incidents: 1 },
];

type MonitorStatus = "up" | "down" | "degraded" | "paused";

interface Monitor {
  id: string;
  name: string;
  url: string;
  type: "HTTP" | "TCP" | "DNS" | "SSL";
  status: MonitorStatus;
  uptime: number;
  responseTime: number;
  lastChecked: string;
  certExpiry?: string;
}

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
    certExpiry: "45 days",
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
    certExpiry: "120 days",
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
  },
];

interface Incident {
  id: string;
  monitorName: string;
  type: "downtime" | "degraded" | "ssl_expiring";
  message: string;
  startedAt: string;
  duration: string;
  resolved: boolean;
}

const recentIncidents: Incident[] = [
  {
    id: "inc-1",
    monitorName: "Payment Gateway",
    type: "downtime",
    message: "Connection refused — host unreachable",
    startedAt: "Today, 14:32",
    duration: "Ongoing",
    resolved: false,
  },
  {
    id: "inc-2",
    monitorName: "Database Server",
    type: "degraded",
    message: "Response time exceeded 300ms threshold",
    startedAt: "Today, 11:05",
    duration: "3h 27m",
    resolved: false,
  },
  {
    id: "inc-3",
    monitorName: "Production API",
    type: "downtime",
    message: "502 Bad Gateway",
    startedAt: "Yesterday, 09:18",
    duration: "4m 12s",
    resolved: true,
  },
  {
    id: "inc-4",
    monitorName: "Marketing Website",
    type: "ssl_expiring",
    message: "SSL certificate expires in 45 days",
    startedAt: "2 days ago",
    duration: "—",
    resolved: false,
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
  switch (status) {
    case "up":
      return (
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20">
          <CheckCircle2 className="w-3 h-3 mr-1" /> Up
        </Badge>
      );
    case "down":
      return (
        <Badge className="bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20">
          <XCircle className="w-3 h-3 mr-1" /> Down
        </Badge>
      );
    case "degraded":
      return (
        <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20">
          <AlertTriangle className="w-3 h-3 mr-1" /> Degraded
        </Badge>
      );
    case "paused":
      return (
        <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20 hover:bg-gray-500/20">
          <Pause className="w-3 h-3 mr-1" /> Paused
        </Badge>
      );
  }
}

function typeIcon(type: Monitor["type"]) {
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

// — Uptime Bar Component —

// Pre-generate 90-day uptime data outside render
const uptimeDays = Array.from({ length: 90 }, (_, i) => {
  const rand = Math.random();
  const status: MonitorStatus =
    rand > 0.97 ? "down" : rand > 0.93 ? "degraded" : "up";
  return { day: 90 - i, status };
});

function UptimeBar() {
  const days = uptimeDays;

  return (
    <TooltipProvider>
      <div className="flex gap-[2px] items-end">
        {days.map((d, i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <div
                className={`w-1.5 h-6 rounded-sm cursor-pointer transition-all hover:scale-y-125 hover:brightness-125 ${statusColor(d.status)}`}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-gray-900 border-white/10 text-white text-xs">
              {d.day} days ago —{" "}
              {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

// — Stat Card —

function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconColor,
}: {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ElementType;
  iconColor: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] transition-colors">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <div className={`p-2 rounded-lg ${iconColor}`}>
              <Icon className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-end gap-2">
            <p className="text-3xl font-bold tracking-tight text-white">
              {value}
            </p>
            <span
              className={`flex items-center text-xs font-medium pb-1 ${
                changeType === "positive"
                  ? "text-emerald-400"
                  : changeType === "negative"
                    ? "text-red-400"
                    : "text-gray-400"
              }`}
            >
              {changeType === "positive" ? (
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
              ) : changeType === "negative" ? (
                <ArrowDownRight className="w-3 h-3 mr-0.5" />
              ) : null}
              {change}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// — Custom Recharts Tooltip —

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-white/10 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-white">{payload[0].value}ms</p>
      </div>
    );
  }
  return null;
}

// — Main Dashboard Component —

export function DashboardPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | MonitorStatus>(
    "all",
  );

  const filteredMonitors = monitors.filter((m) => {
    const matchesStatus = statusFilter === "all" || m.status === statusFilter;
    return matchesStatus;
  });

  const totalUp = monitors.filter((m) => m.status === "up").length;
  const totalDown = monitors.filter((m) => m.status === "down").length;
  const avgUptime = (
    monitors.reduce((sum, m) => sum + m.uptime, 0) / monitors.length
  ).toFixed(2);
  const avgResponseTime = Math.round(
    monitors
      .filter((m) => m.responseTime > 0)
      .reduce((sum, m) => sum + m.responseTime, 0) /
      monitors.filter((m) => m.responseTime > 0).length,
  );

  return (
    <DashboardLayout
      title="Dashboard"
      badge={
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
          All systems operational
        </Badge>
      }
    >
      <div className="space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Monitors Up"
            value={`${totalUp}/${monitors.length}`}
            change={`${totalDown} down`}
            changeType={totalDown > 0 ? "negative" : "positive"}
            icon={CheckCircle2}
            iconColor="bg-emerald-500/10 text-emerald-400"
          />
          <StatCard
            title="Avg. Uptime"
            value={`${avgUptime}%`}
            change="+0.02% this week"
            changeType="positive"
            icon={TrendingUp}
            iconColor="bg-blue-500/10 text-blue-400"
          />
          <StatCard
            title="Avg. Response"
            value={`${avgResponseTime}ms`}
            change="-12ms from last week"
            changeType="positive"
            icon={Clock}
            iconColor="bg-purple-500/10 text-purple-400"
          />
          <StatCard
            title="Incidents Today"
            value={`${recentIncidents.filter((i) => i.startedAt.includes("Today")).length}`}
            change={`${recentIncidents.filter((i) => !i.resolved).length} unresolved`}
            changeType={
              recentIncidents.filter((i) => !i.resolved).length > 0
                ? "negative"
                : "neutral"
            }
            icon={AlertTriangle}
            iconColor="bg-amber-500/10 text-amber-400"
          />
        </div>

        {/* 90-Day Uptime Bar */}
        <Card className="border-white/5 bg-white/[0.02]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white text-base">
                  90-Day Uptime Overview
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Overall system availability across all monitors
                </CardDescription>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-lg px-3 py-1">
                {avgUptime}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <UptimeBar />
            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <span>90 days ago</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Up
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />{" "}
                  Degraded
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-red-500" /> Down
                </span>
              </div>
              <span>Today</span>
            </div>
          </CardContent>
        </Card>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Response Time Chart */}
          <Card className="border-white/5 bg-white/[0.02] lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-base">
                    Response Time
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Average response time across all monitors (24h)
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-white/5"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={responseTimeData}>
                    <defs>
                      <linearGradient
                        id="colorResponse"
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
                      tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="rgba(255,255,255,0.2)"
                      tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      unit="ms"
                    />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorResponse)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Incidents Chart */}
          <Card className="border-white/5 bg-white/[0.02]">
            <CardHeader>
              <CardTitle className="text-white text-base">
                Incidents This Week
              </CardTitle>
              <CardDescription className="text-gray-400">
                Incident count per day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incidentData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="day"
                      stroke="rgba(255,255,255,0.2)"
                      tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="rgba(255,255,255,0.2)"
                      tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
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
                    <Bar
                      dataKey="incidents"
                      fill="#ef4444"
                      radius={[4, 4, 0, 0]}
                      barSize={32}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monitors Table + Incidents */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Monitors List */}
          <Card className="border-white/5 bg-white/[0.02] lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-base">
                    Monitors
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {monitors.length} monitors configured
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Tabs
                    value={statusFilter}
                    onValueChange={(v) =>
                      setStatusFilter(v as "all" | MonitorStatus)
                    }
                  >
                    <TabsList className="bg-white/5 border border-white/10 h-8">
                      <TabsTrigger
                        value="all"
                        className="text-xs px-2.5 h-6 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                      >
                        All
                      </TabsTrigger>
                      <TabsTrigger
                        value="up"
                        className="text-xs px-2.5 h-6 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                      >
                        Up
                      </TabsTrigger>
                      <TabsTrigger
                        value="down"
                        className="text-xs px-2.5 h-6 data-[state=active]:bg-red-600 data-[state=active]:text-white"
                      >
                        Down
                      </TabsTrigger>
                      <TabsTrigger
                        value="degraded"
                        className="text-xs px-2.5 h-6 data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                      >
                        Degraded
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-500 text-white h-8"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {filteredMonitors.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No monitors match your filter.
                  </div>
                )}
                {filteredMonitors.map((monitor, index) => (
                  <motion.div
                    key={monitor.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="flex items-center px-6 py-4 hover:bg-white/[0.02] transition-colors group"
                  >
                    {/* Status dot */}
                    <div className="mr-4">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${statusColor(monitor.status)} ${
                          monitor.status === "up"
                            ? "animate-pulse"
                            : monitor.status === "down"
                              ? "animate-ping-slow"
                              : ""
                        }`}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {typeIcon(monitor.type)}
                        <span className="font-medium text-white text-sm truncate">
                          {monitor.name}
                        </span>
                        {statusBadge(monitor.status)}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {monitor.url}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="hidden md:flex items-center gap-8 mr-4">
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Uptime</p>
                        <p
                          className={`text-sm font-medium ${
                            monitor.uptime >= 99.9
                              ? "text-emerald-400"
                              : monitor.uptime >= 99
                                ? "text-amber-400"
                                : "text-red-400"
                          }`}
                        >
                          {monitor.uptime}%
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Response</p>
                        <p className="text-sm font-medium text-white">
                          {monitor.responseTime > 0
                            ? `${monitor.responseTime}ms`
                            : "—"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Last Check</p>
                        <p className="text-sm text-gray-300">
                          {monitor.lastChecked}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white hover:bg-white/5 transition-all h-8 w-8"
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
                          <Edit className="w-4 h-4 mr-2" /> Edit Monitor
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-white/5 cursor-pointer focus:bg-white/5">
                          <Pause className="w-4 h-4 mr-2" /> Pause
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

          {/* Recent Incidents */}
          <Card className="border-white/5 bg-white/[0.02]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-base">
                    Recent Incidents
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Latest alerts & issues
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-400 hover:text-blue-300 hover:bg-white/5 text-xs"
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {recentIncidents.map((incident) => (
                  <div
                    key={incident.id}
                    className="px-6 py-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {incident.type === "downtime" ? (
                          <XCircle className="w-4 h-4 text-red-400" />
                        ) : incident.type === "degraded" ? (
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                        ) : (
                          <Shield className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-white">
                            {incident.monitorName}
                          </span>
                          {incident.resolved ? (
                            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] px-1.5 py-0">
                              Resolved
                            </Badge>
                          ) : (
                            <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-[10px] px-1.5 py-0">
                              Active
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-1 truncate">
                          {incident.message}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-500">
                          <span>{incident.startedAt}</span>
                          <span>·</span>
                          <span>{incident.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
