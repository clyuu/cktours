import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Globe } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Destinations', href: '#destinations' },
    { name: 'Things to Do', href: '#experiences' },
    { name: 'Plan Your Trip', href: '#planner' },
    { name: 'Events', href: '#' },
    { name: 'Stories', href: '#' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white text-slate-900 shadow-md py-4' : 'bg-transparent text-white py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 z-50">
          <span className={`text-2xl font-serif font-bold tracking-tight ${isScrolled ? 'text-lanka-green' : 'text-white'}`}>
            C&K Tours
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`font-medium text-sm uppercase tracking-wider hover:text-lanka-gold transition-colors ${isScrolled ? 'text-slate-700' : 'text-white/90'
                }`}
            >
              {link.name}
            </a>
          ))}
          <button className={`p-2 rounded-full transition-colors ${isScrolled ? 'hover:bg-slate-100' : 'hover:bg-white/10'}`}>
            <Search size={20} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X size={28} className={isScrolled ? 'text-slate-900' : 'text-white'} />
          ) : (
            <Menu size={28} className={isScrolled ? 'text-slate-900' : 'text-white'} />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-lanka-green text-white flex flex-col items-center justify-center space-y-8 z-40">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-2xl font-serif hover:text-lanka-gold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;