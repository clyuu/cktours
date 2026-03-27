import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaArrowRight, FaBoxOpen } from 'react-icons/fa';
import { Destination } from '../types';
import { TOUR_PACKAGE_NAMES } from '../constants';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const tourPackageName = destination.tourPackage ? TOUR_PACKAGE_NAMES[destination.tourPackage] : null;

  return (
    <Link to={`/destination/${destination.id}`} className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer h-[280px] sm:h-[350px] md:h-[400px] block">
      <img
        src={destination.imageUrl}
        alt={destination.title}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
      
      <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
          <span className="inline-block px-2 md:px-3 py-1 bg-lanka-gold/90 text-lanka-green text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full">
            {destination.category}
          </span>
          {tourPackageName && (
            <span className="inline-flex items-center gap-1 px-2 md:px-3 py-1 bg-lanka-green/90 text-white text-[10px] md:text-xs font-bold rounded-full">
              <FaBoxOpen className="w-2 h-2 md:w-3 md:h-3" />
              <span className="hidden sm:inline">{tourPackageName}</span>
              <span className="sm:hidden">Tour</span>
            </span>
          )}
        </div>
        <h3 className="font-serif text-lg md:text-2xl font-bold mb-1">{destination.title}</h3>
        <div className="flex items-center text-white/80 text-xs md:text-sm mb-2 md:mb-4">
          <FaMapMarkerAlt className="w-3 h-3 mr-1" />
          {destination.location}
        </div>
        <p className="text-xs md:text-sm text-white/70 line-clamp-2 mb-2 md:mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 hidden sm:block">
          {destination.description}
        </p>
        <div className="flex items-center text-lanka-gold text-xs md:text-sm font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
          Book Tour <FaArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;