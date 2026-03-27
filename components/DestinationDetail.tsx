import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUsers, FaBoxOpen } from 'react-icons/fa';
import { DESTINATIONS, TOUR_PACKAGE_NAMES } from '../constants';

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const destination = DESTINATIONS.find(d => d.id === id);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lanka-sand">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">Destination Not Found</h1>
          <Link to="/" className="text-lanka-green font-bold hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const tourPackageName = destination.tourPackage ? TOUR_PACKAGE_NAMES[destination.tourPackage] : null;

  const handleBookTour = () => {
    navigate('/tours', { state: { selectedPackage: destination.tourPackage } });
  };

  // Extended content for each destination
  const destinationContent: Record<string, { highlights: string[], bestTime: string, duration: string, groupSize: string, fullDescription: string }> = {
    'ravana-falls': {
      highlights: ['View the stunning 25m waterfall', 'Enjoy the misty atmosphere', 'Take photos at the scenic viewpoint', 'Explore the surrounding forest'],
      bestTime: 'Year-round',
      duration: '1-2 hours',
      groupSize: 'Any size',
      fullDescription: `Ravana Falls is one of the most popular waterfalls in Sri Lanka, located on the Ella-Wellawaya road. The waterfall is named after the legendary King Ravana from the epic Ramayana.

Standing at approximately 25 meters tall, the waterfall cascades down in a beautiful display, especially during the monsoon season when water levels are at their peak. The surrounding area is lush with tropical vegetation, creating a picturesque setting.

The falls are easily accessible from the main road, making it a popular stop for tourists traveling through the Ella region. The misty spray from the waterfall provides a refreshing experience, especially on hot days.`
    },
    'nine-arch-bridge': {
      highlights: ['Watch trains cross the iconic bridge', 'Photography opportunities', 'Scenic hiking trails nearby', 'Visit nearby Ella town'],
      bestTime: 'Year-round',
      duration: '2-3 hours',
      groupSize: 'Any size',
      fullDescription: `The Nine Arch Bridge, also called the Bridge in the Sky, is a viaduct bridge in Sri Lanka. It is one of the best examples of colonial-era railway construction in the country. Located in Demodara, between Ella and Demodara railway stations on the Badulla railway line.

Built during British colonial rule, the bridge is constructed entirely of brick, stone, and cement without any steel. The surrounding area offers breathtaking views of the hill country, lush tea plantations, and misty mountains.`
    },
    'little-adams-peak': {
      highlights: ['Easy hiking trail', 'Panoramic mountain views', 'Tea plantation scenery', 'Sunrise and sunset views'],
      bestTime: 'Year-round',
      duration: '2-3 hours',
      groupSize: 'Any size',
      fullDescription: `Little Adam's Peak is a popular hiking destination near Ella. The trail offers stunning views of the surrounding mountains, valleys, and tea plantations. Despite its name, the hike is relatively easy and suitable for most fitness levels.

The peak gets its name from its resemblance to the famous Adam's Peak, though it's much smaller and easier to climb. The trail winds through tea estates before reaching the summit, where you're rewarded with 360-degree panoramic views.`
    },
    'ella-train': {
      highlights: ['Scenic mountain railway', 'Tea plantation views', 'Historic bridge crossings', 'Cultural experience'],
      bestTime: 'Year-round',
      duration: 'Half day',
      groupSize: 'Any size',
      fullDescription: `The Ella Train Journey is considered one of the most scenic train rides in the world. The route passes through stunning hill country landscapes, crossing viaducts and passing through tunnels, with views of tea plantations, waterfalls, and mountains.

The journey offers an authentic Sri Lankan experience, with locals and tourists sharing the carriages. The train crosses several iconic bridges including the famous Nine Arch Bridge, offering spectacular photo opportunities.`
    },
    'nanuoya-train': {
      highlights: ['Scenic highland journey', 'Tea country views', 'Mountain tunnel passages', 'Highland station experience'],
      bestTime: 'Year-round',
      duration: 'Half day',
      groupSize: 'Any size',
      fullDescription: `The Nanuoya Train Journey takes you through some of Sri Lanka's most beautiful highland scenery. Nanuoya is the nearest station to Nuwara Eliya and offers stunning views of the hill country.

The train passes through lush green tea plantations, misty mountains, and scenic valleys. It's a perfect way to experience the beauty of Sri Lanka's central highlands while enjoying an authentic local transport experience.`
    },
    'horton-plains': {
      highlights: ['World\'s End viewpoint', 'Baker\'s Falls', 'Cloud forest hiking', 'Endemic wildlife'],
      bestTime: 'January - March',
      duration: 'Half day',
      groupSize: '2-15 people',
      fullDescription: `Horton Plains National Park is a protected area in the central highlands of Sri Lanka and is covered by montane grassland and cloud forest. The park is home to many endemic species of plants and animals.

The main attractions include World's End, a stunning escarpment with a 880m drop, and Baker's Falls, a beautiful waterfall. The park is best visited early in the morning before the mist rolls in to obscure the views at World's End.`
    },
    'tea-factory': {
      highlights: ['Learn tea production process', 'Tea tasting session', 'Plantation views', 'Buy fresh Ceylon tea'],
      bestTime: 'Year-round',
      duration: '1-2 hours',
      groupSize: 'Any size',
      fullDescription: `Visit a traditional Tea Factory to learn about the production of world-famous Ceylon tea. You'll see the entire process from the freshly plucked leaves to the finished product.

The tour includes a walk through the tea plantations, a detailed explanation of the processing stages, and ends with a tea tasting session where you can sample different grades of tea. You can also purchase fresh tea directly from the factory.`
    },
    'gregory-lake': {
      highlights: ['Boating activities', 'Scenic walks', 'Picnic areas', 'Horse riding'],
      bestTime: 'Year-round',
      duration: '2-3 hours',
      groupSize: 'Any size',
      fullDescription: `Gregory Lake is a beautiful lake in the heart of Nuwara Eliya, surrounded by manicured gardens and offering stunning views of the surrounding hills. The lake was named after Sir William Gregory, a British Governor of Ceylon.

Visitors can enjoy various activities including paddle boating, jet skiing, and pony rides around the lake. The lakeside promenade is perfect for a leisurely walk, and there are several cafes and restaurants nearby.`
    },
    'nuwara-eliya-post-office': {
      highlights: ['Historic colonial building', 'Unique architecture', 'Send postcards home', 'Photo opportunity'],
      bestTime: 'Year-round',
      duration: '30 minutes',
      groupSize: 'Any size',
      fullDescription: `The Nuwara Eliya Post Office is a charming colonial-era building that serves as a popular tourist attraction. Built during British rule, the red-brick building features distinctive Tudor-style architecture.

Visitors can send postcards and letters home with a unique Nuwara Eliya postmark. The building's distinctive red color and architectural style make it a perfect photo opportunity and a reminder of Sri Lanka's colonial heritage.`
    },
    'ambuluwawa': {
      highlights: ['360-degree panoramic views', 'Multi-religious tower', 'Biodiversity park', 'Adventure climbing'],
      bestTime: 'Year-round',
      duration: '2-3 hours',
      groupSize: 'Any size',
      fullDescription: `Ambuluwawa Tower is a multi-religious site located on Ambuluwawa mountain in Gampola. The tower offers breathtaking 360-degree views of the surrounding mountains, valleys, and forests.

The site is unique as it contains a Buddhist stupa, Hindu kovil, Islamic mosque, and Christian church in close proximity. The spiral staircase leading to the top of the tower offers an adventurous climb with increasingly stunning views as you ascend.`
    },
    'temple-of-tooth': {
      highlights: ['See the sacred tooth relic', 'Experience Buddhist ceremonies', 'Explore the museum', 'Attend the Esala Perahera festival'],
      bestTime: 'Year-round (July-August for Esala Perahera)',
      duration: '2-3 hours',
      groupSize: 'Any size',
      fullDescription: `Sri Dalada Maligawa, or the Temple of the Sacred Tooth Relic, is a Buddhist temple in Kandy, Sri Lanka. It is located in the royal palace complex of the former Kingdom of Kandy, which houses the relic of the tooth of the Buddha.

The temple is the most sacred Buddhist shrine in Sri Lanka and attracts thousands of local and foreign pilgrims every year. The annual Esala Perahera, one of the oldest and grandest of all Buddhist festivals in Sri Lanka, is held in honor of the sacred tooth relic.`
    },
    'view-point': {
      highlights: ['Panoramic city views', 'Kandy Lake vista', 'Mountain backdrop', 'Photo opportunities'],
      bestTime: 'Year-round',
      duration: '30 minutes - 1 hour',
      groupSize: 'Any size',
      fullDescription: `The Kandy View Point offers stunning panoramic views of Kandy city, the sacred Kandy Lake, and the surrounding mountains. Located on a hill above the city, it provides the perfect vantage point to appreciate the beauty of Sri Lanka's cultural capital.

The viewpoint is especially beautiful during sunrise and sunset when the city is bathed in golden light. It's a perfect spot for photography and to get a sense of the layout of this historic city.`
    },
    'gem-museum': {
      highlights: ['Learn about Sri Lankan gems', 'See precious stones', 'Mining process explanation', 'Shopping opportunity'],
      bestTime: 'Year-round',
      duration: '1-2 hours',
      groupSize: 'Any size',
      fullDescription: `Visit a Gem Museum to learn about Sri Lanka's famous gem industry. Sri Lanka, known historically as "Ratna Dweepa" (Island of Gems), has been a source of precious stones for thousands of years.

The museum showcases various types of gems found in Sri Lanka including blue sapphires, rubies, cat's eyes, and many others. You'll learn about the mining process, cutting techniques, and the history of gem trading in Sri Lanka.`
    },
    'kandyan-dance': {
      highlights: ['Traditional dance performance', 'Fire walking ceremony', 'Drum performances', 'Cultural experience'],
      bestTime: 'Year-round',
      duration: '1-2 hours',
      groupSize: 'Any size',
      fullDescription: `Experience the vibrant tradition of Kandyan Dance, a classical dance form that originated in the Kingdom of Kandy. The dance is characterized by elaborate costumes, rhythmic drumming, and energetic movements.

The show typically includes various traditional dances, fire-eating and fire-walking performances, and demonstrations of traditional drumming. It's a wonderful way to experience Sri Lankan culture and heritage.`
    }
  };

  const content = destinationContent[destination.id] || {
    highlights: ['Explore this amazing destination', 'Experience local culture', 'Enjoy natural beauty'],
    bestTime: 'Year-round',
    duration: 'Varies',
    groupSize: 'Any size',
    fullDescription: destination.description
  };

  return (
    <div className="min-h-screen bg-lanka-sand">
      {/* Hero Section */}
      <div className="relative h-[45vh] sm:h-[50vh] md:h-[60vh] w-full">
        <img
          src={destination.imageUrl}
          alt={destination.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Back Button */}
        <Link 
          to="/" 
          className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-1.5 md:gap-2 text-white bg-white/20 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full hover:bg-white/30 transition-colors text-sm md:text-base"
        >
          <FaArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          Back
        </Link>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-12">
          <div className="flex flex-wrap gap-2 md:gap-3 mb-2 md:mb-4">
            <span className="inline-block px-2.5 py-1 md:px-4 md:py-2 bg-lanka-gold text-lanka-green text-xs md:text-sm font-bold uppercase tracking-wider rounded-full">
              {destination.category}
            </span>
            {tourPackageName && (
              <span className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 py-1 md:px-4 md:py-2 bg-lanka-green text-white text-xs md:text-sm font-bold rounded-full">
                <FaBoxOpen className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">{tourPackageName}</span>
                <span className="sm:hidden">Tour</span>
              </span>
            )}
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4">{destination.title}</h1>
          <div className="flex items-center text-white/90 text-sm md:text-lg">
            <FaMapMarkerAlt className="w-3.5 h-3.5 md:w-5 md:h-5 mr-1.5 md:mr-2" />
            {destination.location}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6">About This Destination</h2>
            <div className="prose prose-sm md:prose-lg text-slate-700 leading-relaxed whitespace-pre-line">
              {content.fullDescription}
            </div>

            <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mt-8 md:mt-12 mb-4 md:mb-6">Highlights</h3>
            <ul className="space-y-2 md:space-y-3">
              {content.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2 md:gap-3">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-lanka-gold rounded-full mt-2"></span>
                  <span className="text-slate-700 text-sm md:text-base">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 lg:sticky lg:top-6">
              <h3 className="font-serif text-lg md:text-xl font-bold text-slate-900 mb-4 md:mb-6">Quick Info</h3>
              
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-lanka-green/10 rounded-full flex items-center justify-center">
                    <FaCalendarAlt className="w-4 h-4 md:w-6 md:h-6 text-lanka-green" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-slate-500">Best Time to Visit</p>
                    <p className="font-semibold text-slate-900 text-sm md:text-base">{content.bestTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-lanka-green/10 rounded-full flex items-center justify-center">
                    <FaClock className="w-4 h-4 md:w-6 md:h-6 text-lanka-green" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-slate-500">Recommended Duration</p>
                    <p className="font-semibold text-slate-900 text-sm md:text-base">{content.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-lanka-green/10 rounded-full flex items-center justify-center">
                    <FaUsers className="w-4 h-4 md:w-6 md:h-6 text-lanka-green" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-slate-500">Group Size</p>
                    <p className="font-semibold text-slate-900 text-sm md:text-base">{content.groupSize}</p>
                  </div>
                </div>
              </div>

              {tourPackageName && (
                <div className="mt-4 md:mt-6 p-3 md:p-4 bg-lanka-green/5 rounded-lg md:rounded-xl border border-lanka-green/20">
                  <div className="flex items-center gap-2 text-lanka-green mb-1 md:mb-2">
                    <FaBoxOpen className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-bold text-xs md:text-sm">Part of Tour Package</span>
                  </div>
                  <p className="text-slate-700 font-semibold text-sm md:text-base">{tourPackageName}</p>
                </div>
              )}

              <button 
                onClick={handleBookTour}
                className="w-full mt-6 md:mt-8 px-4 md:px-6 py-3 md:py-4 bg-lanka-gold text-lanka-green font-bold uppercase tracking-wide rounded-full hover:bg-lanka-green hover:text-white transition-colors text-sm md:text-base"
              >
                Book This Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
