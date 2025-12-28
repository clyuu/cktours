import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <Link to={`/destination/${destination.id}`} className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer h-[400px] block">
      <img
        src={destination.imageUrl}
        alt={destination.title}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
      
      <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <span className="inline-block px-3 py-1 bg-lanka-gold/90 text-lanka-green text-xs font-bold uppercase tracking-wider rounded-full mb-3">
          {destination.category}
        </span>
        <h3 className="font-serif text-2xl font-bold mb-1">{destination.title}</h3>
        <div className="flex items-center text-white/80 text-sm mb-4">
          <MapPin size={14} className="mr-1" />
          {destination.location}
        </div>
        <p className="text-sm text-white/70 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {destination.description}
        </p>
        <div className="flex items-center text-lanka-gold text-sm font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
          Discover <ArrowRight size={16} className="ml-2" />
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;