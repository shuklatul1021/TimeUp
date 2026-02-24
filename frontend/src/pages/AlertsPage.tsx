import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Bell,
  Mail,
  MessageSquare,
  Phone,
  Webhook,
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  Zap,
  ArrowRight,
  Send,
  TestTube,
  AlertTriangle,
  XCircle,
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
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";


type ChannelType = "email" | "slack" | "webhook" | "sms" | "pagerduty";

interface AlertChannel {
  id: string;
  name: string;
  type: ChannelType;
  target: string;
  enabled: boolean;
  lastTriggered?: string;
}

interface AlertRule {
  id: string;
  name: string;
  description: string;
  condition: string;
  channels: string[];
  enabled: boolean;
  cooldown: string;
  triggeredCount: number;
  lastTriggered?: string;
}

interface AlertLog {
  id: string;
  ruleName: string;
  channelType: ChannelType;
  target: string;
  monitorName: string;
  message: string;
  sentAt: string;
  delivered: boolean;
}

// — Mock Data —

const channels: AlertChannel[] = [
  {
    id: "ch-1",
    name: "Engineering Email",
    type: "email",
    target: "eng@myapp.com",
    enabled: true,
    lastTriggered: "2h ago",
  },
  {
    id: "ch-2",
    name: "#ops-critical",
    type: "slack",
    target: "#ops-critical",
    enabled: true,
    lastTriggered: "2h ago",
  },
  {
    id: "ch-3",
    name: "PagerDuty On-Call",
    type: "pagerduty",
    target: "engineering-oncall",
    enabled: true,
    lastTriggered: "Yesterday",
  },
  {
    id: "ch-4",
    name: "Status Webhook",
    type: "webhook",
    target: "https://hooks.myapp.com/status",
    enabled: true,
    lastTriggered: "3h ago",
  },
  {
    id: "ch-5",
    name: "Ops SMS",
    type: "sms",
    target: "+1 (555) 123-4567",
    enabled: false,
  },
  {
    id: "ch-6",
    name: "#general-alerts",
    type: "slack",
    target: "#general-alerts",
    enabled: true,
    lastTriggered: "1d ago",
  },
];

const rules: AlertRule[] = [
  {
    id: "rule-1",
    name: "Critical Downtime",
    description: "Alert when any monitor goes down for more than 30 seconds",
    condition: "Monitor status = DOWN for > 30s",
    channels: ["Engineering Email", "#ops-critical", "PagerDuty On-Call"],
    enabled: true,
    cooldown: "5 min",
    triggeredCount: 12,
    lastTriggered: "2h ago",
  },
  {
    id: "rule-2",
    name: "High Latency Warning",
    description:
      "Alert when response time exceeds 300ms for 3 consecutive checks",
    condition: "Response time > 300ms for 3 checks",
    channels: ["Engineering Email", "#general-alerts"],
    enabled: true,
    cooldown: "15 min",
    triggeredCount: 8,
    lastTriggered: "5h ago",
  },
  {
    id: "rule-3",
    name: "SSL Expiry Warning",
    description: "Alert 30 days before SSL certificate expires",
    condition: "SSL expires in < 30 days",
    channels: ["Engineering Email"],
    enabled: true,
    cooldown: "24 hours",
    triggeredCount: 2,
    lastTriggered: "2d ago",
  },
  {
    id: "rule-4",
    name: "Recovery Notification",
    description: "Notify when a monitor recovers from downtime",
    condition: "Monitor status = UP (after DOWN)",
    channels: ["#ops-critical", "#general-alerts", "Status Webhook"],
    enabled: true,
    cooldown: "None",
    triggeredCount: 10,
    lastTriggered: "Yesterday",
  },
  {
    id: "rule-5",
    name: "Uptime Report",
    description: "Weekly uptime summary report",
    condition: "Every Monday at 09:00 UTC",
    channels: ["Engineering Email"],
    enabled: false,
    cooldown: "7 days",
    triggeredCount: 0,
  },
];

const alertLogs: AlertLog[] = [
  {
    id: "log-1",
    ruleName: "Critical Downtime",
    channelType: "email",
    target: "eng@myapp.com",
    monitorName: "Payment Gateway",
    message: "Monitor is DOWN — connection refused",
    sentAt: "14:33 UTC",
    delivered: true,
  },
  {
    id: "log-2",
    ruleName: "Critical Downtime",
    channelType: "slack",
    target: "#ops-critical",
    monitorName: "Payment Gateway",
    message: "Monitor is DOWN — connection refused",
    sentAt: "14:33 UTC",
    delivered: true,
  },
  {
    id: "log-3",
    ruleName: "Critical Downtime",
    channelType: "pagerduty",
    target: "engineering-oncall",
    monitorName: "Payment Gateway",
    message: "Monitor is DOWN — connection refused",
    sentAt: "14:33 UTC",
    delivered: true,
  },
  {
    id: "log-4",
    ruleName: "High Latency Warning",
    channelType: "email",
    target: "eng@myapp.com",
    monitorName: "Database Server",
    message: "Response time 340ms exceeds 300ms threshold",
    sentAt: "11:06 UTC",
    delivered: true,
  },
  {
    id: "log-5",
    ruleName: "High Latency Warning",
    channelType: "slack",
    target: "#general-alerts",
    monitorName: "Database Server",
    message: "Response time 340ms exceeds 300ms threshold",
    sentAt: "11:06 UTC",
    delivered: true,
  },
  {
    id: "log-6",
    ruleName: "Recovery Notification",
    channelType: "slack",
    target: "#ops-critical",
    monitorName: "Production API",
    message: "Monitor is back UP after 4m 12s downtime",
    sentAt: "Yesterday 09:22",
    delivered: true,
  },
  {
    id: "log-7",
    ruleName: "SSL Expiry Warning",
    channelType: "email",
    target: "eng@myapp.com",
    monitorName: "Marketing Website",
    message: "SSL certificate expires in 45 days",
    sentAt: "2 days ago",
    delivered: true,
  },
  {
    id: "log-8",
    ruleName: "Recovery Notification",
    channelType: "webhook",
    target: "hooks.myapp.com",
    monitorName: "Production API",
    message: "Monitor is back UP",
    sentAt: "Yesterday 09:22",
    delivered: false,
  },
];

// — Helpers —

function channelIcon(type: ChannelType) {
  switch (type) {
    case "email":
      return <Mail className="w-4 h-4 text-blue-400" />;
    case "slack":
      return <MessageSquare className="w-4 h-4 text-purple-400" />;
    case "webhook":
      return <Webhook className="w-4 h-4 text-cyan-400" />;
    case "sms":
      return <Phone className="w-4 h-4 text-emerald-400" />;
    case "pagerduty":
      return <Zap className="w-4 h-4 text-amber-400" />;
  }
}

function channelTypeName(type: ChannelType) {
  switch (type) {
    case "email":
      return "Email";
    case "slack":
      return "Slack";
    case "webhook":
      return "Webhook";
    case "sms":
      return "SMS";
    case "pagerduty":
      return "PagerDuty";
  }
}

// — Page —

export function AlertsPage() {
  const [activeTab, setActiveTab] = useState<"rules" | "channels" | "logs">(
    "rules",
  );

  return (
    <DashboardLayout title="Alerts">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            {
              label: "Active Rules",
              value: rules.filter((r) => r.enabled).length,
              color: "text-blue-400",
              icon: <Bell className="w-4 h-4 text-blue-400" />,
            },
            {
              label: "Channels Configured",
              value: channels.length,
              color: "text-purple-400",
              icon: <Send className="w-4 h-4 text-purple-400" />,
            },
            {
              label: "Alerts Today",
              value: alertLogs.filter(
                (l) =>
                  !l.sentAt.includes("Yesterday") && !l.sentAt.includes("ago"),
              ).length,
              color: "text-amber-400",
              icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
            },
            {
              label: "Delivery Rate",
              value: `${Math.round((alertLogs.filter((l) => l.delivered).length / alertLogs.length) * 100)}%`,
              color: "text-emerald-400",
              icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
            },
          ].map((stat) => (
            <Card key={stat.label} className="border-white/5 bg-white/[0.02]">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-400">
                    {stat.label}
                  </p>
                  <p className={`text-2xl font-bold mt-1 ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.03]">
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between">
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as typeof activeTab)}
          >
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger
                value="rules"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Alert Rules
              </TabsTrigger>
              <TabsTrigger
                value="channels"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Channels
              </TabsTrigger>
              <TabsTrigger
                value="logs"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Alert Log
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {activeTab !== "logs" && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-500 text-white h-9">
                  <Plus className="w-4 h-4 mr-2" />
                  {activeTab === "rules" ? "Create Rule" : "Add Channel"}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0a0f1a] border-white/10 text-white max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {activeTab === "rules"
                      ? "Create Alert Rule"
                      : "Add Notification Channel"}
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    {activeTab === "rules"
                      ? "Define conditions and channels for automatic alert notifications."
                      : "Configure a new notification destination for alerts."}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Name</Label>
                    <Input
                      placeholder={
                        activeTab === "rules"
                          ? "e.g. Critical Downtime Alert"
                          : "e.g. Engineering Slack"
                      }
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                    />
                  </div>
                  {activeTab === "channels" && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-gray-300">Type</Label>
                        <Select>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Select channel type" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-white/10 text-white">
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="slack">Slack</SelectItem>
                            <SelectItem value="webhook">Webhook</SelectItem>
                            <SelectItem value="sms">SMS</SelectItem>
                            <SelectItem value="pagerduty">PagerDuty</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-300">Target</Label>
                        <Input
                          placeholder="e.g. team@example.com"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                        />
                      </div>
                    </>
                  )}
                  {activeTab === "rules" && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-gray-300">Condition</Label>
                        <Select>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Select trigger condition" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-white/10 text-white">
                            <SelectItem value="down">
                              Monitor goes DOWN
                            </SelectItem>
                            <SelectItem value="latency">
                              Response time exceeds threshold
                            </SelectItem>
                            <SelectItem value="ssl">
                              SSL certificate expiring
                            </SelectItem>
                            <SelectItem value="recovery">
                              Monitor recovers
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-300">Cooldown Period</Label>
                        <Select>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Select cooldown" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-white/10 text-white">
                            <SelectItem value="none">No cooldown</SelectItem>
                            <SelectItem value="5">5 minutes</SelectItem>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="1440">24 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </div>
                <DialogFooter>
                  <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-white hover:bg-white/5"
                  >
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                    {activeTab === "rules" ? "Create Rule" : "Add Channel"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Alert Rules Tab */}
        {activeTab === "rules" && (
          <div className="space-y-3">
            {rules.map((rule, index) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <Card
                  className={`border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-colors ${!rule.enabled ? "opacity-60" : ""}`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-medium text-white text-sm">
                            {rule.name}
                          </h3>
                          {rule.enabled ? (
                            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">
                              Active
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20 text-[10px]">
                              Disabled
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mb-3">
                          {rule.description}
                        </p>

                        <div className="flex items-center gap-6 text-xs text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <Zap className="w-3 h-3" />
                            <span className="text-gray-400 font-mono">
                              {rule.condition}
                            </span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            Cooldown: {rule.cooldown}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                          <ArrowRight className="w-3 h-3 text-gray-600" />
                          {rule.channels.map((ch) => (
                            <Badge
                              key={ch}
                              className="bg-white/5 text-gray-300 border-white/10 text-[10px]"
                            >
                              {ch}
                            </Badge>
                          ))}
                        </div>

                        {rule.lastTriggered && (
                          <p className="text-[11px] text-gray-600 mt-2">
                            Triggered {rule.triggeredCount} times · Last:{" "}
                            {rule.lastTriggered}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Switch
                          checked={rule.enabled}
                          className="data-[state=checked]:bg-blue-600"
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-gray-400 hover:text-white hover:bg-white/5 h-8 w-8"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-gray-900 border-white/10 text-white"
                          >
                            <DropdownMenuItem className="hover:bg-white/5 cursor-pointer focus:bg-white/5">
                              <Edit className="w-4 h-4 mr-2" /> Edit Rule
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-white/5 cursor-pointer focus:bg-white/5">
                              <TestTube className="w-4 h-4 mr-2" /> Test Rule
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem className="hover:bg-white/5 cursor-pointer text-red-400 focus:bg-white/5 focus:text-red-400">
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Channels Tab */}
        {activeTab === "channels" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {channels.map((channel, index) => (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <Card
                  className={`border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors ${!channel.enabled ? "opacity-60" : ""}`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/[0.05]">
                          {channelIcon(channel.type)}
                        </div>
                        <div>
                          <h3 className="font-medium text-white text-sm">
                            {channel.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {channelTypeName(channel.type)}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={channel.enabled}
                        className="data-[state=checked]:bg-blue-600"
                      />
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between text-gray-400">
                        <span>Target</span>
                        <span className="text-gray-300 font-mono text-[11px] truncate max-w-[200px]">
                          {channel.target}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-gray-400">
                        <span>Last Triggered</span>
                        <span className="text-gray-300">
                          {channel.lastTriggered || "Never"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-400 hover:text-white hover:bg-white/5 h-7 text-xs flex-1"
                      >
                        <TestTube className="w-3 h-3 mr-1" /> Test
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-400 hover:text-white hover:bg-white/5 h-7 text-xs flex-1"
                      >
                        <Edit className="w-3 h-3 mr-1" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/5 h-7 text-xs"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Alert Logs Tab */}
        {activeTab === "logs" && (
          <Card className="border-white/5 bg-white/[0.02]">
            <CardHeader>
              <CardTitle className="text-white text-base">
                Alert History
              </CardTitle>
              <CardDescription className="text-gray-400">
                Recent alert notifications sent across all channels
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {alertLogs.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="shrink-0">
                      {channelIcon(log.channelType)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">
                          {log.monitorName}
                        </span>
                        <Badge className="bg-white/5 text-gray-400 border-white/10 text-[10px]">
                          {log.ruleName}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {log.message}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-gray-400">{log.sentAt}</p>
                      {log.delivered ? (
                        <span className="text-[10px] text-emerald-400 flex items-center justify-end gap-1 mt-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Delivered
                        </span>
                      ) : (
                        <span className="text-[10px] text-red-400 flex items-center justify-end gap-1 mt-0.5">
                          <XCircle className="w-3 h-3" /> Failed
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
