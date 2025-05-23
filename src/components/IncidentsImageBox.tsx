
import { FC } from "react";

const IncidentsImageBox: FC = () => {
  return (
    <div className="max-w-md mx-auto mb-8 relative">
      <div className="rounded-xl overflow-hidden border-4 border-primary shadow-[0_0_30px_rgba(14,165,233,0.4)] transform transition-all duration-300 hover:scale-105">
        <img 
          src="/lovable-uploads/a259e240-c65a-44c9-a009-4ac4dc8d1a1f.png" 
          alt="Incidents Are Inevitable - Cat comic" 
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default IncidentsImageBox;
