
import { Bell, Brain, Zap, Users, Shield, LineChart } from "lucide-react";

const features = [
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
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-muted border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="space-y-2 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent animate-fade-up leading-relaxed">
              Alerts Matter. People Matter More.
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-white/90 animate-fade-up leading-relaxed">
              Ditch the Noise. Fight Fatigue. Focus on What's Critical.
            </h3>
          </div>
          <div className="mx-auto max-w-[65ch] text-center leading-7 text-[#D9DCD6] md:text-xl mb-10 md:mb-20 space-y-8">
            <p>
              We build great software trusting our alerts—until we don't.
              <br />
              We respond too late, chase false alarms, and drown in a flood of notifications.
              <br />Critical issues slip by, and every RCA ends with: <i>"We need <strong>Better Alerts</strong>."</i>
            </p>
            <p>
              <strong>Alerts are broken.</strong> The tools to manage them? Stuck in the past.
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
          {features.map((feature, index) => (
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
  );
};

export default FeaturesSection;
