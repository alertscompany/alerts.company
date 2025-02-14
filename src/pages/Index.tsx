
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
    <div className="min-h-screen bg-background text-foreground font-plus-jakarta">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bell className="w-6 h-6 text-primary" />
            <span className="font-semibold text-lg">The Alerts Company</span>
          </div>
        </div>
      </nav>

      {/* Hero Section with RainingLetters and CTA */}
      <div className="h-[50vh] relative border-b border-white/5">
        <RainingLetters showForm={false} />
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-30">
          <button
            onClick={scrollToWaitlist}
            className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium inline-flex items-center gap-2 transition-all animate-bounce shadow-lg shadow-primary/20"
          >
            Join Waitlist
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 bg-muted border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent animate-fade-up leading-relaxed pb-2">
              Alert is the single most thing we rely on for all Observability.
            </h2>
            <div className="mx-auto max-w-[65ch] text-center leading-7 text-[#D9DCD6] md:text-xl mb-10 md:mb-20 space-y-8">
              <p>
                We hope to ship great software trusting our alerts. But we often respond late, constantly find them bogus, and always end up more than a dozen to solve. We then miss the problems hiding in daylight, and every RCA ends with "one more Alert".
              </p>
              <p>
                Alerts are boring and our tools to manage alerts have not improved in a decade. Now we believe AI will solve what humans could not. It's a good hope, but hope is not a strategy.
              </p>
              <p className="text-lg md:text-xl font-medium text-primary">
                The Alerts company wants to change this. Same old problem, but modern tools. No promise of AI magic, just smart.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                className="p-8 bg-secondary rounded-xl border border-white/5 hover:border-primary/30 transition-all animate-fade-up hover:shadow-lg hover:shadow-primary/5"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 border-b border-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent leading-relaxed pb-2">
            Transform Your Alert Management
          </h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
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
                className="p-8 rounded-xl bg-secondary border border-white/5 text-center animate-fade-up hover:border-primary/30 transition-all"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl font-bold text-primary mb-4">{metric.metric}</div>
                <h3 className="text-xl font-semibold mb-4">{metric.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-24 bg-muted border-b border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent leading-relaxed pb-2">
            Ready to Transform Your Alert Management?
          </h2>
          <div className="max-w-md mx-auto">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {currentYear} The Alerts Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
