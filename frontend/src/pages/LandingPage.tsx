import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  Globe,
  Zap,
  ArrowRight,
  Clock,
  Server,
  Check,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-blue-500/30 overflow-x-hidden font-sans">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-black"></div>
        <div className="absolute top-[-10%] left-[20%] w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed w-full z-50 border-b border-white/5 bg-[#030712]/60 backdrop-blur-xl supports-[backdrop-filter]:bg-[#030712]/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
            <div className="p-1.5 bg-blue-600 rounded-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span>TimeUp</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-white transition-colors"
            >
              How it Works
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <Link to="/auth" className="text-white hover:text-blue-400">
              Log in
            </Link>
            <Link to="/signup">
              <Button
                variant="secondary"
                className="font-semibold shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Start Monitoring
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-b border-white/10 bg-[#030712]"
            >
              <div className="flex flex-col p-6 gap-4 text-gray-300">
                <a href="#features" onClick={() => setIsMenuOpen(false)}>
                  Features
                </a>
                <a href="#pricing" onClick={() => setIsMenuOpen(false)}>
                  Pricing
                </a>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-blue-400"
                >
                  Sign up
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <Badge
              variant="outline"
              className="mb-8 border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 px-4 py-1.5 text-sm font-medium rounded-full cursor-pointer transition-colors"
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              v2.0 is live: Global Latency Updates
            </Badge>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white leading-[1.1]">
              Downtime is inevitable. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Being the last to know isn't.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Enterprise-grade uptime monitoring for your website and APIs. Get
              alerted instantly via SMS, Email, or Slack before your customers
              notice.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20 group"
                >
                  Start Monitoring Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-lg border-white/10 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm"
              >
                View Live Demo
              </Button>
            </div>
          </FadeIn>

          <FadeIn
            delay={0.4}
            className="mt-8 text-sm text-gray-500 flex items-center justify-center gap-6"
          >
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-500" /> No credit card
              required
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-500" /> 14-day free trial
            </span>
          </FadeIn>

          {/* Dashboard Preview Mockup with Tilt Effect */}
          <FadeIn delay={0.6}>
            <div className="mt-20 relative rounded-xl border border-white/10 bg-gray-900/50 p-2 shadow-2xl backdrop-blur-sm group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent z-10" />
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <img
                src="https://placehold.co/1200x675/0f172a/FFF?text=Better+Up+Time+Dashboard"
                alt="Dashboard Preview"
                className="rounded-lg opacity-90 w-full relative z-20"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500 mb-8 font-medium">
            TRUSTED BY ENGINEERING TEAMS AT
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {["Acme Corp", "GlobalBank", "Nebula", "DevScale", "TechFlow"].map(
              (brand) => (
                <span
                  key={brand}
                  className="text-xl md:text-2xl font-bold text-white cursor-default hover:text-blue-400 transition-colors"
                >
                  {brand}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Everything you need to stay online
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              We provide enterprise-grade monitoring tools without the
              enterprise-grade complexity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Globe className="w-6 h-6 text-blue-400" />}
              title="Global Monitoring Checks"
              description="We verify your uptime from 14 different regions across 5 continents every 30 seconds."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-6 h-6 text-emerald-400" />}
              title="SSL Certificate Monitoring"
              description="Get notified 30 days before your SSL certificate expires. Never let a cert lapse again."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-amber-400" />}
              title="Instant Multi-Channel Alerts"
              description="Receive alerts via SMS, Slack, Discord, Microsoft Teams, or Email within seconds."
            />
            <FeatureCard
              icon={<Clock className="w-6 h-6 text-purple-400" />}
              title="Response Time Analytics"
              description="Detailed charts showing your API and website latency over time to identify bottlenecks."
            />
            <FeatureCard
              icon={<Server className="w-6 h-6 text-rose-400" />}
              title="Port & Ping Monitoring"
              description="Monitor specific ports (TCP/UDP) for email servers, databases, and gaming servers."
            />
            <FeatureCard
              icon={<Activity className="w-6 h-6 text-cyan-400" />}
              title="Beautiful Status Pages"
              description="Create a beautiful public status page for your users in less than 30 seconds."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Setup in minutes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 border-t border-dashed border-white/20"></div>

            {[
              {
                step: "01",
                title: "Add your resource",
                desc: "Enter your URL, IP, or Port you want to monitor.",
              },
              {
                step: "02",
                title: "Config Alerts",
                desc: "Choose who gets notified and how (Slack, SMS, etc.).",
              },
              {
                step: "03",
                title: "Sleep easy",
                desc: "We monitor 24/7 and alert you only when necessary.",
              },
            ].map((item, i) => (
              <FadeIn delay={i * 0.2} key={i}>
                <div className="relative flex flex-col items-center text-center z-10">
                  <div className="w-16 h-16 rounded-2xl bg-[#0B1121] border border-blue-500/30 flex items-center justify-center text-xl font-bold text-blue-400 mb-6 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 max-w-xs">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-gray-400 text-lg">
              Start for free, upgrade as you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <PricingCard
              title="Hobby"
              price="$0"
              description="Perfect for side projects."
              features={[
                "5 Monitors",
                "3-minute checks",
                "Email alerts",
                "1 Status Page",
              ]}
            />

            {/* Pro Tier - Highlighted */}
            <PricingCard
              title="Pro"
              price="$29"
              description="For serious businesses."
              features={[
                "50 Monitors",
                "30-second checks",
                "SMS & Voice alerts",
                "5 Status Pages",
                "SSL Monitoring",
              ]}
              isPopular
            />

            {/* Business Tier */}
            <PricingCard
              title="Business"
              price="$99"
              description="For large teams."
              features={[
                "200 Monitors",
                "30-second checks",
                "Unlimited integrations",
                "Private Status Pages",
                "API Access",
              ]}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border-white/10">
            <AccordionTrigger className="text-lg hover:text-blue-400">
              How do alerts work?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              We send alerts via email, SMS, or webhook integrations like Slack
              and Discord. You can configure routing rules based on severity.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-white/10">
            <AccordionTrigger className="text-lg hover:text-blue-400">
              {" "}
              Can I monitor private servers?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              Yes, using our installable agent, you can monitor internal
              services behind firewalls without exposing them to the public
              internet.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-white/10">
            <AccordionTrigger className="text-lg hover:text-blue-400">
              Is there a limit on history?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              Free plans retain history for 30 days. Paid plans include up to 2
              years of granular historical data for reporting.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-b from-blue-900/20 to-blue-900/5 border border-blue-500/20 rounded-3xl p-12 md:p-20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-all duration-1000" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] group-hover:bg-cyan-500/20 transition-all duration-1000" />

          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">
            Ready to improve your uptime?
          </h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto text-lg relative z-10">
            Join 10,000+ developers who sleep better at night knowing
            TimeUp is watching their infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link to="/signup">
              <Button
                size="lg"
                className="h-14 px-8 text-lg bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Get Started for Free
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-lg border-white/20 text-white hover:bg-white/5 backdrop-blur-sm"
            >
              Talk to Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-[#02050e] text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-blue-600 rounded">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-200 text-lg">
                TimeUp
              </span>
            </div>
            <p>
              Monitoring the web, one ping at a time. Built for developers, by
              developers.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Status Page
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
          <p>© 2024 Better Up Time Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {/* Social icons placeholders */}
            <div className="w-5 h-5 bg-white/10 rounded-full hover:bg-blue-500 transition-colors cursor-pointer"></div>
            <div className="w-5 h-5 bg-white/10 rounded-full hover:bg-blue-500 transition-colors cursor-pointer"></div>
            <div className="w-5 h-5 bg-white/10 rounded-full hover:bg-blue-500 transition-colors cursor-pointer"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <FadeIn>
      <Card className="h-full bg-white/[0.03] border-white/5 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all duration-300 group">
        <CardContent className="p-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-100">{title}</h3>
          <p className="text-gray-400 leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </FadeIn>
  );
}

function PricingCard({
  title,
  price,
  description,
  features,
  isPopular = false,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}) {
  return (
    <FadeIn className="h-full">
      <Card
        className={`h-full relative overflow-visible border transition-all flex flex-col ${isPopular ? "border-blue-500 bg-blue-500/5" : "border-white/10 bg-white/[0.02]"} hover:border-blue-500/30`}
      >
        {isPopular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-[0_0_15px_rgba(59,130,246,0.4)] z-20">
            Most Popular
          </div>
        )}
        <CardContent className="p-8 flex flex-col h-full">
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-300 mb-2">{title}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">{price}</span>
              <span className="text-gray-500">/month</span>
            </div>
            <p className="text-gray-400 mt-4 text-sm">{description}</p>
          </div>

          <ul className="space-y-4 mb-8 flex-1">
            {features.map((feat, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-sm text-gray-300"
              >
                <div
                  className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${isPopular ? "bg-blue-500/20 text-blue-400" : "bg-white/10 text-gray-400"}`}
                >
                  <Check className="w-3 h-3" />
                </div>
                {feat}
              </li>
            ))}
          </ul>

          <Button
            className={`w-full py-6 font-bold transition-all ${isPopular ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20" : "bg-white text-black hover:bg-gray-200"}`}
          >
            Choose {title}
          </Button>
        </CardContent>
      </Card>
    </FadeIn>
  );
}
