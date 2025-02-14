
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
    <div className="min-h-screen bg-background text-foreground font-inter">
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
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <button
            onClick={scrollToWaitlist}
            className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium inline-flex items-center gap-2 transition-all animate-bounce shadow-lg shadow-primary/20"
          >
            Join Waitlist
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Features Overview */}
      <section className="py-24 border-b border-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-20 max-w-4xl mx-auto leading-tight">
            Alert management reimagined for modern teams.
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "DevOps & SRE Teams",
                description: "Transform your alert handling with intelligent prioritization and automated enrichment.",
              },
              {
                title: "Engineering Leaders",
                description: "Get insights into team performance and incident patterns to make data-driven decisions.",
              },
              {
                title: "Product Teams",
                description: "Understand the impact of deployments on system stability and user experience.",
              },
              {
                title: "Support Teams",
                description: "Respond faster with rich context and automated incident classification.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-secondary/50 border border-white/5 hover:border-primary/30 transition-all"
              >
                <h3 className="text-2xl font-semibold mb-4 text-white">{item.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Details */}
      <section className="py-24 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              Building the future of alert management
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Our platform combines intelligent automation with human-centric design to revolutionize how teams handle alerts and incidents.
            </p>
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
                className="p-8 bg-secondary/50 rounded-2xl border border-white/5 hover:border-primary/30 transition-all"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 border-b border-white/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">Transform Your Alert Management</h2>
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
                className="p-8 rounded-2xl bg-secondary/50 border border-white/5 text-center hover:border-primary/30 transition-all"
              >
                <div className="text-4xl font-bold text-primary mb-4">{metric.metric}</div>
                <h3 className="text-xl font-semibold mb-4">{metric.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-24 border-b border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Alert Management?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join the waitlist to be among the first to experience the future of alert management.
          </p>
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
