
import WaitlistForm from "@/components/WaitlistForm";

const WaitlistSection = () => {
  return (
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
  );
};

export default WaitlistSection;
