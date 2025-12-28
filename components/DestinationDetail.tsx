import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, Users } from 'lucide-react';
import { DESTINATIONS } from '../constants';

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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

  // Extended content for each destination
  const destinationContent: Record<string, { highlights: string[], bestTime: string, duration: string, groupSize: string, fullDescription: string }> = {
    '1': {
      highlights: ['Climb the ancient rock fortress', 'View stunning frescoes of the Sigiriya Maidens', 'Explore the water gardens', 'Watch sunset from the top'],
      bestTime: 'January - April',
      duration: 'Half day',
      groupSize: '2-15 people',
      fullDescription: `Sigiriya, also known as Lion Rock, is an ancient rock fortress located in the northern Matale District near the town of Dambulla in the Central Province, Sri Lanka. It is a site of historical and archaeological significance that is dominated by a massive column of granite approximately 180 meters high.

According to ancient Sri Lankan chronicles, this site was selected by King Kashyapa (477–495 CE) for his new capital. He built his palace on the top of this rock and decorated its sides with colorful frescoes. On a small plateau about halfway up the side of this rock, he built a gateway in the form of an enormous lion.

The capital and the royal palace were abandoned after the king's death. It was used as a Buddhist monastery until the 14th century. Today, Sigiriya is a UNESCO World Heritage Site and is one of the best-preserved examples of ancient urban planning.`
    },
    '2': {
      highlights: ['Watch trains cross the iconic bridge', 'Photography opportunities', 'Scenic hiking trails nearby', 'Visit nearby Ella town'],
      bestTime: 'Year-round',
      duration: '2-3 hours',
      groupSize: 'Any size',
      fullDescription: `The Nine Arch Bridge, also called the Bridge in the Sky, is a viaduct bridge in Sri Lanka. It is one of the best examples of colonial-era railway construction in the country. Located in Demodara, between Ella and Demodara railway stations on the Badulla railway line, the bridge is 91 meters long and 24 meters high.

Built during British colonial rule, the bridge is constructed entirely of brick, stone, and cement without any steel. Legend has it that the bridge was built without using a single piece of steel due to a shortage during World War I. The architect was a local Sri Lankan named P.K. Appuhami.

The surrounding area offers breathtaking views of the hill country, lush tea plantations, and misty mountains. Visitors often time their visits with the train schedule to capture stunning photographs of the train crossing the bridge.`
    },
    '3': {
      highlights: ['Whale and dolphin watching', 'Surfing and swimming', 'Beachside dining', 'Stunning sunsets'],
      bestTime: 'November - April',
      duration: '1-3 days',
      groupSize: 'Any size',
      fullDescription: `Mirissa is a small town on the south coast of Sri Lanka, located in the Matara District of the Southern Province. It is approximately 150 kilometers south of Colombo and is situated at an elevation of 4 meters above sea level.

The beach and nightlife of Mirissa make it a popular tourist destination. It is known for its significant whale and dolphin watching opportunities, with the season running from November to April. Blue whales, the largest animals on Earth, are frequently spotted here.

The crescent-shaped beach is perfect for swimming and surfing, with waves suitable for both beginners and experienced surfers. The town has developed a vibrant food scene with numerous beachside restaurants serving fresh seafood and international cuisine.`
    },
    '4': {
      highlights: ['See the sacred tooth relic', 'Experience Buddhist ceremonies', 'Explore the museum', 'Attend the Esala Perahera festival'],
      bestTime: 'Year-round (July-August for Esala Perahera)',
      duration: '2-3 hours',
      groupSize: 'Any size',
      fullDescription: `Sri Dalada Maligawa, or the Temple of the Sacred Tooth Relic, is a Buddhist temple in Kandy, Sri Lanka. It is located in the royal palace complex of the former Kingdom of Kandy, which houses the relic of the tooth of the Buddha.

Since ancient times, the relic has played an important role in local politics because it is believed that whoever holds the relic holds the governance of the country. The temple complex was severely damaged by a bomb attack by LTTE in 1998 but was fully restored.

The temple is the most sacred Buddhist shrine in Sri Lanka and attracts thousands of local and foreign pilgrims every year. The annual Esala Perahera, one of the oldest and grandest of all Buddhist festivals in Sri Lanka, is held in honor of the sacred tooth relic.`
    },
    '5': {
      highlights: ['Leopard safari', 'Elephant herds', 'Bird watching', 'Coastal scenery'],
      bestTime: 'February - July',
      duration: 'Full day',
      groupSize: '2-6 people per jeep',
      fullDescription: `Yala National Park is the most visited and second largest national park in Sri Lanka, bordering the Indian Ocean. The park covers 979 square kilometers and is located in the southeast region of the country.

Yala is home to 44 varieties of mammal and 215 bird species. It has one of the highest leopard densities in the world, making it one of the best places on Earth to spot these elusive big cats. The park is also home to elephants, sloth bears, crocodiles, and many other wildlife species.

The landscape of Yala is diverse, featuring scrub jungle, grasslands, tanks, and beaches. The park was designated as a wildlife sanctuary in 1900 and was upgraded to national park status in 1938.`
    },
    '6': {
      highlights: ['Walk the historic ramparts', 'Visit the lighthouse', 'Explore colonial architecture', 'Shop for local crafts'],
      bestTime: 'Year-round',
      duration: 'Half to full day',
      groupSize: 'Any size',
      fullDescription: `Galle Fort, in the Bay of Galle on the southwest coast of Sri Lanka, was first built in 1588 by the Portuguese, then extensively fortified by the Dutch during the 17th century from 1649 onwards. It is a historical, archaeological, and architectural heritage monument, which stands for 432 years.

The fort has a colorful history, and today is a UNESCO World Heritage Site. It is the largest remaining fortress in Asia built by European occupiers. The fort has a unique atmosphere, with its mixture of Dutch colonial buildings, ancient mosques and churches, grand mansions, and museums.

Today, Galle Fort is a living community with homes, businesses, restaurants, and boutique hotels operating within its ancient walls. It is a popular destination for tourists seeking to experience Sri Lanka's colonial history while enjoying modern amenities.`
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
      <div className="relative h-[60vh] w-full">
        <img
          src={destination.imageUrl}
          alt={destination.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Back Button */}
        <Link 
          to="/" 
          className="absolute top-6 left-6 flex items-center gap-2 text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
          <span className="inline-block px-4 py-2 bg-lanka-gold text-lanka-green text-sm font-bold uppercase tracking-wider rounded-full mb-4">
            {destination.category}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4">{destination.title}</h1>
          <div className="flex items-center text-white/90 text-lg">
            <MapPin size={20} className="mr-2" />
            {destination.location}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-3xl font-bold text-slate-900 mb-6">About This Destination</h2>
            <div className="prose prose-lg text-slate-700 leading-relaxed whitespace-pre-line">
              {content.fullDescription}
            </div>

            <h3 className="font-serif text-2xl font-bold text-slate-900 mt-12 mb-6">Highlights</h3>
            <ul className="space-y-3">
              {content.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-lanka-gold rounded-full mt-2"></span>
                  <span className="text-slate-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-6">Quick Info</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-lanka-green/10 rounded-full flex items-center justify-center">
                    <Calendar size={24} className="text-lanka-green" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Best Time to Visit</p>
                    <p className="font-semibold text-slate-900">{content.bestTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-lanka-green/10 rounded-full flex items-center justify-center">
                    <Clock size={24} className="text-lanka-green" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Recommended Duration</p>
                    <p className="font-semibold text-slate-900">{content.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-lanka-green/10 rounded-full flex items-center justify-center">
                    <Users size={24} className="text-lanka-green" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Group Size</p>
                    <p className="font-semibold text-slate-900">{content.groupSize}</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 px-6 py-4 bg-lanka-gold text-lanka-green font-bold uppercase tracking-wide rounded-full hover:bg-lanka-green hover:text-white transition-colors">
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
