import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-lanka-green text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="font-serif text-3xl font-bold mb-6 text-lanka-gold">Love Sri Lanka</h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              The official travel portal for the paradise island of Sri Lanka. Explore our heritage, embrace our culture, and enjoy our hospitality.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-lanka-gold hover:border-lanka-gold hover:text-lanka-green transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 tracking-wide">Explore</h3>
            <ul className="space-y-4 text-white/70">
              <li><a href="#" className="hover:text-lanka-gold transition-colors">Destinations</a></li>
              <li><a href="#" className="hover:text-lanka-gold transition-colors">Experiences</a></li>
              <li><a href="#" className="hover:text-lanka-gold transition-colors">Festivals</a></li>
              <li><a href="#" className="hover:text-lanka-gold transition-colors">Map</a></li>
              <li><a href="#" className="hover:text-lanka-gold transition-colors">Visa Information</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 tracking-wide">Contact</h3>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-start gap-3">
                <span className="block w-6 text-lanka-gold font-bold">A:</span>
                <span>80 Galle Road, Colombo 03,<br />Sri Lanka</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="block w-6 text-lanka-gold font-bold">E:</span>
                <a href="mailto:hello@lovesrilanka.org" className="hover:text-white">hello@lovesrilanka.org</a>
              </li>
              <li className="flex items-start gap-3">
                <span className="block w-6 text-lanka-gold font-bold">T:</span>
                <span>+94 11 234 5678</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-6 tracking-wide">Newsletter</h3>
            <p className="text-white/70 mb-4 text-sm">Subscribe to get the latest updates and offers.</p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border border-white/20 rounded px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:border-lanka-gold"
              />
              <button className="bg-lanka-gold text-lanka-green font-bold py-3 px-4 rounded hover:bg-white transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} Love Sri Lanka. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;