import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Activity, Github, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";

export function AuthPage() {
  const location = useLocation();
  const defaultTab = location.pathname.includes("signup") ? "signup" : "login";

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a] via-[#050505] to-black"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[100px]" />
      </div>

      <div className="mb-8 flex items-center gap-2 z-10">
        <div className="p-2 bg-blue-600 rounded-lg">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold tracking-tight">BetterUpTime</span>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full max-w-md z-10">
        <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
          <TabsTrigger
            value="login"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card className="border-white/10 bg-white/5 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-white">Welcome back</CardTitle>
              <CardDescription className="text-gray-400">
                Enter your credentials to access your dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-login" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email-login"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password-login" className="text-gray-300">
                    Password
                  </Label>
                  <Link
                    to="#"
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password-login"
                  type="password"
                  className="bg-black/20 border-white/10 text-white focus-visible:ring-blue-500"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white">
                Sign In
              </Button>

              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#030712] px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <Button
                  variant="outline"
                  className="bg-white/5 border-white/10 hover:bg-white/10 hover:text-white text-gray-300"
                >
                  <Github className="mr-2 h-4 w-4" /> Github
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/5 border-white/10 hover:bg-white/10 hover:text-white text-gray-300"
                >
                  <Globe className="mr-2 h-4 w-4" /> Google
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card className="border-white/10 bg-white/5 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-white">
                Create an account
              </CardTitle>
              <CardDescription className="text-gray-400">
                Start monitoring your services in seconds.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-gray-300">
                    First name
                  </Label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    className="bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-gray-300">
                    Last name
                  </Label>
                  <Input
                    id="last-name"
                    placeholder="Doe"
                    className="bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-signup" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email-signup"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup" className="text-gray-300">
                  Password
                </Label>
                <Input
                  id="password-signup"
                  type="password"
                  className="bg-black/20 border-white/10 text-white focus-visible:ring-blue-500"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white">
                Create Account
              </Button>
              <p className="text-xs text-center text-gray-500">
                By clicking create account, you agree to our{" "}
                <Link to="#" className="underline hover:text-white">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="underline hover:text-white">
                  Privacy Policy
                </Link>
                .
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
