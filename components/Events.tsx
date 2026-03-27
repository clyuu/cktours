import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaTimes, FaClock, FaInfoCircle, FaWhatsapp } from 'react-icons/fa';

// Festival Data
const FESTIVALS = [
  {
    id: 'esala-perahera',
    name: 'Esala Perahera',
    location: 'Kandy',
    month: 'July - August',
    duration: '10 Days',
    image: '/Images/The Esala Perahera Festival.jpg',
    description: 'The Kandy Esala Perahera is one of the oldest and grandest Buddhist festivals in Sri Lanka and Asia. This spectacular procession honors the Sacred Tooth Relic of Lord Buddha, housed in the Temple of the Tooth (Sri Dalada Maligawa).',
    highlights: [
      'Over 100 magnificently decorated elephants',
      'Traditional Kandyan dancers and drummers',
      'Fire dancers and whip crackers',
      'Colorful costumes and ancient rituals',
      'Night processions with thousands of performers',
      'Sacred Tooth Relic casket procession'
    ],
    bestTime: 'Final 5 nights (Maha Perahera)',
    tips: 'Book accommodation months in advance. Best viewing spots are along the main streets of Kandy.',
    nextDate: '2026'
  },
  {
    id: 'sinhala-tamil-new-year',
    name: 'Sinhala & Tamil New Year',
    location: 'Island-wide',
    month: 'April 13-14',
    duration: '2 Days',
    image: '/Images/Sinhala & Tamil New Year.jpg',
    description: 'Avurudu is the traditional New Year celebration marking the end of the harvest season and the beginning of the new solar year. Families come together to celebrate with traditional games, food, and rituals.',
    highlights: [
      'Lighting the hearth at auspicious time',
      'Traditional games (kotta pora, kana mutti)',
      'Special foods (kiribath, kokis, kevum)',
      'Wearing new clothes in auspicious colors',
      'Family gatherings and visiting relatives',
      'Exchange of betel leaves and sweets'
    ],
    bestTime: 'April 13-14 for main celebrations',
    tips: 'Many businesses close for a week. Great time to experience village life and hospitality.',
    nextDate: 'April 13-14, 2026'
  },
  {
    id: 'vesak',
    name: 'Vesak Poya',
    location: 'Island-wide',
    month: 'May (Full Moon)',
    duration: '2 Days',
    image: '/Images/Vesak Poya.jpg',
    description: 'Vesak commemorates the birth, enlightenment, and passing of Lord Buddha. The island transforms with colorful lanterns (vesak kudu), illuminated pandols depicting Buddhist stories, and acts of generosity.',
    highlights: [
      'Colorful Vesak lanterns everywhere',
      'Massive illuminated pandols (thorana)',
      'Free food stalls (dansalas)',
      'Temple visits and religious observances',
      'White-clothed devotees',
      'No meat or alcohol sold'
    ],
    bestTime: 'Vesak full moon day and following day',
    tips: 'Colombo and Kandy have the most elaborate celebrations. Visit temples early morning.',
    nextDate: 'May 2026'
  },
  {
    id: 'poson',
    name: 'Poson Poya',
    location: 'Mihintale & Anuradhapura',
    month: 'June (Full Moon)',
    duration: '2 Days',
    image: '/Images/Poson Poya.jpg',
    description: 'Poson celebrates the arrival of Buddhism to Sri Lanka in 236 BC when Arahat Mahinda converted King Devanampiyatissa. Mihintale, the birthplace of Buddhism in Sri Lanka, becomes the center of celebrations.',
    highlights: [
      'Pilgrimage to Mihintale sacred mountain',
      'Thousands climb 1,840 steps to summit',
      'Religious observances at ancient sites',
      'Illuminated temples and stupas',
      'Cultural performances',
      'Anuradhapura sacred city celebrations'
    ],
    bestTime: 'Full moon day for peak celebrations',
    tips: 'Start the Mihintale climb early morning to avoid heat. Wear comfortable shoes.',
    nextDate: 'June 2026'
  },
  {
    id: 'deepavali',
    name: 'Deepavali',
    location: 'Island-wide (Hindu areas)',
    month: 'October - November',
    duration: '1 Day',
    image: '/Images/Deepavali.jpg',
    description: 'The Hindu Festival of Lights celebrates the victory of light over darkness and good over evil. Homes are decorated with oil lamps (diyas), colorful rangoli patterns, and families exchange sweets.',
    highlights: [
      'Thousands of oil lamps lit at dusk',
      'Colorful rangoli floor decorations',
      'Fireworks and firecrackers',
      'Traditional sweets and savories',
      'New clothes and family gatherings',
      'Temple visits and prayers'
    ],
    bestTime: 'Evening of Deepavali day',
    tips: 'Visit Colombo or Jaffna for major celebrations. Hindu kovils are beautifully decorated.',
    nextDate: 'October/November 2026'
  },
  {
    id: 'nallur',
    name: 'Nallur Festival',
    location: 'Jaffna',
    month: 'August - September',
    duration: '25 Days',
    image: '/Images/Nallur Festival.jpg',
    description: 'The Nallur Kandaswamy Kovil Festival is one of the most significant Hindu festivals in Sri Lanka. Thousands of devotees gather for 25 days of rituals, processions, and celebrations honoring Lord Murugan.',
    highlights: [
      '25 days of continuous celebrations',
      'Massive chariot processions',
      'Kavadi dance performances',
      'Fire-walking ceremonies',
      'Thousands of devotees in traditional dress',
      'Final day grand procession'
    ],
    bestTime: 'Final 5 days for major events',
    tips: 'Book Jaffna accommodation early. Respectful dress required (cover shoulders and knees).',
    nextDate: 'August-September 2026'
  },
  {
    id: 'thai-pongal',
    name: 'Thai Pongal',
    location: 'Island-wide (Tamil areas)',
    month: 'January 14-15',
    duration: '2 Days',
    image: '/Images/Thai Pongal.jpg',
    description: 'Thai Pongal is the Tamil harvest festival celebrating abundance and thanksgiving. The highlight is cooking the traditional Pongal rice dish until it overflows, symbolizing prosperity.',
    highlights: [
      'Cooking Pongal rice outdoors',
      'Decorated cattle (Mattu Pongal)',
      'Colorful kolam patterns',
      'Traditional music and dance',
      'Family gatherings',
      'Thanksgiving prayers to Sun God'
    ],
    bestTime: 'Morning of Pongal day',
    tips: 'Visit hill country tea estates or Northern Province for authentic celebrations.',
    nextDate: 'January 14-15, 2026'
  },
  {
    id: 'kataragama',
    name: 'Kataragama Festival',
    location: 'Kataragama',
    month: 'July - August',
    duration: '14 Days',
    image: '/Images/Kataragama Festival.jpg',
    description: 'The Kataragama Festival honors God Kataragama (Skanda/Murugan) at one of the most sacred sites for Buddhists, Hindus, and Muslims alike. Devotees perform extreme acts of devotion including fire-walking and body piercing.',
    highlights: [
      'Fire-walking ceremonies',
      'Kavadi dancing with hooks and skewers',
      'Nightly processions with elephants',
      'Pilgrims from all religions',
      'Sacred rituals at Maha Devale',
      'Full moon poya celebrations'
    ],
    bestTime: 'Final nights and Esala full moon',
    tips: 'Combine with Yala safari. Accommodation fills up fast during festival.',
    nextDate: 'July-August 2026'
  }
];

interface FestivalDetailProps {
  festival: typeof FESTIVALS[0];
  onClose: () => void;
}

const FestivalDetail: React.FC<FestivalDetailProps> = ({ festival, onClose }) => {
  const handleBookTour = () => {
    const message = `Hello! I'm interested in visiting Sri Lanka during the ${festival.name} festival (${festival.month}).\n\nPlease help me plan a tour around this event.`;
    window.open(`https://wa.me/94719567600?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header Image */}
        <div className="relative h-64 md:h-80">
          <img 
            src={festival.image} 
            alt={festival.name}
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
          >
            <FaTimes className="w-6 h-6" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-white/80 text-xs md:text-sm mb-2">
              <span className="flex items-center gap-1"><FaCalendarAlt className="w-3 h-3 md:w-4 md:h-4" /> {festival.month}</span>
              <span className="flex items-center gap-1"><FaMapMarkerAlt className="w-3 h-3 md:w-4 md:h-4" /> {festival.location}</span>
              <span className="flex items-center gap-1"><FaClock className="w-3 h-3 md:w-4 md:h-4" /> {festival.duration}</span>
            </div>
            <h2 className="text-white font-serif text-xl md:text-3xl font-bold">{festival.name}</h2>
          </div>
        </div>

        <div className="p-4 md:p-8">
          {/* Description */}
          <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6">
            {festival.description}
          </p>

          {/* Next Date Banner */}
          <div className="bg-lanka-gold/20 rounded-xl p-3 md:p-4 mb-6 flex items-center gap-3">
            <FaInfoCircle className="w-5 h-5 text-lanka-gold flex-shrink-0" />
            <span className="text-slate-700">
              <strong>Next Celebration:</strong> {festival.nextDate}
            </span>
          </div>

          {/* Highlights */}
          <h3 className="font-bold text-slate-900 text-base md:text-lg mb-4">Festival Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mb-6">
            {festival.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-slate-600 bg-lanka-sand/30 p-2 md:p-3 rounded-lg">
                <span className="w-2 h-2 bg-lanka-green rounded-full flex-shrink-0 mt-1.5"></span>
                <span className="break-words">{highlight}</span>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="bg-slate-50 rounded-xl p-3 md:p-4 mb-6">
            <h4 className="font-bold text-slate-900 mb-2 text-sm md:text-base">🎯 Travel Tips</h4>
            <p className="text-slate-600 text-sm md:text-base">{festival.tips}</p>
          </div>

          {/* Best Time */}
          <div className="bg-lanka-green/10 rounded-xl p-3 md:p-4 mb-6 md:mb-8">
            <h4 className="font-bold text-lanka-green mb-2 text-sm md:text-base">⏰ Best Time to Visit</h4>
            <p className="text-slate-600 text-sm md:text-base">{festival.bestTime}</p>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBookTour}
            className="w-full bg-[#25D366] text-white py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2 md:gap-3"
          >
            <FaWhatsapp className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-sm md:text-base">Plan Festival Tour via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Events: React.FC = () => {
  const [selectedFestival, setSelectedFestival] = useState<typeof FESTIVALS[0] | null>(null);

  // Get current month to highlight upcoming festivals
  const currentMonth = new Date().getMonth();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-lanka-sand to-white">
      {/* Hero */}
      <div className="relative h-[35vh] md:h-[50vh] bg-cover bg-center" style={{ backgroundImage: 'url(/Images/Festivals%20%20Events.jpg)' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 sm:px-6">
          <span className="text-lanka-gold font-bold tracking-widest uppercase text-xs sm:text-sm mb-2 md:mb-4">Cultural Calendar</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold mb-3 md:mb-4 text-center">Festivals & Events</h1>
          <p className="text-sm sm:text-lg md:text-xl text-white/90 text-center max-w-2xl">
            Experience the vibrant cultural heritage of Sri Lanka through its ancient festivals and celebrations
          </p>
        </div>
      </div>

      {/* Intro Section */}
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4">A Land of Celebrations</h2>
          <p className="text-slate-600 text-sm md:text-lg leading-relaxed">
            Sri Lanka's calendar is filled with colorful festivals celebrating Buddhist, Hindu, Muslim, and Christian traditions. 
            From grand processions with elephants to intimate village celebrations, each festival offers a unique window into the island's rich cultural tapestry.
          </p>
        </div>

        {/* Festival Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {FESTIVALS.map((festival) => (
            <div
              key={festival.id}
              onClick={() => setSelectedFestival(festival)}
              className="group cursor-pointer bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-36 sm:h-44 md:h-48 overflow-hidden">
                <img 
                  src={festival.image} 
                  alt={festival.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-lanka-gold text-lanka-green px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold">
                  {festival.month}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-2 left-2 right-2 md:bottom-3 md:left-3 md:right-3">
                  <h3 className="text-white font-serif text-base sm:text-lg md:text-xl font-bold">{festival.name}</h3>
                </div>
              </div>
              <div className="p-3 md:p-4">
                <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-slate-500 mb-1.5 md:mb-2">
                  <FaMapMarkerAlt className="w-2.5 h-2.5 md:w-3 md:h-3" />
                  {festival.location}
                </div>
                <p className="text-slate-600 text-xs md:text-sm line-clamp-2">
                  {festival.description.substring(0, 100)}...
                </p>
                <div className="mt-3 md:mt-4 text-lanka-green font-bold text-xs md:text-sm group-hover:text-lanka-gold transition-colors">
                  Learn More →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 md:mt-20 bg-gradient-to-r from-lanka-green to-teal-700 rounded-2xl md:rounded-3xl p-6 md:p-12 text-center text-white">
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">Plan Your Festival Experience</h3>
          <p className="text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
            Want to experience Sri Lanka's festivals firsthand? We'll help you plan the perfect cultural journey around the island's most spectacular celebrations.
          </p>
          <a
            href="https://wa.me/94719567600?text=Hello!%20I%20want%20to%20plan%20a%20trip%20around%20Sri%20Lankan%20festivals.%20Please%20help%20me%20choose%20the%20best%20time%20to%20visit."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 md:gap-3 bg-white text-lanka-green px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg hover:bg-lanka-gold transition-colors"
          >
            <FaWhatsapp className="w-4 h-4 md:w-5 md:h-5" />
            Contact Us
          </a>
        </div>
      </div>

      {/* Festival Detail Modal */}
      {selectedFestival && (
        <FestivalDetail 
          festival={selectedFestival} 
          onClose={() => setSelectedFestival(null)}
        />
      )}
    </div>
  );
};

export default Events;
