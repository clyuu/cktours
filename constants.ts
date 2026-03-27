import { Destination } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'ravana-falls',
    title: 'Ravana Falls',
    location: 'Ella',
    description: 'A popular 25m waterfall near Ella, connected to the legend of King Ravana. Perfect for swimming.',
    imageUrl: '/Images/rawana ella.jpg',
    category: 'Waterfall',
    tourPackage: 'mirissa-ella-short'
  },
  {
    id: 'nine-arch-bridge',
    title: 'Nine Arch Bridge',
    location: 'Ella',
    description: 'The iconic Bridge in the Sky, spanning 91 meters at 24m height. A masterpiece of colonial-era railway construction.',
    imageUrl: '/Images/Nine Arch Bridge.jpg',
    category: 'Scenic',
    tourPackage: 'mirissa-ella-short'
  },
  {
    id: 'little-adams-peak',
    title: "Little Adam's Peak",
    location: 'Ella',
    description: 'An easy 45-minute hike with breathtaking panoramic views of tea plantations and mountains.',
    imageUrl: '/Images/punchi siripade.jpg',
    category: 'Hiking',
    tourPackage: 'mirissa-ella-short'
  },
  {
    id: 'ella-train',
    title: 'Ella to Demodara Train',
    location: 'Ella',
    description: 'One of the most scenic railway routes in the world, passing through tea estates and the Nine Arch Bridge.',
    imageUrl: '/Images/Ella to Demodara Train.png',
    category: 'Experience',
    tourPackage: 'mirissa-ella-short'
  },
  {
    id: 'nanuoya-train',
    title: 'Ella to Nanu Oya Train',
    location: 'Hill Country',
    description: 'A 3-hour scenic journey through the heart of Sri Lanka\'s hill country with stunning views.',
    imageUrl: '/Images/Ella to Nanu Oya Train.jpg',
    category: 'Experience',
    tourPackage: 'mirissa-ella-extended'
  },
  {
    id: 'horton-plains',
    title: "World's End",
    location: 'Horton Plains',
    description: 'A sheer cliff with an 880m drop offering views to the coast on clear days. A must-visit natural wonder.',
    imageUrl: '/Images/horton plans.jpg',
    category: 'Nature',
    tourPackage: 'mirissa-ella-extended'
  },
  {
    id: 'tea-factory',
    title: 'Tea Factory Visit',
    location: 'Nuwara Eliya',
    description: 'Learn the art of Ceylon tea production from leaf to cup, with tastings and photo opportunities.',
    imageUrl: '/Images/tea factory.jpg',
    category: 'Experience',
    tourPackage: 'mirissa-ella-extended'
  },
  {
    id: 'gregory-lake',
    title: 'Gregory Lake',
    location: 'Nuwara Eliya',
    description: 'A beautiful lake offering boat rides, horse riding, and scenic walks in Little England.',
    imageUrl: '/Images/Lake Gregory.jpg',
    category: 'Scenic',
    tourPackage: 'mirissa-ella-extended'
  },
  {
    id: 'post-office',
    title: 'Nuwara Eliya Post Office',
    location: 'Nuwara Eliya',
    description: 'A charming Tudor-style colonial post office, still functioning and perfect for sending postcards.',
    imageUrl: '/Images/post office.jpg',
    category: 'Heritage',
    tourPackage: 'mirissa-ella-extended'
  },
  {
    id: 'ambuluwawa',
    title: 'Ambuluwawa Tower',
    location: 'Gampola',
    description: 'A spiral tower offering 360° panoramic views of mountains, forests, and villages.',
    imageUrl: '/Images/Ambuluwawa.jpg',
    category: 'Viewpoint',
    tourPackage: 'mirissa-nuwara-tour'
  },
  {
    id: 'temple-of-tooth',
    title: 'Temple of the Sacred Tooth',
    location: 'Kandy',
    description: 'UNESCO World Heritage site housing Buddha\'s tooth relic in the royal palace complex.',
    imageUrl: '/Images/Temple of the Tooth.jpg',
    category: 'Culture',
    tourPackage: 'mirissa-nuwara-tour'
  },
  {
    id: 'view-point',
    title: 'Kandy View Point',
    location: 'Kandy',
    description: 'Stunning panoramic views of Kandy city, the sacred lake, and surrounding mountains.',
    imageUrl: '/Images/viewpoint.jpg',
    category: 'Viewpoint',
    tourPackage: 'mirissa-nuwara-tour'
  },
  {
    id: 'gem-museum',
    title: 'Gem Museum',
    location: 'Ratnapura',
    description: 'Discover Sri Lanka\'s 2,500-year gem mining history with sapphires, rubies, and cat\'s eyes.',
    imageUrl: '/Images/gem museum.jpg',
    category: 'Culture',
    tourPackage: 'mirissa-nuwara-tour'
  },
  {
    id: 'kandyan-dance',
    title: 'Kandyan Dance Show',
    location: 'Kandy',
    description: 'Classical dance performance with elaborate costumes, rhythmic drumming, and fire walking finale.',
    imageUrl: '/Images/Kandy Dance.jpg',
    category: 'Culture',
    tourPackage: 'mirissa-nuwara-tour'
  }
];

// Tour package names for display
export const TOUR_PACKAGE_NAMES: Record<string, string> = {
  'mirissa-ella-short': 'Mirissa to Ella Tour',
  'mirissa-ella-extended': 'Nuwara Eliya Tour',
  'mirissa-nuwara-tour': 'Kandy Tour',
  'custom-full-tour': 'Full Custom Tour'
}; 