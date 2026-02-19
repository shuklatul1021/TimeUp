import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  ShieldCheck, 
  Globe, 
  Zap, 
  ArrowRight,
  Clock,
  Server
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 border-b border-white/5 bg-[#030712]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Activity className="text-blue-500" />
            <span>TimeUp</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <Link to="/login" className="text-white hover:text-blue-400">Log in</Link>
            <Link 
              to="/signup" 
              className="bg-white text-black px-4 py-2 rounded-full hover:bg-blue-50 transition-colors"
            >
              Start Monitoring
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        {/* Background gradient effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -z-10 opacity-50" />
        
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              v2.0 is now live
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              Downtime is inevitable. <br />
              Being the last to know isn't.
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Monitor your website's uptime, SSL certificates, and API performance from 
              locations around the world. Get alerted instantly via SMS, Email, or Slack.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 group">
                Start Monitoring for Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-medium transition-all">
                View Live Demo
              </button>
            </div>
          </FadeIn>

          {/* Dashboard Preview Mockup */}
          <FadeIn delay={0.5}>
            <div className="mt-20 relative rounded-xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent z-10" />
              <img 
                src="https://placehold.co/1200x675/1e1e1e/FFF?text=Dashboard+Preview" 
                alt="Dashboard Preview" 
                className="rounded-lg opacity-90 w-full"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500 mb-8 font-medium">TRUSTED BY ENGINEERING TEAMS AT</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
            {['Acme Corp', 'GlobalBank', 'Nebula', 'DevScale', 'TechFlow'].map((brand) => (
              <span key={brand} className="text-xl font-bold text-white">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to stay online</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide enterprise-grade monitoring tools without the enterprise-grade complexity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Globe className="w-6 h-6 text-blue-400" />}
              title="Global Checks"
              description="We verify your uptime from 14 different regions across 5 continents every 30 seconds."
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-6 h-6 text-emerald-400" />}
              title="SSL Monitoring"
              description="Get notified 30 days before your SSL certificate expires. Never let a cert lapse again."
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-amber-400" />}
              title="Instant Alerts"
              description="Receive alerts via SMS, Slack, Discord, or Email instantly when downtime is detected."
            />
            <FeatureCard 
              icon={<Clock className="w-6 h-6 text-purple-400" />}
              title="Response Time History"
              description="Detailed charts showing your API and website latency over time to identify bottlenecks."
            />
            <FeatureCard 
              icon={<Server className="w-6 h-6 text-rose-400" />}
              title="Port Monitoring"
              description="Monitor specific ports (TCP/UDP) for email servers, databases, and gaming servers."
            />
             <FeatureCard 
              icon={<Activity className="w-6 h-6 text-cyan-400" />}
              title="Status Pages"
              description="Create a beautiful public status page for your users in less than 30 seconds."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-b from-blue-900/20 to-blue-900/5 border border-blue-500/20 rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to improve your uptime?</h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto">
            Join 10,000+ developers who sleep better at night knowing BetterUpTime is watching their infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-colors">
              Get Started for Free
            </button>
             <button className="px-8 py-3 bg-transparent border border-white/20 text-white rounded-lg font-bold hover:bg-white/5 transition-colors">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            <span className="font-semibold text-gray-300">TimeUp</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
          <p>© 2024 TimeUp Time Inc.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all group">
      <div className="w-12 h-12 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-100">{title}</h3>
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}