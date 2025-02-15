import { Bell, X, Brain, Zap, Users, Shield, LineChart, ArrowDown } from "lucide-react";
import RainingLetters from "@/components/RainingLetters";
import WaitlistForm from "@/components/WaitlistForm";

const Index = () => {
  const scrollToWaitlist = () => {
    const waitlistElement = document.getElementById('waitlist');
    waitlistElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <Bell className="w-5 h-5 text-white" />
      <span className="font-light tracking-[0.25em] text-base uppercase">The Alerts Company</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-plus-jakarta">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <Logo />
        </div>
      </nav>

      {/* Hero Section with RainingLetters and CTA */}
      <div className="h-[50vh] relative border-b border-white/5">
        <RainingLetters showForm={false} />
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-30">
          <button
            onClick={scrollToWaitlist}
            className="px-12 py-6 text-xl font-medium text-white rounded-2xl shadow-[0_0_30px_rgba(14,165,233,0.3)] bg-gradient-to-r from-primary via-blue-500 to-primary hover:shadow-[0_0_40px_rgba(14,165,233,0.4)] transition-all duration-300 inline-flex items-center gap-2 border-2 border-white/20 hover:border-white/40"
          >
            Join Waitlist
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 bg-muted border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="space-y-2 mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white/90 animate-fade-up leading-relaxed">
                Ditch the Noise. Fight Fatigue. Focus on What's Critical.
              </h3>
            </div>
            <div className="space-y-2 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent animate-fade-up leading-relaxed">
                Reliable Software requires Reliable Alerts
              </h2>
              <h3 className="text-xl md:text-2xl font-bold text-white/90 animate-fade-up leading-relaxed">
                We build great software trusting our alerts—until we don't.
              </h3>
            </div>
            <div className="mx-auto max-w-[65ch] text-center leading-7 text-[#D9DCD6] md:text-xl mb-10 md:mb-20 space-y-8">
              <p>
                We respond too late, chase false alarms, and drown in a flood of notifications.
                <br />Critical issues slip by, and every RCA ends with: <i>"We need <strong>Better Alerts</strong>."</i>
              </p>
              <p>
                Alerts remain broken and the tools to manage them? Stuck in the past.
                <br />
                AI promises a fix, but hope isn't a strategy.
              </p>
              <p className="text-lg md:text-xl font-medium text-primary">
                The Alerts Company changes this. Same problem, modern tools.
                <br />
                No AI gimmicks—just smart, battle-tested solutions that work.
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
                title: "Better Decisioning",
                description: "Leverage industry insights combined with your company's unique context, and past resolutions.",
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
                description: "Send us your alerts and watch MTTA, MTBI, and MDT improve. Focus on alert resolution while we handle everything else.",
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
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <Logo />
            </div>
            <p className="text-muted-foreground text-sm">&copy; {currentYear} The Alerts Company. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <a
                href="https://twitter.com/alertscompany"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
