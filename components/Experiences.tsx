import React from 'react';
import { Camera, Coffee, Waves, Mountain } from 'lucide-react';

const experiences = [
  {
    id: '1',
    title: 'Wildlife Safaris',
    icon: <Camera size={32} />,
    description: 'Spot leopards in Yala or witness the gathering of elephants in Minneriya.',
    color: 'bg-emerald-100 text-emerald-800'
  },
  {
    id: '2',
    title: 'Ceylon Tea Trails',
    icon: <Coffee size={32} />,
    description: 'Walk through lush green plantations and taste the world’s finest tea.',
    color: 'bg-amber-100 text-amber-800'
  },
  {
    id: '3',
    title: 'Pristine Beaches',
    icon: <Waves size={32} />,
    description: 'Surf in Arugam Bay or relax on the golden sands of Mirissa.',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: '4',
    title: 'Hill Country',
    icon: <Mountain size={32} />,
    description: 'Ride the iconic blue train to Ella and hike through misty peaks.',
    color: 'bg-stone-100 text-stone-800'
  }
];

const Experiences: React.FC = () => {
  return (
    <section id="experiences" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-lanka-green font-bold tracking-widest uppercase text-sm">Things to Do</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-6">Curated Experiences</h2>
          <p className="text-slate-600 leading-relaxed">
            Whether you are an adrenaline junkie, a history buff, or someone looking for serenity, 
            Sri Lanka offers a kaleidoscope of experiences tailored just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((exp) => (
            <div key={exp.id} className="p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white group">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${exp.color} group-hover:scale-110 transition-transform`}>
                {exp.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">{exp.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{exp.description}</p>
              <a href="#" className="text-lanka-green font-semibold text-sm hover:underline">Learn more</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;