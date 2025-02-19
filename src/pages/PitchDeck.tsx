
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PitchDeckSlide } from '@/components/PitchDeckSlide';
import { slides } from '@/data/pitch-deck-slides';

const PitchDeck: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white py-8">
      <div className="w-full max-w-7xl mx-auto px-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-1">
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="pl-1 basis-full">
                <PitchDeckSlide {...slide} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 bg-white/10 hover:bg-white/20" />
          <CarouselNext className="absolute right-4 bg-white/10 hover:bg-white/20" />
        </Carousel>
      </div>
    </div>
  );
};

export default PitchDeck;
