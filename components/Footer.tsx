import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: FaFacebook, href: 'https://web.facebook.com/profile.php?id=61585774623764', label: 'Facebook' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaYoutube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-lanka-green text-white pt-12 md:pt-20 pb-8 md:pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">

          {/* Brand Column */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-lanka-gold">C&K Tours</h2>
            <p className="text-white/70 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
              Your trusted travel partner in Sri Lanka. Experience the best tours, airport transfers, and personalized travel services.
            </p>
            <div className="flex space-x-3 md:space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-lanka-gold hover:border-lanka-gold hover:text-lanka-green transition-all"
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              );})}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base md:text-lg mb-4 md:mb-6 tracking-wide">Explore</h3>
            <ul className="space-y-3 md:space-y-4 text-white/70 text-sm md:text-base">
              <li><a href="/#destinations" className="hover:text-lanka-gold transition-colors">Destinations</a></li>
              <li><a href="/tours" className="hover:text-lanka-gold transition-colors">Tours</a></li>
              <li><a href="/events" className="hover:text-lanka-gold transition-colors">Festivals</a></li>
              <li><a href="/transfers" className="hover:text-lanka-gold transition-colors">Transfers</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-base md:text-lg mb-4 md:mb-6 tracking-wide">Contact</h3>
            <ul className="space-y-3 md:space-y-4 text-white/70 text-sm md:text-base">
              <li className="flex items-start gap-2 md:gap-3">
                <span className="block w-5 md:w-6 text-lanka-gold font-bold">A:</span>
                <span>Near the railway station,<br />Mirissa North, Mirissa</span>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="block w-5 md:w-6 text-lanka-gold font-bold">E:</span>
                <a href="mailto:cktours@gmail.com" className="hover:text-white break-all">cktours@gmail.com</a>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="block w-5 md:w-6 text-lanka-gold font-bold">T:</span>
                <a href="https://wa.me/94719567600" className="hover:text-white">+94 71 956 7600</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-base md:text-lg mb-4 md:mb-6 tracking-wide">Newsletter</h3>
            <p className="text-white/70 mb-3 md:mb-4 text-xs md:text-sm">Subscribe to get the latest updates and offers.</p>
            <div className="flex flex-col gap-2 md:gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border border-white/20 rounded px-3 md:px-4 py-2.5 md:py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:border-lanka-gold"
              />
              <button className="bg-lanka-gold text-lanka-green font-bold py-2.5 md:py-3 px-4 rounded hover:bg-white transition-colors text-sm md:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-white/50 gap-4 md:gap-0">
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} C&K Tours. All rights reserved.</p>
          <div className="flex space-x-4 md:space-x-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;