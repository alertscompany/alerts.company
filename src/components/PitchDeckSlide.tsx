
import React from 'react';
import { cn } from '@/lib/utils';

interface PitchDeckSlideProps {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  visual?: React.ReactNode;
  date?: string;
  slideNumber?: number;
}

export const PitchDeckSlide: React.FC<PitchDeckSlideProps> = ({
  title,
  subtitle,
  content,
  visual,
  date,
  slideNumber,
}) => {
  return (
    <div className="h-[calc(100vh-8rem)] p-8 bg-gradient-to-br from-[#1A1F2C] to-[#403E43] rounded-xl shadow-xl flex flex-col">
      <div className="mb-8">
        {date && (
          <p className="text-sm text-gray-400 mb-2">{date}</p>
        )}
        <h2 className={cn(
          "text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r",
          "from-[#9b87f5] to-[#1EAEDB]"
        )}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-xl mt-2 text-gray-300">{subtitle}</p>
        )}
      </div>

      <div className="flex-1 flex gap-8">
        <div className="flex-1 space-y-4 overflow-y-auto">
          {content}
        </div>
        {visual && (
          <div className="flex-1">
            {visual}
          </div>
        )}
      </div>

      {slideNumber && (
        <div className="absolute bottom-4 right-4 text-sm text-gray-400">
          {slideNumber}/13
        </div>
      )}
    </div>
  );
};
