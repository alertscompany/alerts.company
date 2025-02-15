
const metrics = [
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
];

const MetricsSection = () => {
  return (
    <section className="py-24 border-b border-white/5">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent leading-relaxed pb-2">
          Transform Your Alert Management
        </h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {metrics.map((metric, index) => (
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
  );
};

export default MetricsSection;
