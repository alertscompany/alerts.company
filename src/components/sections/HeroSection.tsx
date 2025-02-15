
import { ArrowDown } from "lucide-react";
import RainingLetters from "@/components/RainingLetters";

interface HeroSectionProps {
  onWaitlistClick: () => void;
}

const HeroSection = ({ onWaitlistClick }: HeroSectionProps) => {
  return (
    <div className="h-[50vh] relative border-b border-white/5">
      <RainingLetters showForm={false} />
      <div className="absolute inset-0 flex flex-col justify-center items-center z-30">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            The Simplest solution to Alerts is here.
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-white/90">
            Ditch the Noise. Fight Fatigue. Focus on What's Critical.
          </h2>
        </div>
        <button
          onClick={onWaitlistClick}
          className="px-12 py-6 text-xl font-medium text-white rounded-2xl shadow-[0_0_30px_rgba(14,165,233,0.3)] bg-gradient-to-r from-primary via-blue-500 to-primary hover:shadow-[0_0_40px_rgba(14,165,233,0.4)] transition-all duration-300 inline-flex items-center gap-2 border-2 border-white/20 hover:border-white/40"
        >
          Join Waitlist
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
