
import { FC } from "react";
import { ArrowDown, Cat, ChevronDown } from "lucide-react";
import CatCard, { CatType } from "./CatCard";
import IncidentsImageBox from "./IncidentsImageBox";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";

interface CatHeroSectionProps {
  scrollToWaitlist: () => void;
}

const CatHeroSection: FC<CatHeroSectionProps> = ({ scrollToWaitlist }) => {
  const cats: { type: CatType; imagePath: string }[] = [
    { type: "decide", imagePath: "/lovable-uploads/c57ed06e-33f4-48f3-bc66-b411234a323f.png" },
    { type: "do", imagePath: "/lovable-uploads/97448654-99c4-43b1-8d00-e8abf3942a2d.png" },
    { type: "defer", imagePath: "/lovable-uploads/9dfbc446-1a59-4424-ab9c-e2985bd207dd.png" },
    { type: "delegate", imagePath: "/lovable-uploads/9a020476-6444-4e08-9aa5-cd7012c3c5b7.png" },
    { type: "done", imagePath: "/lovable-uploads/d558a30a-4e79-4b02-a23e-bb4d183eb0b5.png" }
  ];

  const isMobile = useIsMobile();

  const scrollToNextSection = () => {
    // Find the next section element
    const nextSection = document.querySelector('.py-24.border-b.border-white\\/5:not(.min-h-screen)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative py-24 border-b border-white/5 min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 pt-12 flex flex-col items-center">
        {/* 1. The master image */}
        <IncidentsImageBox />
        
        {/* 2. "The Alerts Company" header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent animate-fade-up">
          <Cat className="inline-block mr-2 mb-1" /> The Alerts Company <Cat className="inline-block ml-2 mb-1 transform -scale-x-100" />
        </h1>
        
        {/* 3. "Join Waitlist" button */}
        <div className="mb-10">
          <button
            onClick={scrollToWaitlist}
            className="px-12 py-6 text-xl font-medium text-white rounded-2xl shadow-[0_0_30px_rgba(14,165,233,0.3)] bg-gradient-to-r from-primary via-blue-500 to-primary hover:shadow-[0_0_40px_rgba(14,165,233,0.4)] transition-all duration-300 inline-flex items-center gap-2 border-2 border-white/20 hover:border-white/40"
          >
            Join Waitlist
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
        
        {/* 4. Glowing Chevron Down */}
        <div 
          className="mb-20 animate-bounce cursor-pointer" 
          onClick={scrollToNextSection}
          aria-label="Scroll to next section"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              scrollToNextSection();
            }
          }}
        >
          <ChevronDown 
            className="w-10 h-10 text-primary animate-pulse" 
            style={{ 
              filter: 'drop-shadow(0 0 8px rgba(14, 165, 233, 0.7))',
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default CatHeroSection;
