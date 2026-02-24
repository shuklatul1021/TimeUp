import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Bell,
  CreditCard,
  Users,
  Shield,
  Key,
  Trash2,
  Save,
  ChevronRight,
  Plus,
  LogOut,
  Monitor,
  Moon,
  Sun,
  Palette,
  Clock,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Progress } from "../components/ui/progress";

// — Page —

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [showApiKey, setShowApiKey] = useState(false);

  const apiKey = "tu_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6";

  return (
    <DashboardLayout title="Settings">
      <div className="flex gap-6">
        {/* Sidebar Navigation */}
        <nav className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 space-y-1">
            {[
              { id: "general", icon: User, label: "General" },
              { id: "notifications", icon: Bell, label: "Notifications" },
              { id: "api", icon: Key, label: "API Keys" },
              { id: "team", icon: Users, label: "Team" },
              { id: "billing", icon: CreditCard, label: "Billing" },
              { id: "security", icon: Shield, label: "Security" },
              { id: "advanced", icon: Monitor, label: "Advanced" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-600/10 text-blue-400"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Mobile Tab Selector */}
          <div className="lg:hidden">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/10 text-white">
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="notifications">Notifications</SelectItem>
                <SelectItem value="api">API Keys</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* General Settings */}
          {activeTab === "general" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="border-white/5 bg-white/[0.02]">
                <CardHeader>
                  <CardTitle className="text-white text-base">
                    Profile
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your account information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-blue-600 text-white text-xl">
                        AT
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 text-xs"
                      >
                        <Upload className="w-3 h-3 mr-1" /> Upload Photo
                      </Button>
                      <p className="text-xs text-gray-500">
                        JPG, PNG. Max 2MB.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Full Name</Label>
                      <Input
                        defaultValue="Atul Sharma"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">Email Address</Label>
                      <Input
                        defaultValue="atul@myapp.com"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Timezone</Label>
                      <Select defaultValue="utc-5">
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/10 text-white">
                          <SelectItem value="utc-8">
                            Pacific Time (UTC-8)
                          </SelectItem>
                          <SelectItem value="utc-5">
                            Eastern Time (UTC-5)
                          </SelectItem>
                          <SelectItem value="utc+0">UTC</SelectItem>
                          <SelectItem value="utc+1">
                            Central European (UTC+1)
                          </SelectItem>
                          <SelectItem value="utc+5.5">
                            India (UTC+5:30)
                          </SelectItem>
                          <SelectItem value="utc+9">Japan (UTC+9)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">Date Format</Label>
                      <Select defaultValue="mdy">
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/10 text-white">
                          <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                      <Save className="w-4 h-4 mr-2" /> Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Notifications Settings */}
          {activeTab === "notifications" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="border-white/5 bg-white/[0.02]">
                <CardHeader>
                  <CardTitle className="text-white text-base">
                    Notification Preferences
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Choose how and when you want to be notified
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {[
                    {
                      title: "Monitor Down",
                      desc: "Get notified when a monitor goes down",
                      email: true,
                      push: true,
                      slack: true,
                    },
                    {
                      title: "Monitor Recovery",
                      desc: "Notification when a service recovers",
                      email: true,
                      push: false,
                      slack: true,
                    },
                    {
                      title: "High Latency Alert",
                      desc: "Response time exceeds threshold",
                      email: true,
                      push: false,
                      slack: false,
                    },
                    {
                      title: "SSL Expiry Warning",
                      desc: "SSL certificate expiring soon",
                      email: true,
                      push: false,
                      slack: false,
                    },
                    {
                      title: "Weekly Report",
                      desc: "Weekly uptime summary delivered every Monday",
                      email: true,
                      push: false,
                      slack: false,
                    },
                    {
                      title: "New Team Member",
                      desc: "When someone joins your team",
                      email: false,
                      push: false,
                      slack: true,
                    },
                  ].map((pref) => (
                    <div key={pref.title}>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-white">
                            {pref.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {pref.desc}
                          </p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-gray-500" />
                            <Switch
                              checked={pref.email}
                              className="data-[state=checked]:bg-blue-600"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Bell className="w-3.5 h-3.5 text-gray-500" />
                            <Switch
                              checked={pref.push}
                              className="data-[state=checked]:bg-blue-600"
                            />
                          </div>
                        </div>
                      </div>
                      <Separator className="bg-white/5 mt-4" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* API Keys */}
          {activeTab === "api" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="border-white/5 bg-white/[0.02]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white text-base">
                        API Keys
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Manage API keys for programmatic access
                      </CardDescription>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white h-9">
                      <Plus className="w-4 h-4 mr-2" /> Generate Key
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Current API Key */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white">
                          Live API Key
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Created on Jan 15, 2026
                        </p>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-black/20 border border-white/10 rounded-md px-3 py-2 font-mono text-sm text-gray-300">
                        {showApiKey
                          ? apiKey
                          : "tu_live_••••••••••••••••••••••••••••"}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-white hover:bg-white/5 h-9 w-9"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-white hover:bg-white/5 h-9 w-9"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Last used: 2 hours ago</span>
                      <span>·</span>
                      <span>Requests today: 1,247</span>
                    </div>
                  </div>

                  {/* Test Key */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white">
                          Test API Key
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Created on Feb 10, 2026
                        </p>
                      </div>
                      <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
                        Test
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-black/20 border border-white/10 rounded-md px-3 py-2 font-mono text-sm text-gray-300">
                        tu_test_••••••••••••••••••••••••••••
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-white hover:bg-white/5 h-9 w-9"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-white hover:bg-white/5 h-9 w-9"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Last used: Never</span>
                    </div>
                  </div>

                  <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-3 flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-300/80">
                      Keep your API keys secure. Do not share them publicly or
                      commit them to version control. Rotate keys regularly.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Team */}
          {activeTab === "team" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="border-white/5 bg-white/[0.02]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white text-base">
                        Team Members
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Manage who has access to your workspace
                      </CardDescription>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white h-9">
                      <Plus className="w-4 h-4 mr-2" /> Invite Member
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-white/5">
                    {[
                      {
                        name: "Atul Sharma",
                        email: "atul@myapp.com",
                        role: "Owner",
                        avatar: "AT",
                        status: "active",
                      },
                      {
                        name: "Sarah Chen",
                        email: "sarah@myapp.com",
                        role: "Admin",
                        avatar: "SC",
                        status: "active",
                      },
                      {
                        name: "Mike Johnson",
                        email: "mike@myapp.com",
                        role: "Member",
                        avatar: "MJ",
                        status: "active",
                      },
                      {
                        name: "Emily Davis",
                        email: "emily@myapp.com",
                        role: "Member",
                        avatar: "ED",
                        status: "pending",
                      },
                    ].map((member) => (
                      <div
                        key={member.email}
                        className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="w-9 h-9">
                            <AvatarFallback className="bg-blue-600/20 text-blue-400 text-xs">
                              {member.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {member.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {member.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {member.status === "pending" && (
                            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-[10px]">
                              Pending
                            </Badge>
                          )}
                          <Select defaultValue={member.role.toLowerCase()}>
                            <SelectTrigger className="bg-white/5 border-white/10 text-white w-28 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-white/10 text-white">
                              <SelectItem value="owner">Owner</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="member">Member</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                          {member.role !== "Owner" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-gray-400 hover:text-red-400 hover:bg-red-500/5 h-8 w-8"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Billing */}
          {activeTab === "billing" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="border-white/5 bg-white/[0.02]">
                <CardHeader>
                  <CardTitle className="text-white text-base">
                    Current Plan
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your subscription and billing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-blue-600/5 border border-blue-600/10 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">
                          Pro Plan
                        </h3>
                        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                          Current
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        $29/month · Billed monthly
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                    >
                      Upgrade Plan
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
                      <p className="text-xs text-gray-500">Monitors Used</p>
                      <p className="text-xl font-bold text-white mt-1">
                        8 / 50
                      </p>
                      <Progress
                        value={16}
                        className="mt-2 h-1.5 bg-white/5 [&>div]:bg-blue-500"
                      />
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
                      <p className="text-xs text-gray-500">Team Members</p>
                      <p className="text-xl font-bold text-white mt-1">
                        4 / 10
                      </p>
                      <Progress
                        value={40}
                        className="mt-2 h-1.5 bg-white/5 [&>div]:bg-purple-500"
                      />
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
                      <p className="text-xs text-gray-500">Status Pages</p>
                      <p className="text-xl font-bold text-white mt-1">3 / 5</p>
                      <Progress
                        value={60}
                        className="mt-2 h-1.5 bg-white/5 [&>div]:bg-emerald-500"
                      />
                    </div>
                  </div>

                  <Separator className="bg-white/5" />

                  <div>
                    <h4 className="text-sm font-medium text-white mb-3">
                      Billing History
                    </h4>
                    <div className="space-y-2">
                      {[
                        {
                          date: "Feb 1, 2026",
                          amount: "$29.00",
                          status: "Paid",
                        },
                        {
                          date: "Jan 1, 2026",
                          amount: "$29.00",
                          status: "Paid",
                        },
                        {
                          date: "Dec 1, 2025",
                          amount: "$29.00",
                          status: "Paid",
                        },
                      ].map((invoice) => (
                        <div
                          key={invoice.date}
                          className="flex items-center justify-between py-2 text-sm"
                        >
                          <span className="text-gray-300">{invoice.date}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-white font-medium">
                              {invoice.amount}
                            </span>
                            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">
                              {invoice.status}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-white hover:bg-white/5 h-7 text-xs"
                            >
                              <Download className="w-3 h-3 mr-1" /> Invoice
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="border-white/5 bg-white/[0.02]">
                <CardHeader>
                  <CardTitle className="text-white text-base">
                    Password
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Current Password</Label>
                    <Input
                      type="password"
                      className="bg-white/5 border-white/10 text-white max-w-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">New Password</Label>
                    <Input
                      type="password"
                      className="bg-white/5 border-white/10 text-white max-w-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">
                      Confirm New Password
                    </Label>
                    <Input
                      type="password"
                      className="bg-white/5 border-white/10 text-white max-w-md"
                    />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-white/5 bg-white/[0.02]">
                <CardHeader>
                  <CardTitle className="text-white text-base">
                    Two-Factor Authentication
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Add an extra layer of security to your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <div>
                        <p className="text-sm font-medium text-white">
                          2FA is enabled
                        </p>
                        <p className="text-xs text-gray-400">
                          Using authenticator app
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white hover:bg-white/5 text-xs"
                    >
                      Reconfigure
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/5 bg-white/[0.02]">
                <CardHeader>
                  <CardTitle className="text-white text-base">
                    Active Sessions
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your logged-in devices
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    {
                      device: "Chrome on Windows",
                      location: "New York, US",
                      current: true,
                      lastActive: "Now",
                    },
                    {
                      device: "Firefox on macOS",
                      location: "San Francisco, US",
                      current: false,
                      lastActive: "2 hours ago",
                    },
                    {
                      device: "Mobile App (iOS)",
                      location: "New York, US",
                      current: false,
                      lastActive: "1 day ago",
                    },
                  ].map((session) => (
                    <div
                      key={session.device}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-3">
                        <Monitor className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-white">
                              {session.device}
                            </p>
                            {session.current && (
                              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">
                                Current
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">
                            {session.location} · {session.lastActive}
                          </p>
                        </div>
                      </div>
                      {!session.current && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/5 text-xs h-7"
                        >
                          Revoke
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-red-500/10 bg-red-500/[0.02]">
                <CardHeader>
                  <CardTitle className="text-red-400 text-base">
                    Danger Zone
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Irreversible actions for your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">
                        Export Data
                      </p>
                      <p className="text-xs text-gray-500">
                        Download all your monitoring data
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white hover:bg-white/5 text-xs"
                    >
                      <Download className="w-3 h-3 mr-1" /> Export
                    </Button>
                  </div>
                  <Separator className="bg-white/5" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-400">
                        Delete Account
                      </p>
                      <p className="text-xs text-gray-500">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/5 text-xs"
                    >
                      <Trash2 className="w-3 h-3 mr-1" /> Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Advanced */}
          {activeTab === "advanced" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="border-white/5 bg-white/[0.02]">
                <CardHeader>
                  <CardTitle className="text-white text-base">
                    Default Monitor Settings
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Default configuration for new monitors
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">
                        Default Check Interval
                      </Label>
                      <Select defaultValue="30">
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/10 text-white">
                          <SelectItem value="15">Every 15 seconds</SelectItem>
                          <SelectItem value="30">Every 30 seconds</SelectItem>
                          <SelectItem value="60">Every 1 minute</SelectItem>
                          <SelectItem value="300">Every 5 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">Default Region</Label>
                      <Select defaultValue="us-east">
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/10 text-white">
                          <SelectItem value="us-east">US East</SelectItem>
                          <SelectItem value="us-west">US West</SelectItem>
                          <SelectItem value="eu-west">EU West</SelectItem>
                          <SelectItem value="global">
                            Global (Multi-region)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">
                        Response Timeout (ms)
                      </Label>
                      <Input
                        defaultValue="5000"
                        type="number"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">
                        Latency Threshold (ms)
                      </Label>
                      <Input
                        defaultValue="300"
                        type="number"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                      <Save className="w-4 h-4 mr-2" /> Save Defaults
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/5 bg-white/[0.02]">
                <CardHeader>
                  <CardTitle className="text-white text-base">
                    Data Retention
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure how long monitoring data is kept
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white">Response Time Data</p>
                      <p className="text-xs text-gray-500">
                        Detailed per-check response time logs
                      </p>
                    </div>
                    <Select defaultValue="90">
                      <SelectTrigger className="bg-white/5 border-white/10 text-white w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/10 text-white">
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator className="bg-white/5" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white">Incident History</p>
                      <p className="text-xs text-gray-500">
                        Past incident records and timelines
                      </p>
                    </div>
                    <Select defaultValue="365">
                      <SelectTrigger className="bg-white/5 border-white/10 text-white w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/10 text-white">
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="forever">Forever</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator className="bg-white/5" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white">Alert Logs</p>
                      <p className="text-xs text-gray-500">
                        Notification delivery history
                      </p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="bg-white/5 border-white/10 text-white w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/10 text-white">
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
