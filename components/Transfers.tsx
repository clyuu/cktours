import React, { useState, useMemo } from 'react';
import { FaMapMarkerAlt, FaUsers, FaCar, FaPhone, FaArrowRight, FaChevronDown } from 'react-icons/fa';

// Transfer pricing data from Katunayake Airport
const TRANSFER_ROUTES = [
  {
    from: 'Katunayake Airport',
    to: 'Bentota',
    prices: {
      car: 14000,
      kdh: 22000,
      kdhHighRoof: 26000
    }
  },
  {
    from: 'Katunayake Airport',
    to: 'Hikkaduwa',
    prices: {
      car: 16000,
      kdh: 24000,
      kdhHighRoof: 28000
    }
  },
  {
    from: 'Katunayake Airport',
    to: 'Galle',
    prices: {
      car: 16000,
      kdh: 24000,
      kdhHighRoof: 28000
    }
  },
  {
    from: 'Katunayake Airport',
    to: 'Mirissa',
    prices: {
      car: 19000,
      kdh: 26000,
      kdhHighRoof: 32000
    }
  },
  {
    from: 'Katunayake Airport',
    to: 'Polhena',
    prices: {
      car: 19000,
      kdh: 26000,
      kdhHighRoof: 32000
    }
  },
  {
    from: 'Katunayake Airport',
    to: 'Hiriketiya',
    prices: {
      car: 24000,
      kdh: 33000,
      kdhHighRoof: 38000
    }
  },
  {
    from: 'Katunayake Airport',
    to: 'Katagamuwa',
    prices: {
      car: 24000,
      kdh: 33000,
      kdhHighRoof: 38000
    }
  },
  {
    from: 'Katunayake Airport',
    to: 'Hambantota',
    prices: {
      car: 30000,
      kdh: 38000,
      kdhHighRoof: 44000
    }
  }
];

// All locations in Sri Lanka
const ALL_LOCATIONS = [
  'Katunayake Airport',
  'Colombo',
  'Negombo',
  'Kandy',
  'Galle',
  'Bentota',
  'Hikkaduwa',
  'Mirissa',
  'Polhena',
  'Hiriketiya',
  'Katagamuwa',
  'Hambantota',
  'Ella',
  'Nuwara Eliya',
  'Sigiriya',
  'Dambulla',
  'Anuradhapura',
  'Polonnaruwa',
  'Trincomalee',
  'Batticaloa',
  'Jaffna',
  'Arugam Bay',
  'Unawatuna',
  'Weligama',
  'Tangalle',
  'Yala',
  'Udawalawe',
  'Matara',
  'Kalutara',
  'Ratnapura',
  'Habarana',
  'Pasikuda',
  'Kalpitiya',
  'Mannar',
  'Kurunegala',
  'Badulla',
  'Bandarawela'
];

// Vehicle data with images
const VEHICLES = [
  {
    id: 'car',
    name: 'Car',
    capacity: '2-3 Persons',
    minPersons: 1,
    maxPersons: 3,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80',
    description: 'Comfortable sedan for small groups'
  },
  {
    id: 'kdh',
    name: 'KDH Van',
    capacity: '4-6 Persons',
    minPersons: 4,
    maxPersons: 6,
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=400&q=80',
    description: 'Spacious van for medium groups'
  },
  {
    id: 'kdhHighRoof',
    name: 'KDH High Roof',
    capacity: '4-10 Persons',
    minPersons: 4,
    maxPersons: 10,
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&q=80',
    description: 'Large van for big groups with extra luggage space'
  }
];

const Transfers: React.FC = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [persons, setPersons] = useState(2);
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);
  const [fromSearch, setFromSearch] = useState('');
  const [toSearch, setToSearch] = useState('');

  // Find matching route
  const matchedRoute = useMemo(() => {
    if (!fromLocation || !toLocation) return null;
    return TRANSFER_ROUTES.find(
      route => 
        route.from.toLowerCase() === fromLocation.toLowerCase() && 
        route.to.toLowerCase() === toLocation.toLowerCase()
    );
  }, [fromLocation, toLocation]);

  // Get suitable vehicles based on person count
  const suitableVehicles = useMemo(() => {
    return VEHICLES.filter(v => persons >= v.minPersons && persons <= v.maxPersons);
  }, [persons]);

  // Get recommended vehicle
  const recommendedVehicle = useMemo(() => {
    if (persons <= 3) return 'car';
    if (persons <= 6) return 'kdh';
    return 'kdhHighRoof';
  }, [persons]);

  const filteredFromLocations = ALL_LOCATIONS.filter(loc => 
    loc.toLowerCase().includes(fromSearch.toLowerCase())
  );

  const filteredToLocations = ALL_LOCATIONS.filter(loc => 
    loc.toLowerCase().includes(toSearch.toLowerCase()) && loc !== fromLocation
  );

  const handleWhatsAppContact = () => {
    const message = `Hello! I need a transfer from ${fromLocation} to ${toLocation} for ${persons} person(s). Please provide pricing.`;
    const whatsappUrl = `https://wa.me/94719567600?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleBookNow = (vehicleId: string, price: number) => {
    const vehicle = VEHICLES.find(v => v.id === vehicleId);
    const message = `Hello! I want to book a transfer:\n\nFrom: ${fromLocation}\nTo: ${toLocation}\nPersons: ${persons}\nVehicle: ${vehicle?.name}\nPrice: Rs. ${price.toLocaleString()}\n\nPlease confirm availability.`;
    const whatsappUrl = `https://wa.me/94719567600?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lanka-sand to-white">
      {/* Hero Section */}
      <div className="relative h-[35vh] md:h-[40vh] bg-cover bg-center" style={{ backgroundImage: 'url(/Images/Airport%20Transfers.jpg)' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 sm:px-6">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-center">Airport Transfers</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 text-center max-w-2xl">Safe, comfortable and reliable transportation across Sri Lanka</p>
        </div>
      </div>

      {/* Booking Form */}
      <div className="container mx-auto px-4 md:px-6 -mt-12 md:-mt-16 relative z-20">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl p-5 md:p-8 max-w-4xl mx-auto">
          <h2 className="font-serif text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6 text-center">Book Your Transfer</h2>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {/* From Location */}
            <div className="relative">
              <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1.5 md:mb-2">
                <FaMapMarkerAlt className="inline w-3 h-3 md:w-4 md:h-4 mr-1" /> From
              </label>
              <div className="relative">
                <button
                  onClick={() => { setIsFromOpen(!isFromOpen); setIsToOpen(false); }}
                  className="w-full p-3 border border-slate-300 rounded-lg text-left flex justify-between items-center hover:border-lanka-green transition-colors"
                >
                  <span className={fromLocation ? 'text-slate-900' : 'text-slate-400'}>
                    {fromLocation || 'Select pickup location'}
                  </span>
                  <FaChevronDown className={`w-5 h-5 transition-transform ${isFromOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isFromOpen && (
                  <div className="absolute z-30 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
                    <input
                      type="text"
                      placeholder="Search location..."
                      value={fromSearch}
                      onChange={(e) => setFromSearch(e.target.value)}
                      className="w-full p-3 border-b border-slate-200 focus:outline-none focus:bg-slate-50"
                    />
                    <div className="max-h-48 overflow-y-auto">
                      {filteredFromLocations.map(loc => (
                        <button
                          key={loc}
                          onClick={() => { setFromLocation(loc); setIsFromOpen(false); setFromSearch(''); }}
                          className="w-full p-3 text-left hover:bg-lanka-green/10 hover:text-lanka-green transition-colors"
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* To Location */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <FaMapMarkerAlt className="inline w-4 h-4 mr-1" /> To
              </label>
              <div className="relative">
                <button
                  onClick={() => { setIsToOpen(!isToOpen); setIsFromOpen(false); }}
                  className="w-full p-3 border border-slate-300 rounded-lg text-left flex justify-between items-center hover:border-lanka-green transition-colors"
                >
                  <span className={toLocation ? 'text-slate-900' : 'text-slate-400'}>
                    {toLocation || 'Select drop location'}
                  </span>
                  <FaChevronDown className={`w-5 h-5 transition-transform ${isToOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isToOpen && (
                  <div className="absolute z-30 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
                    <input
                      type="text"
                      placeholder="Search location..."
                      value={toSearch}
                      onChange={(e) => setToSearch(e.target.value)}
                      className="w-full p-3 border-b border-slate-200 focus:outline-none focus:bg-slate-50"
                    />
                    <div className="max-h-48 overflow-y-auto">
                      {filteredToLocations.map(loc => (
                        <button
                          key={loc}
                          onClick={() => { setToLocation(loc); setIsToOpen(false); setToSearch(''); }}
                          className="w-full p-3 text-left hover:bg-lanka-green/10 hover:text-lanka-green transition-colors"
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Persons */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <FaUsers className="inline w-4 h-4 mr-1" /> Passengers
              </label>
              <select
                value={persons}
                onChange={(e) => setPersons(Number(e.target.value))}
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:border-lanka-green transition-colors"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'Persons'}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Route Summary */}
          {fromLocation && toLocation && (
            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-lanka-sand/50 rounded-lg flex flex-wrap items-center justify-center gap-2 md:gap-4 text-sm md:text-base">
              <span className="font-medium text-slate-700">{fromLocation}</span>
              <FaArrowRight className="w-4 h-4 md:w-5 md:h-5 text-lanka-green" />
              <span className="font-medium text-slate-700">{toLocation}</span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="text-slate-600 w-full sm:w-auto text-center">{persons} {persons === 1 ? 'person' : 'persons'}</span>
            </div>
          )}
        </div>

        {/* Results Section */}
        {fromLocation && toLocation && (
          <div className="mt-8 md:mt-12 max-w-4xl mx-auto">
            {matchedRoute ? (
              <>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-slate-900 mb-4 md:mb-6 text-center">Available Vehicles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {VEHICLES.map(vehicle => {
                    const price = matchedRoute.prices[vehicle.id as keyof typeof matchedRoute.prices];
                    const isRecommended = vehicle.id === recommendedVehicle;
                    const isSuitable = persons <= vehicle.maxPersons;
                    
                    return (
                      <div 
                        key={vehicle.id}
                        className={`bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                          isRecommended ? 'ring-2 ring-lanka-green' : ''
                        } ${!isSuitable ? 'opacity-50' : ''}`}
                      >
                        {isRecommended && (
                          <div className="bg-lanka-green text-white text-center py-1.5 md:py-2 text-xs md:text-sm font-bold">
                            ✓ Recommended for {persons} persons
                          </div>
                        )}
                        <div className="h-32 sm:h-40 md:h-48 overflow-hidden">
                          <img 
                            src={vehicle.image} 
                            alt={vehicle.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 md:p-6">
                          <h4 className="font-serif text-lg md:text-xl font-bold text-slate-900">{vehicle.name}</h4>
                          <p className="text-slate-500 text-xs md:text-sm mt-1">{vehicle.capacity}</p>
                          <p className="text-slate-600 text-xs md:text-sm mt-2 hidden sm:block">{vehicle.description}</p>
                          
                          <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-slate-100">
                            <div className="flex items-baseline gap-1">
                              <span className="text-xl md:text-3xl font-bold text-lanka-green">Rs. {price.toLocaleString()}</span>
                            </div>
                            <p className="text-[10px] md:text-xs text-slate-400 mt-1">One way transfer</p>
                          </div>
                          
                          <button
                            onClick={() => handleBookNow(vehicle.id, price)}
                            disabled={!isSuitable}
                            className={`w-full mt-3 md:mt-4 py-2.5 md:py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base ${
                              isSuitable 
                                ? 'bg-lanka-green text-white hover:bg-lanka-green/90' 
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            <FaPhone className="w-3 h-3 md:w-4 md:h-4" />
                            Book Now
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              /* No matching route - Show contact option */
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-20 h-20 bg-lanka-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCar className="w-10 h-10 text-lanka-gold" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-3">Custom Route</h3>
                <p className="text-slate-600 mb-2">
                  <span className="font-medium">{fromLocation}</span> → <span className="font-medium">{toLocation}</span>
                </p>
                <p className="text-slate-500 mb-6">
                  This route is not in our standard pricing list. Please contact us for a custom quote.
                </p>
                
                <button
                  onClick={handleWhatsAppContact}
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#128C7E] transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Contact for Prices
                </button>
                
                <p className="text-sm text-slate-400 mt-4">We'll respond within minutes!</p>
              </div>
            )}
          </div>
        )}

        {/* Features Section */}
        <div className="mt-12 md:mt-16 pb-12 md:pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-lanka-green/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-lanka-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-slate-900 mb-1 md:mb-2 text-sm md:text-base">Safe & Reliable</h4>
              <p className="text-slate-600 text-xs md:text-sm">Professional drivers with years of experience</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-lanka-green/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-lanka-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-slate-900 mb-1 md:mb-2 text-sm md:text-base">24/7 Service</h4>
              <p className="text-slate-600 text-xs md:text-sm">Available anytime for airport pickups</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-lanka-green/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-lanka-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-slate-900 mb-1 md:mb-2 text-sm md:text-base">Best Prices</h4>
              <p className="text-slate-600 text-xs md:text-sm">Competitive rates with no hidden charges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfers;
