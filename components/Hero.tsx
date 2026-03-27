import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Images/hero.jpg" 
          alt="C&K Tours - Sri Lanka"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl mx-auto">
        <span className="block text-lanka-gold font-medium tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4 uppercase text-xs sm:text-sm md:text-base animate-fade-in-up">
          Welcome to paradise
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-lg">
          So Sri Lanka
        </h1>
        <p className="text-sm sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-10 max-w-2xl mx-auto font-light leading-relaxed px-2">
          Discover an island of golden beaches, rising waves, misty mountains, mighty elephants, stealthy leopards, giant whales, and a majestic past.
        </p>
        
        <div className="flex justify-center">
            <a href="#destinations" className="px-5 sm:px-6 py-2.5 sm:py-3 bg-lanka-gold text-lanka-green font-bold text-[11px] sm:text-xs uppercase tracking-widest hover:bg-white transition-colors duration-300 rounded-full">
            Explore Destinations
            </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/70">
        <FaChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
      </div>
    </section>
  );
};

export default Hero;