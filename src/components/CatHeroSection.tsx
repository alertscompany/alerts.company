
import { FC } from "react";
import { ArrowDown, ArrowRight, Cat } from "lucide-react";
import CatCard, { CatType } from "./CatCard";
import IncidentsImageBox from "./IncidentsImageBox";

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

  return (
    <div className="relative py-24 border-b border-white/5 min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 pt-12">
        {/* Add the incidents image box above the title */}
        <IncidentsImageBox />
        
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent animate-fade-up">
          <Cat className="inline-block mr-2 mb-1" /> The Alerts Company <Cat className="inline-block ml-2 mb-1 transform -scale-x-100" />
        </h1>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-6xl mx-auto mb-16">
          {cats.map((cat, index) => (
            <div key={cat.type} className="flex items-center">
              <CatCard 
                type={cat.type}
                imagePath={cat.imagePath}
                className="w-[180px] h-[220px]"
              />
              {index < cats.length - 1 && (
                <div className="hidden md:flex items-center justify-center mx-2">
                  <ArrowRight className="w-6 h-6 text-primary animate-pulse" />
                </div>
              )}
              {index < cats.length - 1 && (
                <div className="flex md:hidden items-center justify-center my-2">
                  <ArrowDown className="w-6 h-6 text-primary animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <button
          onClick={scrollToWaitlist}
          className="px-12 py-6 text-xl font-medium text-white rounded-2xl shadow-[0_0_30px_rgba(14,165,233,0.3)] bg-gradient-to-r from-primary via-blue-500 to-primary hover:shadow-[0_0_40px_rgba(14,165,233,0.4)] transition-all duration-300 inline-flex items-center gap-2 border-2 border-white/20 hover:border-white/40"
        >
          Join Waitlist
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CatHeroSection;
