import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  XCircle,
  AlertTriangle,
  Shield,
  CheckCircle2,
  Clock,
  ChevronRight,
  MessageSquare,
  ExternalLink
} from "lucide-react";
import { DashboardLayout } from "../components/DashboardLayout";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";

type IncidentStatus = "ongoing" | "resolved" | "acknowledged";
type IncidentSeverity = "critical" | "warning" | "info";

interface Incident {
  id: string;
  monitorName: string;
  monitorUrl: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  title: string;
  message: string;
  startedAt: string;
  resolvedAt?: string;
  duration: string;
  rootCause?: string;
  timeline: {
    time: string;
    event: string;
    type: "alert" | "ack" | "update" | "resolved";
  }[];
}

// — Mock Data —
const incidents: Incident[] = [
  {
    id: "INC-001",
    monitorName: "Payment Gateway",
    monitorUrl: "https://pay.myapp.com/ping",
    severity: "critical",
    status: "ongoing",
    title: "Complete outage — host unreachable",
    message:
      "The payment gateway has been returning connection refused errors since 14:32 UTC. All payment processing is affected.",
    startedAt: "Feb 24, 2026 14:32 UTC",
    duration: "2h 15m",
    timeline: [
      {
        time: "14:32",
        event: "Monitor detected downtime — connection refused",
        type: "alert",
      },
      {
        time: "14:33",
        event: "Alert sent to #ops-critical Slack channel",
        type: "alert",
      },
      { time: "14:35", event: "On-call engineer acknowledged", type: "ack" },
      {
        time: "15:10",
        event: "Root cause identified: hosting provider outage",
        type: "update",
      },
      {
        time: "15:45",
        event: "Failover initiated to backup region",
        type: "update",
      },
    ],
  },
  {
    id: "INC-002",
    monitorName: "Database Server",
    monitorUrl: "db.myapp.com:5432",
    severity: "warning",
    status: "acknowledged",
    title: "High response latency detected",
    message:
      "Database response time has exceeded 300ms threshold. Queries are completing but significantly slower than normal.",
    startedAt: "Feb 24, 2026 11:05 UTC",
    duration: "5h 42m",
    timeline: [
      {
        time: "11:05",
        event: "Response time exceeded 300ms threshold",
        type: "alert",
      },
      {
        time: "11:06",
        event: "Alert sent via email + PagerDuty",
        type: "alert",
      },
      {
        time: "11:15",
        event: "Engineer acknowledged — investigating",
        type: "ack",
      },
      {
        time: "12:30",
        event: "Identified heavy query load from analytics job",
        type: "update",
      },
    ],
  },
  {
    id: "INC-003",
    monitorName: "Production API",
    monitorUrl: "https://api.myapp.com/health",
    severity: "critical",
    status: "resolved",
    title: "502 Bad Gateway errors",
    message:
      "API returned 502 errors for approximately 4 minutes due to a deployment rollback issue.",
    startedAt: "Feb 23, 2026 09:18 UTC",
    resolvedAt: "Feb 23, 2026 09:22 UTC",
    duration: "4m 12s",
    rootCause:
      "Faulty deployment caused container crash loop. Automatic rollback resolved the issue.",
    timeline: [
      {
        time: "09:18",
        event: "Monitor detected 502 Bad Gateway",
        type: "alert",
      },
      { time: "09:18", event: "Alert triggered — all channels", type: "alert" },
      { time: "09:19", event: "Auto-rollback initiated", type: "update" },
      {
        time: "09:22",
        event: "Service restored — all checks passing",
        type: "resolved",
      },
    ],
  },
  {
    id: "INC-004",
    monitorName: "Marketing Website",
    monitorUrl: "https://www.myapp.com",
    severity: "info",
    status: "ongoing",
    title: "SSL certificate expiring soon",
    message:
      "The SSL certificate for www.myapp.com will expire in 45 days. Auto-renewal is configured but requires verification.",
    startedAt: "Feb 22, 2026",
    duration: "—",
    timeline: [
      {
        time: "Feb 22",
        event: "SSL expiry warning triggered (45 days)",
        type: "alert",
      },
    ],
  },
  {
    id: "INC-005",
    monitorName: "CDN Endpoint",
    monitorUrl: "cdn.myapp.com",
    severity: "warning",
    status: "resolved",
    title: "DNS resolution intermittent failures",
    message:
      "DNS lookups for cdn.myapp.com were failing intermittently from EU West region.",
    startedAt: "Feb 21, 2026 16:00 UTC",
    resolvedAt: "Feb 21, 2026 17:30 UTC",
    duration: "1h 30m",
    rootCause:
      "Upstream DNS provider experienced a partial outage. Resolved on their end.",
    timeline: [
      {
        time: "16:00",
        event: "DNS resolution failures detected",
        type: "alert",
      },
      { time: "16:02", event: "Alert sent to engineering team", type: "alert" },
      {
        time: "16:15",
        event: "Acknowledged — contacting DNS provider",
        type: "ack",
      },
      {
        time: "17:30",
        event: "DNS provider resolved the issue",
        type: "resolved",
      },
    ],
  },
  {
    id: "INC-006",
    monitorName: "Auth Service",
    monitorUrl: "https://auth.myapp.com/status",
    severity: "critical",
    status: "resolved",
    title: "Authentication service timeout",
    message: "Auth service was timing out for 12 minutes during peak hours.",
    startedAt: "Feb 20, 2026 08:45 UTC",
    resolvedAt: "Feb 20, 2026 08:57 UTC",
    duration: "12m",
    rootCause:
      "Memory leak caused by session cache overflow. Restarted and patched.",
    timeline: [
      {
        time: "08:45",
        event: "Timeout errors detected on auth service",
        type: "alert",
      },
      { time: "08:46", event: "Critical alert — all channels", type: "alert" },
      { time: "08:48", event: "Service restart initiated", type: "update" },
      { time: "08:57", event: "Service fully restored", type: "resolved" },
    ],
  },
];

// — Helpers —

function severityIcon(severity: IncidentSeverity) {
  switch (severity) {
    case "critical":
      return <XCircle className="w-5 h-5 text-red-400" />;
    case "warning":
      return <AlertTriangle className="w-5 h-5 text-amber-400" />;
    case "info":
      return <Shield className="w-5 h-5 text-blue-400" />;
  }
}

function severityBadge(severity: IncidentSeverity) {
  const map = {
    critical: "bg-red-500/10 text-red-400 border-red-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };
  return (
    <Badge className={map[severity]}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </Badge>
  );
}

function statusBadge(status: IncidentStatus) {
  const map = {
    ongoing: {
      cls: "bg-red-500/10 text-red-400 border-red-500/20",
      label: "Ongoing",
    },
    acknowledged: {
      cls: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      label: "Acknowledged",
    },
    resolved: {
      cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      label: "Resolved",
    },
  };
  const s = map[status];
  return <Badge className={s.cls}>{s.label}</Badge>;
}

function timelineIcon(type: string) {
  switch (type) {
    case "alert":
      return <div className="w-2.5 h-2.5 rounded-full bg-red-500" />;
    case "ack":
      return <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />;
    case "update":
      return <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />;
    case "resolved":
      return <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />;
    default:
      return <div className="w-2.5 h-2.5 rounded-full bg-gray-500" />;
  }
}

// — Page —

export function IncidentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | IncidentStatus>(
    "all",
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = incidents.filter((inc) => {
    const matchesSearch =
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.monitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || inc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const counts = {
    all: incidents.length,
    ongoing: incidents.filter((i) => i.status === "ongoing").length,
    acknowledged: incidents.filter((i) => i.status === "acknowledged").length,
    resolved: incidents.filter((i) => i.status === "resolved").length,
  };

  return (
    <DashboardLayout title="Incidents">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            {
              label: "Active Incidents",
              value: counts.ongoing + counts.acknowledged,
              color: "text-red-400",
              bg: "bg-red-500/10",
            },
            {
              label: "Critical",
              value: incidents.filter(
                (i) => i.severity === "critical" && i.status !== "resolved",
              ).length,
              color: "text-red-400",
              bg: "bg-red-500/10",
            },
            {
              label: "Acknowledged",
              value: counts.acknowledged,
              color: "text-amber-400",
              bg: "bg-amber-500/10",
            },
            {
              label: "Resolved (7d)",
              value: counts.resolved,
              color: "text-emerald-400",
              bg: "bg-emerald-500/10",
            },
          ].map((stat) => (
            <Card key={stat.label} className="border-white/5 bg-white/[0.02]">
              <CardContent className="p-5">
                <p className="text-xs font-medium text-gray-400">
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold mt-1 ${stat.color}`}>
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search incidents..."
                className="w-72 pl-9 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-blue-500 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs
              value={statusFilter}
              onValueChange={(v) =>
                setStatusFilter(v as "all" | IncidentStatus)
              }
            >
              <TabsList className="bg-white/5 border border-white/10 h-9">
                <TabsTrigger
                  value="all"
                  className="text-xs px-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  All ({counts.all})
                </TabsTrigger>
                <TabsTrigger
                  value="ongoing"
                  className="text-xs px-3 data-[state=active]:bg-red-600 data-[state=active]:text-white"
                >
                  Ongoing ({counts.ongoing})
                </TabsTrigger>
                <TabsTrigger
                  value="acknowledged"
                  className="text-xs px-3 data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                >
                  Acknowledged ({counts.acknowledged})
                </TabsTrigger>
                <TabsTrigger
                  value="resolved"
                  className="text-xs px-3 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                >
                  Resolved ({counts.resolved})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Incident List */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <CheckCircle2 className="w-12 h-12 text-emerald-600/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-300">
                No incidents found
              </h3>
              <p className="text-gray-500 mt-1">Everything looks good!</p>
            </div>
          )}

          {filtered.map((incident, index) => {
            const isExpanded = expandedId === incident.id;

            return (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <Card
                  className={`border-white/5 bg-white/[0.02] transition-colors ${isExpanded ? "ring-1 ring-white/10" : "hover:bg-white/[0.03]"}`}
                >
                  {/* Header Row */}
                  <button
                    className="w-full text-left"
                    onClick={() =>
                      setExpandedId(isExpanded ? null : incident.id)
                    }
                  >
                    <div className="flex items-center gap-4 px-6 py-4">
                      <div className="shrink-0">
                        {severityIcon(incident.severity)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-gray-500 font-mono">
                            {incident.id}
                          </span>
                          <span className="font-medium text-white text-sm">
                            {incident.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                          <span>{incident.monitorName}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {incident.startedAt}
                          </span>
                          <span>·</span>
                          <span>{incident.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {severityBadge(incident.severity)}
                        {statusBadge(incident.status)}
                        <ChevronRight
                          className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                        />
                      </div>
                    </div>
                  </button>

                  {/* Expanded Detail */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Separator className="bg-white/5" />
                      <div className="px-6 py-5 space-y-5">
                        {/* Description */}
                        <div>
                          <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                            Description
                          </h4>
                          <p className="text-sm text-gray-300 leading-relaxed">
                            {incident.message}
                          </p>
                        </div>

                        {/* Root Cause */}
                        {incident.rootCause && (
                          <div>
                            <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                              Root Cause
                            </h4>
                            <p className="text-sm text-gray-300 leading-relaxed">
                              {incident.rootCause}
                            </p>
                          </div>
                        )}

                        {/* Timeline */}
                        <div>
                          <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                            Timeline
                          </h4>
                          <div className="space-y-0">
                            {incident.timeline.map((entry, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-3 relative"
                              >
                                {i < incident.timeline.length - 1 && (
                                  <div className="absolute left-[4.5px] top-4 w-px h-full bg-white/5" />
                                )}
                                <div className="mt-1.5 shrink-0 z-10">
                                  {timelineIcon(entry.type)}
                                </div>
                                <div className="pb-4">
                                  <p className="text-sm text-white">
                                    {entry.event}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    {entry.time}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pt-2">
                          {incident.status !== "resolved" && (
                            <>
                              {incident.status === "ongoing" && (
                                <Button
                                  size="sm"
                                  className="bg-amber-600 hover:bg-amber-500 text-white h-8 text-xs"
                                >
                                  Acknowledge
                                </Button>
                              )}
                              <Button
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-500 text-white h-8 text-xs"
                              >
                                <CheckCircle2 className="w-3 h-3 mr-1" />{" "}
                                Resolve
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-white hover:bg-white/5 h-8 text-xs"
                          >
                            <MessageSquare className="w-3 h-3 mr-1" /> Add Note
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:text-white hover:bg-white/5 h-8 text-xs"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" /> View
                            Monitor
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
