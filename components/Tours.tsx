import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaUsers, FaCar, FaChevronRight, FaTimes, FaCalendarAlt, FaCheckCircle, FaPhone, FaMagic, FaTree, FaShuttleVan, FaBus } from 'react-icons/fa';
import { getStoredReviews } from '../services/reviewStore';

// Tour Places Data
const TOUR_PLACES = [
  {
    id: 'ravana-falls',
    name: 'Ravana Falls',
    image: '/Images/rawana ella.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1586611292541-b4cd3b7f9f39?w=800&q=80',
    description: 'Ravana Falls is a popular waterfall located near Ella in Sri Lanka. It currently ranks as one of the widest falls in the country. This waterfall measures approximately 25 meters in height and cascades from an oval-shaped concave rock formation.',
    highlights: ['25 meters height', 'Swimming pool at base', 'Connected to Ravana legend', 'Easy access from Ella']
  },
  {
    id: 'nine-arch-bridge',
    name: 'Nine Arch Bridge',
    image: '/Images/Nine Arch Bridge.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1586611292541-b4cd3b7f9f39?w=800&q=80',
    description: 'The Nine Arch Bridge, also called the Bridge in the Sky, is a viaduct bridge in Sri Lanka. It is one of the best examples of colonial-era railway construction in the country. The bridge spans 91 meters at a height of 24 meters.',
    highlights: ['91 meters span', '24 meters height', 'Built without steel', 'UNESCO heritage site candidate']
  },
  {
    id: 'little-adams-peak',
    name: "Little Adam's Peak",
    image: '/Images/punchi siripade.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: "Little Adam's Peak is a mountain in Ella, Sri Lanka. It offers a relatively easy hike with breathtaking views of the surrounding tea plantations and mountains. The peak got its name due to its resemblance to the sacred Adam's Peak.",
    highlights: ['Easy 45-min hike', 'Panoramic views', 'Tea plantation scenery', 'Best at sunrise/sunset']
  },
  {
    id: 'ella-train',
    name: 'Ella to Demodara Train',
    image: '/Images/Ella to Demodara Train.png',
    fallbackImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    description: 'The train journey from Ella to Demodara is considered one of the most scenic railway routes in the world. The train passes through lush green tea estates, misty mountains, and crosses the famous Nine Arch Bridge.',
    highlights: ['Scenic mountain views', 'Crosses Nine Arch Bridge', 'Tea estate panoramas', 'Unique Demodara loop']
  },
  {
    id: 'nanuoya-train',
    name: 'Ella to Nanu Oya Train',
    image: '/Images/Ella to Nanu Oya Train.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    description: 'The train ride from Ella to Nanu Oya takes you through the heart of Sri Lanka\'s hill country. This scenic journey offers stunning views of waterfalls, tea plantations, and colonial-era railway stations.',
    highlights: ['3-hour scenic journey', 'Hill country views', 'Historic railway stations', 'Best views from 2nd class']
  },
  {
    id: 'horton-plains',
    name: "World's End / Horton Plains",
    image: '/Images/horton plans.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: "Horton Plains National Park is a protected area in the central highlands of Sri Lanka. World's End is a sheer precipice with a drop of about 880 meters. On clear days, you can see all the way to the coast.",
    highlights: ["880m World's End cliff", 'Baker\'s Falls', 'Endemic species', 'Cloud forest ecosystem']
  },
  {
    id: 'tea-factory',
    name: 'Tea Factory Visit',
    image: '/Images/tea factory.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800&q=80',
    description: 'Visit a working tea factory to learn about the complete process of Ceylon tea production. From plucking the leaves to the final packaging, witness the art of making world-famous Ceylon tea.',
    highlights: ['Learn tea production', 'Tea tasting session', 'Buy fresh tea', 'Photo opportunities']
  },
  {
    id: 'gregory-lake',
    name: 'Gregory Lake',
    image: '/Images/Lake Gregory.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: 'Gregory Lake is a beautiful lake in Nuwara Eliya, surrounded by lush greenery. Named after Sir William Gregory, a British Governor, it offers boating, horse riding, and scenic walks along its shores.',
    highlights: ['Boat rides available', 'Horse riding', 'Scenic walking paths', 'Colonial architecture nearby']
  },
  {
    id: 'nuwara-eliya-post-office',
    name: 'Nuwara Eliya Post Office',
    image: '/Images/post office.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=800&q=80',
    description: 'The charming red-brick post office of Nuwara Eliya is a beautiful example of colonial architecture. Built in the British era, it\'s still a functioning post office and a popular photo spot.',
    highlights: ['Historic building', 'Still functioning', 'Send postcards home', 'Tudor-style architecture']
  },
  {
    id: 'ambuluwawa',
    name: 'Ambuluwawa Tower',
    image: '/Images/Ambuluwawa.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: 'Ambuluwawa is a biodiversity complex and a multi-religious site on a mountain in Gampola. The spiral tower offers 360-degree panoramic views of the surrounding mountains, forests, and villages.',
    highlights: ['Spiral tower climb', '360° panoramic views', 'Multi-religious site', 'Biodiversity complex']
  },
  {
    id: 'temple-of-tooth',
    name: 'Temple of the Sacred Tooth',
    image: '/Images/Temple of the Tooth.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1568461875185-1b0333334e32?w=800&q=80',
    description: 'Sri Dalada Maligawa, also known as the Temple of the Tooth, is a Buddhist temple in Kandy. It is located in the royal palace complex and houses the relic of the tooth of the Buddha.',
    highlights: ['UNESCO World Heritage', 'Buddha\'s tooth relic', 'Daily puja ceremonies', 'Royal palace complex']
  },
  {
    id: 'view-point',
    name: 'Kandy View Point',
    image: '/Images/viewpoint.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: 'Kandy View Point offers stunning panoramic views of Kandy city, the sacred Kandy Lake, and the surrounding mountains. A perfect spot to appreciate the beauty of Sri Lanka\'s cultural capital.',
    highlights: ['View of Kandy city', 'Kandy Lake visible', 'Best at sunset', 'Easy to access']
  },
  {
    id: 'gem-museum',
    name: 'Gem Museum',
    image: '/Images/gem museum.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80',
    description: 'Sri Lanka is known as the "Gem Island" with a history of gem mining spanning over 2,500 years. The gem museum showcases the variety of precious stones found in Sri Lanka including sapphires, rubies, and cat\'s eyes.',
    highlights: ['Learn gem history', 'See rare gems', 'Mining demonstrations', 'Purchase authentic gems']
  },
  {
    id: 'kandyan-dance',
    name: 'Kandyan Dance Show',
    image: '/Images/Kandy Dance.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1568461875185-1b0333334e32?w=800&q=80',
    description: 'Kandyan dance is a classical dance form that originated in Kandy. The elaborate costumes, rhythmic drumming, and acrobatic movements make it a must-see cultural experience in Sri Lanka.',
    highlights: ['Traditional costumes', 'Fire walking finale', 'Live drumming', 'Cultural experience']
  }
];

// Tour Packages
const TOUR_PACKAGES = [
  {
    id: 'mirissa-ella-short',
    name: 'Mirissa to Ella Tour',
    description: 'A perfect short tour from Mirissa to Ella covering the most iconic attractions including Ravana Falls, Nine Arch Bridge, and scenic train rides.',
    duration: '1-2 Days',
    startLocation: 'Mirissa',
    image: '/Images/Nine Arch Bridge.jpg',
    places: ['ravana-falls', 'nine-arch-bridge', 'little-adams-peak', 'ella-train'],
    pricing: {
      day1: { car: 30000, kdh: 40000, kdhHighRoof: 45000 },
      day2: { car: 38000, kdh: 52000, kdhHighRoof: 62000 }
    },
    highlights: ['Ravana Falls', 'Nine Arch Bridge', 'Little Adam\'s Peak', 'Train Journey'],
    pricingType: 'mirissa'
  },
  {
    id: 'mirissa-ella-extended',
    name: 'Nuwara Eliya Tour',
    description: 'Experience the beautiful hill country of Nuwara Eliya with scenic train rides, Horton Plains, tea factories, and the charming colonial town.',
    duration: '1-2 Days',
    startLocation: 'Mirissa',
    image: '/Images/Nuwara Eliya Tour.jpg',
    places: ['nanuoya-train', 'horton-plains', 'tea-factory', 'gregory-lake', 'nuwara-eliya-post-office'],
    pricing: {
      day1: { car: 30000, kdh: 40000, kdhHighRoof: 45000 },
      day2: { car: 38000, kdh: 52000, kdhHighRoof: 62000 }
    },
    highlights: ['Train to Nanu Oya', 'Horton Plains', 'Tea Factory', 'Gregory Lake', 'Post Office'],
    pricingType: 'mirissa'
  },
  {
    id: 'mirissa-nuwara-tour',
    name: 'Kandy Tour',
    description: 'Explore the cultural capital of Sri Lanka with Ambuluwawa Tower, Temple of the Sacred Tooth, Kandyan Dance, and gem shopping.',
    duration: '1-2 Days',
    startLocation: 'Mirissa',
    image: '/Images/dalada maligawa.jpg',
    places: ['ambuluwawa', 'temple-of-tooth', 'view-point', 'gem-museum', 'kandyan-dance'],
    pricing: {
      day1: { car: 30000, kdh: 40000, kdhHighRoof: 45000 },
      day2: { car: 38000, kdh: 52000, kdhHighRoof: 62000 }
    },
    highlights: ['Ambuluwawa Tower', 'Temple of Tooth', 'View Point', 'Gem Museum', 'Kandyan Dance'],
    pricingType: 'mirissa'
  },
  {
    id: 'custom-full-tour',
    name: 'Full Custom Tour (1-14 Places)',
    description: 'Create your perfect adventure! Choose any or all of our 14 amazing destinations and customize your multi-day tour.',
    duration: '2-14 Days',
    startLocation: 'Mirissa',
    image: '/Images/Full Custom Tour.png',
    places: ['ravana-falls', 'nine-arch-bridge', 'little-adams-peak', 'ella-train', 'nanuoya-train', 'horton-plains', 'tea-factory', 'gregory-lake', 'nuwara-eliya-post-office', 'ambuluwawa', 'temple-of-tooth', 'view-point', 'gem-museum', 'kandyan-dance'],
    pricing: {
      day2: { car: 45000, kdh: 65000, kdhHighRoof: 75000 },
      day3: { car: 50000, kdh: 75000, kdhHighRoof: 90000 },
      day4Plus: { car: 20000, kdh: 25000, kdhHighRoof: 32000 }
    },
    highlights: ['All 14 destinations', 'Flexible days', 'Customize route', 'Best value'],
    pricingType: 'custom'
  }
];

interface ReviewPreview {
  id: number;
  tourId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt?: string;
  visitedAt?: string | null;
}

interface PlaceModalProps {
  place: typeof TOUR_PLACES[0];
  onClose: () => void;
}

const PlaceModal: React.FC<PlaceModalProps> = ({ place, onClose }) => {
  const [imgSrc, setImgSrc] = useState(place.image);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-3 md:p-4" onClick={onClose}>
      <div className="bg-white rounded-xl md:rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="relative h-48 md:h-80">
          <img 
            src={imgSrc} 
            alt={place.name}
            onError={() => setImgSrc(place.fallbackImage)}
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/90 p-1.5 md:p-2 rounded-full hover:bg-white transition-colors"
          >
            <FaTimes className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
            <h2 className="text-white font-serif text-xl md:text-3xl font-bold">{place.name}</h2>
          </div>
        </div>
        
        <div className="p-4 md:p-8">
          <p className="text-slate-600 text-sm md:text-lg leading-relaxed mb-4 md:mb-6">
            {place.description}
          </p>
          
          <h3 className="font-bold text-slate-900 mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base">
            <FaCheckCircle className="w-4 h-4 md:w-5 md:h-5 text-lanka-green" />
            Highlights
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
            {place.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-center gap-2 text-slate-600 text-sm md:text-base">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-lanka-gold rounded-full"></span>
                {highlight}
              </li>
            ))}
          </ul>
          
          <button 
            onClick={onClose}
            className="w-full bg-lanka-green text-white py-2.5 md:py-3 rounded-lg font-bold hover:bg-lanka-green/90 transition-colors text-sm md:text-base"
          >
            Back to Tour
          </button>
        </div>
      </div>
    </div>
  );
};

interface PackageDetailProps {
  pkg: typeof TOUR_PACKAGES[0];
  reviews: ReviewPreview[];
  onClose: () => void;
  onPlaceClick: (place: typeof TOUR_PLACES[0]) => void;
}

const PackageDetail: React.FC<PackageDetailProps> = ({ pkg, reviews, onClose, onPlaceClick }) => {
  const places = pkg.places.map(id => TOUR_PLACES.find(p => p.id === id)).filter(Boolean) as typeof TOUR_PLACES;
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((review) => review.rating === star).length,
  }));
  const maxCount = Math.max(...ratingCounts.map((item) => item.count), 1);
  const averageRating = reviews.length
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const handleWhatsAppBooking = () => {
    const message = `Hello! I'm interested in booking the "${pkg.name}" tour.\n\nPlease provide more details about availability and booking.`;
    window.open(`https://wa.me/94719567600?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-3 md:p-4" onClick={onClose}>
      <div className="bg-white rounded-xl md:rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="relative h-40 md:h-64">
          <img 
            src={pkg.image} 
            alt={pkg.name}
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/90 p-1.5 md:p-2 rounded-full hover:bg-white transition-colors"
          >
            <FaTimes className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
            <div className="flex items-center gap-3 md:gap-4 text-white/80 text-xs md:text-sm mb-1 md:mb-2">
              <span className="flex items-center gap-1"><FaClock className="w-3 h-3 md:w-4 md:h-4" /> {pkg.duration}</span>
              <span className="flex items-center gap-1"><FaMapMarkerAlt className="w-3 h-3 md:w-4 md:h-4" /> From {pkg.startLocation}</span>
            </div>
            <h2 className="text-white font-serif text-xl md:text-3xl font-bold">{pkg.name}</h2>
          </div>
        </div>

        <div className="p-4 md:p-8">
          <p className="text-slate-600 mb-4 md:mb-6 text-sm md:text-base">{pkg.description}</p>

          {/* Pricing Tables */}
          <h3 className="font-bold text-slate-900 text-base md:text-lg mb-3 md:mb-4">Pricing</h3>
          
          {(pkg.pricingType === 'mirissa' || pkg.id === 'mirissa-ella-short' || pkg.id === 'mirissa-ella-extended' || pkg.id === 'mirissa-nuwara-tour') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="bg-lanka-sand/50 rounded-lg md:rounded-xl p-3 md:p-4">
                <h4 className="font-bold text-lanka-green mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                  <FaCalendarAlt className="w-4 h-4 md:w-5 md:h-5" /> Day 1
                </h4>
                <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 flex items-center gap-1.5 md:gap-2"><FaCar className="w-3 h-3 md:w-4 md:h-4 text-lanka-green" /> Car (2-3)</span>
                    <span className="font-bold">Rs. {pkg.pricing.day1?.car.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 flex items-center gap-1.5 md:gap-2"><FaShuttleVan className="w-3 h-3 md:w-4 md:h-4 text-lanka-green" /> KDH (4-6)</span>
                    <span className="font-bold">Rs. {pkg.pricing.day1?.kdh.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 flex items-center gap-1.5 md:gap-2"><FaBus className="w-3 h-3 md:w-4 md:h-4 text-lanka-green" /> High Roof (4-10)</span>
                    <span className="font-bold">Rs. {pkg.pricing.day1?.kdhHighRoof.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="bg-lanka-sand/50 rounded-lg md:rounded-xl p-3 md:p-4">
                <h4 className="font-bold text-lanka-green mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                  <FaCalendarAlt className="w-4 h-4 md:w-5 md:h-5" /> Day 2
                </h4>
                <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 flex items-center gap-1.5 md:gap-2"><FaCar className="w-3 h-3 md:w-4 md:h-4 text-lanka-green" /> Car (2-3)</span>
                    <span className="font-bold">Rs. {pkg.pricing.day2?.car.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 flex items-center gap-1.5 md:gap-2"><FaShuttleVan className="w-3 h-3 md:w-4 md:h-4 text-lanka-green" /> KDH (4-6)</span>
                    <span className="font-bold">Rs. {pkg.pricing.day2?.kdh.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 flex items-center gap-1.5 md:gap-2"><FaBus className="w-3 h-3 md:w-4 md:h-4 text-lanka-green" /> High Roof (4-10)</span>
                    <span className="font-bold">Rs. {pkg.pricing.day2?.kdhHighRoof.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(pkg.pricingType === 'custom' || pkg.id === 'custom-full-tour') && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="bg-lanka-sand/50 rounded-lg md:rounded-xl p-3 md:p-4">
                <h4 className="font-bold text-lanka-green mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                  <FaCalendarAlt className="w-4 h-4 md:w-5 md:h-5" /> 2 Days
                </h4>
                <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5 md:gap-2"><FaCar className="w-3 h-3 text-lanka-green" /> Car</span>
                    <span className="font-bold">Rs. {pkg.pricing.day2?.car.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5 md:gap-2"><FaShuttleVan className="w-3 h-3 text-lanka-green" /> KDH</span>
                    <span className="font-bold">Rs. {pkg.pricing.day2?.kdh.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5 md:gap-2"><FaBus className="w-3 h-3 text-lanka-green" /> High Roof</span>
                    <span className="font-bold">Rs. {pkg.pricing.day2?.kdhHighRoof.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="bg-lanka-sand/50 rounded-lg md:rounded-xl p-3 md:p-4">
                <h4 className="font-bold text-lanka-green mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                  <FaCalendarAlt className="w-4 h-4 md:w-5 md:h-5" /> 3 Days
                </h4>
                <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5 md:gap-2"><FaCar className="w-3 h-3 text-lanka-green" /> Car</span>
                    <span className="font-bold">Rs. {pkg.pricing.day3?.car.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5 md:gap-2"><FaShuttleVan className="w-3 h-3 text-lanka-green" /> KDH</span>
                    <span className="font-bold">Rs. {pkg.pricing.day3?.kdh.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5 md:gap-2"><FaBus className="w-3 h-3 text-lanka-green" /> High Roof</span>
                    <span className="font-bold">Rs. {pkg.pricing.day3?.kdhHighRoof.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="bg-lanka-sand/50 rounded-lg md:rounded-xl p-3 md:p-4">
                <h4 className="font-bold text-lanka-green mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
                  <FaCalendarAlt className="w-4 h-4 md:w-5 md:h-5" /> 4+ Days <span className="text-[10px] md:text-xs text-slate-500">/day</span>
                </h4>
                <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5 md:gap-2"><FaCar className="w-3 h-3 text-lanka-green" /> Car</span>
                    <span className="font-bold">Rs. {pkg.pricing.day4Plus?.car.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5 md:gap-2"><FaShuttleVan className="w-3 h-3 text-lanka-green" /> KDH</span>
                    <span className="font-bold">Rs. {pkg.pricing.day4Plus?.kdh.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5 md:gap-2"><FaBus className="w-3 h-3 text-lanka-green" /> High Roof</span>
                    <span className="font-bold">Rs. {pkg.pricing.day4Plus?.kdhHighRoof.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Places Included */}
          <h3 className="font-bold text-slate-900 text-sm md:text-lg mb-3 md:mb-4">Places Included (Click to learn more)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 mb-6 md:mb-8">
            {places.map((place, idx) => (
              <PlaceCard 
                key={place.id} 
                place={place} 
                index={idx + 1}
                onClick={() => onPlaceClick(place)}
              />
            ))}
          </div>

          <div className="mb-6 md:mb-8 rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-6">
            <h3 className="mb-4 text-base md:text-lg font-bold text-slate-900">Customer Reviews</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <div className="space-y-2.5">
                {ratingCounts.map((item) => {
                  const widthPercent = Math.round((item.count / maxCount) * 100);
                  return (
                    <div key={item.star} className="grid grid-cols-[42px_1fr_30px] items-center gap-2 text-xs md:text-sm">
                      <span className="font-semibold text-slate-700">{item.star}★</span>
                      <div className="h-2.5 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-amber-400 transition-all"
                          style={{ width: `${widthPercent}%` }}
                        />
                      </div>
                      <span className="text-slate-600 text-right">{item.count}</span>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-xl bg-amber-50 p-4 md:p-5 text-center border border-amber-100">
                <p className="text-3xl md:text-4xl font-bold text-amber-500">{averageRating}</p>
                <p className="mt-2 text-lg tracking-[0.18em] text-amber-400">
                  {'★'.repeat(Math.round(Number(averageRating)))}
                  {'☆'.repeat(5 - Math.round(Number(averageRating)))}
                </p>
                <p className="mt-2 text-sm text-slate-600">{reviews.length} Ratings</p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {reviews.length === 0 ? (
                <p className="text-sm text-slate-500">No reviews yet for this package.</p>
              ) : (
                reviews.map((review) => (
                  <article key={review.id} className="border-t border-slate-200 pt-4 first:border-t-0 first:pt-0">
                    <p className="text-amber-400 text-sm mb-1">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                    <p className="font-semibold text-slate-900 text-sm md:text-base mb-1">{review.comment}</p>
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                      <span>{review.customerName}</span>
                      <span>{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}</span>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={handleWhatsAppBooking}
            className="w-full bg-[#25D366] text-white py-3 md:py-4 rounded-xl font-bold text-sm md:text-lg hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2 md:gap-3"
          >
            <FaPhone className="w-4 h-4 md:w-5 md:h-5" />
            Book This Tour via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

interface PlaceCardProps {
  place: typeof TOUR_PLACES[0];
  index: number;
  onClick: () => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, index, onClick }) => {
  const [imgSrc, setImgSrc] = useState(place.image);

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-24">
        <img 
          src={imgSrc}
          alt={place.name}
          onError={() => setImgSrc(place.fallbackImage)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 bg-lanka-green text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
          {index}
        </div>
      </div>
      <div className="p-2">
        <p className="text-sm font-medium text-slate-900 truncate">{place.name}</p>
      </div>
    </div>
  );
};

const Tours: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<typeof TOUR_PACKAGES[0] | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<typeof TOUR_PLACES[0] | null>(null);
  const [reviewsByTour, setReviewsByTour] = useState<Record<string, ReviewPreview[]>>({});

  useEffect(() => {
    try {
      const reviews = getStoredReviews() as ReviewPreview[];
      const grouped = reviews.reduce<Record<string, ReviewPreview[]>>((accumulator, review) => {
        if (!accumulator[review.tourId]) {
          accumulator[review.tourId] = [];
        }

        accumulator[review.tourId].push(review);
        return accumulator;
      }, {});

      setReviewsByTour(grouped);
    } catch (error) {
      console.error('Failed to load review previews:', error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-lanka-sand to-white">
      {/* Hero */}
      <div className="relative h-[35vh] md:h-[40vh] bg-cover bg-center" style={{ backgroundImage: 'url(/Images/Sigiriya.jpg)' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 sm:px-6">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-center">Plan Your Trip</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 text-center max-w-2xl">Discover our curated tour packages and explore the wonders of Sri Lanka</p>
        </div>
      </div>

      {/* Tour Packages */}
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-lanka-green font-bold tracking-widest uppercase text-xs sm:text-sm">Tour Packages</span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-2">Choose Your Adventure</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
          {TOUR_PACKAGES.map(pkg => {
            const tourReviews = reviewsByTour[pkg.id] || [];

            return (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg)}
              className="group cursor-pointer bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-36 sm:h-48">
                <img 
                  src={pkg.image}
                  alt={pkg.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/90 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold text-lanka-green">
                  {pkg.duration}
                </div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="font-serif text-lg md:text-xl font-bold text-slate-900 mb-1 md:mb-2 group-hover:text-lanka-green transition-colors">
                  {pkg.name}
                </h3>
                <p className="text-slate-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">{pkg.description}</p>
                
                <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                  {pkg.highlights.slice(0, 3).map((h, i) => (
                    <span key={i} className="bg-lanka-sand text-slate-700 text-[10px] md:text-xs px-2 py-1 rounded-full">
                      {h}
                    </span>
                  ))}
                  {pkg.highlights.length > 3 && (
                    <span className="bg-lanka-sand text-slate-700 text-[10px] md:text-xs px-2 py-1 rounded-full">
                      +{pkg.highlights.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs md:text-sm text-slate-500">
                    <FaMapMarkerAlt className="w-3 h-3 md:w-4 md:h-4" />
                    {pkg.startLocation}
                  </div>
                  <span className="text-lanka-green font-bold flex items-center gap-1 text-xs md:text-sm">
                    View <FaChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                  </span>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* All Places Section */}
        <div className="mt-12 md:mt-20">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-lanka-green font-bold tracking-widest uppercase text-xs sm:text-sm">Explore</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mt-2">All Tour Destinations</h2>
            <p className="text-slate-600 mt-2 text-sm md:text-base">Click on any place to learn more</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {TOUR_PLACES.map((place, idx) => (
              <PlaceCard 
                key={place.id}
                place={place}
                index={idx + 1}
                onClick={() => setSelectedPlace(place)}
              />
            ))}
          </div>
        </div>

        {/* Custom Tour CTA */}
        <div className="mt-12 md:mt-20 relative overflow-hidden rounded-2xl md:rounded-3xl">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/Images/Mirissa Beach.jpg)' }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-lanka-green/90 via-lanka-green/80 to-teal-800/70 backdrop-blur-sm" />
          
          <div className="relative z-10 p-6 md:p-12 text-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6 md:mb-10">
                <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
                  <FaMagic className="w-3 h-3 md:w-4 md:h-4" /> Custom Adventures
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Need Other Locations?</h3>
                <p className="text-white/90 text-sm md:text-lg max-w-xl mx-auto">
                  If you want to travel to locations not listed here, contact us for custom pricing!
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Glass Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                  <h5 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <span className="w-10 h-10 bg-lanka-gold/30 rounded-full flex items-center justify-center">
                      <FaTree className="w-5 h-5 text-lanka-gold" />
                    </span>
                    Popular Requests
                  </h5>
                  <ul className="space-y-3">
                    {['Arugam Bay Surf Tours', 'Jaffna Cultural Tours', 'Trincomalee Beach Tours', 'Sigiriya & Dambulla Heritage', 'Yala Safari Tours'].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-white/90">
                        <span className="w-2 h-2 bg-lanka-gold rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* CTA Section */}
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 w-full">
                    <p className="text-white/80 mb-6">Get instant quotes via WhatsApp</p>
                    <a
                      href="https://wa.me/94719567600?text=Hello!%20I%20want%20to%20travel%20to%20a%20location%20not%20on%20your%20list.%20Please%20provide%20pricing."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Contact for Prices
                    </a>
                    <p className="text-sm text-white/70 mt-4 flex items-center justify-center gap-2">
                      <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                        <FaPhone className="w-4 h-4" />
                      </span>
                      +94 71 956 7600
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Package Detail Modal */}
      {selectedPackage && (
        <PackageDetail 
          pkg={selectedPackage} 
          reviews={reviewsByTour[selectedPackage.id] || []}
          onClose={() => setSelectedPackage(null)}
          onPlaceClick={(place) => {
            setSelectedPlace(place);
          }}
        />
      )}

      {/* Place Detail Modal */}
      {selectedPlace && (
        <PlaceModal 
          place={selectedPlace} 
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </div>
  );
};

export default Tours;
