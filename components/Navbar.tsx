import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '';
  const useTransparentStart = isHomePage;
  const isLightMode = !useTransparentStart || isScrolled;

  useEffect(() => {
    let rafId = 0;

    const handleScroll = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 40;
        setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
        rafId = 0;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [location.pathname]);

  const navLinks = [
    { name: 'Destinations', href: '#destinations', isRoute: false },
    { name: 'Pickup', href: '/transfers', isRoute: true },
    { name: 'Plan Your Trip', href: '/tours', isRoute: true },
    { name: 'Reviews', href: '/reviews', isRoute: true },
    { name: 'Events', href: '/events', isRoute: true },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Search destinations
      const query = searchQuery.toLowerCase();
      const destinations = ['sigiriya', 'kandy', 'ella', 'mirissa', 'galle', 'nuwara eliya', 'dambulla', 'polonnaruwa', 'anuradhapura', 'yala', 'udawalawe', 'arugam bay', 'trincomalee', 'jaffna'];
      const match = destinations.find(d => d.includes(query));
      
      if (match) {
        window.location.href = '/tours';
      } else {
        alert(`Searching for: ${searchQuery}\n\nContact us for custom tours to this location!`);
      }
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isLightMode
            ? 'bg-white/80 backdrop-blur-lg text-slate-900 shadow-lg py-3 border-b border-white/20'
            : 'bg-transparent backdrop-blur-0 text-white py-4 border-b border-transparent shadow-none'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-50">
            <span className={`text-2xl font-serif font-bold tracking-tight ${isLightMode ? 'text-lanka-green' : 'text-white drop-shadow-lg'}`}>
              C&K Tours
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-medium text-sm uppercase tracking-wider hover:text-lanka-gold transition-colors ${
                    isLightMode ? 'text-slate-700' : 'text-white/95 drop-shadow'
                  }`}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={isHomePage ? link.href : `/${link.href}`}
                  className={`font-medium text-sm uppercase tracking-wider hover:text-lanka-gold transition-colors ${
                    isLightMode ? 'text-slate-700' : 'text-white/95 drop-shadow'
                  }`}
                >
                  {link.name}
                </a>
              )
            ))}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-full transition-all duration-300 ${
                isLightMode
                  ? 'hover:bg-lanka-green/10 text-slate-700 hover:text-lanka-green'
                  : 'hover:bg-white/20 text-white'
              }`}
            >
              <FaSearch className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <FaTimes className={`w-7 h-7 ${isLightMode ? 'text-slate-900' : 'text-white'}`} />
            ) : (
              <FaBars className={`w-7 h-7 ${isLightMode ? 'text-slate-900' : 'text-white'}`} />
            )}
          </button>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="absolute top-0 left-0 w-full h-screen bg-lanka-green text-white flex flex-col items-center justify-center space-y-8 z-40">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-2xl font-serif hover:text-lanka-gold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={isHomePage ? link.href : `/${link.href}`}
                    className="text-2xl font-serif hover:text-lanka-gold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>
          )}
        </div>
      </nav>

    {/* Search Modal */}
    {isSearchOpen && (
      <div 
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20"
        onClick={() => setIsSearchOpen(false)}
      >
        <div 
          className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSearch} className="flex items-center p-4">
            <FaSearch className="w-6 h-6 text-lanka-green ml-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations... (Ella, Kandy, Sigiriya...)"
              className="flex-1 px-4 py-3 text-lg text-slate-800 bg-transparent focus:outline-none"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <FaTimes className="w-5 h-5 text-slate-500" />
            </button>
          </form>
          <div className="border-t border-slate-100 p-4">
            <p className="text-sm text-slate-500 mb-3">Popular Destinations</p>
            <div className="flex flex-wrap gap-2">
              {['Sigiriya', 'Kandy', 'Ella', 'Mirissa', 'Galle', 'Nuwara Eliya'].map((dest) => (
                <Link
                  key={dest}
                  to="/tours"
                  onClick={() => setIsSearchOpen(false)}
                  className="px-4 py-2 bg-lanka-sand hover:bg-lanka-green hover:text-white rounded-full text-sm text-slate-700 transition-colors"
                >
                  {dest}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default Navbar;