
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
    <div className="min-h-screen bg-[#1A1F2C] text-white py-8 px-4">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-6xl mx-auto relative"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <PitchDeckSlide {...slide} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-white/10 hover:bg-white/20" />
        <CarouselNext className="right-2 bg-white/10 hover:bg-white/20" />
      </Carousel>
    </div>
  );
};

export default PitchDeck;
