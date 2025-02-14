
import { Bell, Brain, Zap, Users, Shield, LineChart, ArrowDown } from "lucide-react";
import RainingLetters from "@/components/RainingLetters";
import WaitlistForm from "@/components/WaitlistForm";

const Index = () => {
  const scrollToWaitlist = () => {
    const waitlistElement = document.getElementById('waitlist');
    waitlistElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black/95 to-black/90 text-foreground font-inter">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-xl z-50 border-b border-white/5">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bell className="w-6 h-6 text-primary" />
            <span className="font-semibold text-lg">The Alerts Company</span>
          </div>
        </div>
      </nav>

      {/* Hero Section with RainingLetters and CTA */}
      <div className="relative min-h-[90vh] flex items-center justify-center">
        <RainingLetters showForm={false} />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center max-w-4xl leading-tight mb-8 bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent">
            Alert is the single most thing we rely on for all Observability.
          </h1>
          <button
            onClick={scrollToWaitlist}
            className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-medium inline-flex items-center gap-2 transition-all hover:scale-105 shadow-lg shadow-primary/20"
          >
            Join Waitlist
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <Bell className="w-6 h-6" />,
                title: "Better Doability",
                description: "Make informed decisions with rich context: frequency, resolution time, auto-resolve patterns, and historical data.",
              },
              {
                icon: <Brain className="w-6 h-6" />,
                title: "Smart Deferability",
                description: "Never forget deferred alerts. Our system intelligently reminds you of critical items and long-ignored issues.",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Intelligent Decisioning",
                description: "Leverage AI-powered insights combined with your company's unique context and past resolutions.",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Seamless Delegation",
                description: "Integrate with your incident management workflow. Get automatic reports and insights for better planning.",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Alert Hygiene",
                description: "Let our system perfect your alerts. Leverage industry best practices and automated enrichment.",
              },
              {
                icon: <LineChart className="w-6 h-6" />,
                title: "Measurable Impact",
                description: "Improve key metrics including MTTA, MTBI, and MDT. Focus on resolution while we handle everything else.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-white/5 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 animate-fade-up hover:bg-white/[0.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white/90">{feature.title}</h3>
                <p className="text-lg text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 border-t border-white/5 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent">Transform Your Alert Management</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                metric: "MTTA",
                title: "Improved Mean Time to Acknowledge",
                description: "Reduce response times with smart prioritization",
              },
              {
                metric: "MTBI",
                title: "Increased Mean Time Between Incidents",
                description: "Prevent alert fatigue with intelligent grouping",
              },
              {
                metric: "MDT",
                title: "Reduced Mean Downtime",
                description: "Resolve issues faster with contextual insights",
              },
            ].map((metric, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-white/5 text-center animate-fade-up hover:border-primary/30 transition-all duration-300 hover:bg-white/[0.02] backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl font-bold text-primary mb-4 group-hover:scale-110 transition-transform">{metric.metric}</div>
                <h3 className="text-xl font-semibold mb-4 text-white/90">{metric.title}</h3>
                <p className="text-lg text-white/60 leading-relaxed">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-24 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent">Ready to Transform Your Alert Management?</h2>
          <div className="max-w-md mx-auto backdrop-blur-sm p-8 rounded-2xl border border-white/5">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="container mx-auto px-4 text-center text-white/40">
          <p>&copy; {currentYear} The Alerts Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
