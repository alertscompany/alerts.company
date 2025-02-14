
import { useState } from "react";
import { Bell, ArrowRight, Check, Shield, Zap, Users, LineChart, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Successfully joined waitlist!",
      description: "We'll notify you when we launch.",
    });

    setEmail("");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bell className="w-6 h-6 text-primary" />
            <span className="font-semibold text-lg">The Alerts Company</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-up">
              <div>
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Superhuman for Alerts
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Transform your alert inbox
              </h1>
              <p className="text-lg text-muted-foreground">
                Transform your alert inbox from a source of stress into a streamlined system of action. Do, Defer, Delete, or Delegate with confidence.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-secondary border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-white"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                >
                  {isLoading ? (
                    "Joining..."
                  ) : (
                    <>
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
            <div className="relative animate-float hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl -z-10" />
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                alt="Person using laptop"
                className="rounded-3xl shadow-2xl opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground">
              Built with modern teams in mind, our platform helps you stay on top of what matters.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                className="p-6 bg-secondary rounded-xl border border-white/10 hover:border-primary/30 transition-all animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Transform Your Alert Management</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
                className="p-6 rounded-xl bg-secondary border border-white/10 text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-2xl font-bold text-primary mb-2">{metric.metric}</div>
                <h3 className="text-lg font-semibold mb-2">{metric.title}</h3>
                <p className="text-muted-foreground">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Transform Your Alert Management?</h2>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium inline-flex items-center justify-center gap-2 transition-all"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 The Alerts Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
