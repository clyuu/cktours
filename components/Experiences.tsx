import React from 'react';
import { Link } from 'react-router-dom';
import { FaCamera, FaCoffee, FaWater, FaMountain } from 'react-icons/fa';

const experiences = [
  {
    id: '1',
    title: 'Wildlife Safaris',
    icon: <FaCamera className="w-8 h-8" />,
    description: 'Spot leopards in Yala or witness the gathering of elephants in Minneriya.',
    color: 'bg-emerald-100 text-emerald-800',
    link: '/tours',
    tourPackage: 'custom-full-tour'
  },
  {
    id: '2',
    title: 'Ceylon Tea Trails',
    icon: <FaCoffee className="w-8 h-8" />,
    description: 'Visit tea factories and taste Ceylon\'s finest tea in Nuwara Eliya.',
    color: 'bg-amber-100 text-amber-800',
    link: '/destination/tea-factory',
    tourPackage: 'mirissa-ella-extended'
  },
  {
    id: '3',
    title: 'Pristine Beaches',
    icon: <FaWater className="w-8 h-8" />,
    description: 'Enjoy whale watching and surf the golden waves of Mirissa.',
    color: 'bg-blue-100 text-blue-800',
    link: '/tours',
    tourPackage: 'mirissa-ella-short'
  },
  {
    id: '4',
    title: 'Hill Country',
    icon: <FaMountain className="w-8 h-8" />,
    description: 'Ride the scenic train to Ella and explore Horton Plains.',
    color: 'bg-stone-100 text-stone-800',
    link: '/destination/ella-train',
    tourPackage: 'mirissa-ella-short'
  }
];

const Experiences: React.FC = () => {
  return (
    <section id="experiences" className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
          <span className="text-lanka-green font-bold tracking-widest uppercase text-xs sm:text-sm">Things to Do</span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-2 mb-4 md:mb-6">Curated Experiences</h2>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            Whether you are an adrenaline junkie, a history buff, or someone looking for serenity, 
            Sri Lanka offers a kaleidoscope of experiences tailored just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {experiences.map((exp) => (
            <div key={exp.id} className="p-5 md:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white group">
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6 ${exp.color} group-hover:scale-110 transition-transform`}>
                {React.cloneElement(exp.icon, { className: 'w-6 h-6 md:w-8 md:h-8' })}
              </div>
              <h3 className="font-serif text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">{exp.title}</h3>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-3 md:mb-4">{exp.description}</p>
              <Link 
                to={exp.link} 
                state={{ selectedPackage: exp.tourPackage }}
                className="text-lanka-green font-semibold text-xs md:text-sm hover:underline"
              >
                Learn more
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
