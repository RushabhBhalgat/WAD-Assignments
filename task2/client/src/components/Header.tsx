import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center gradient-bg mr-3">
            <span className="text-white font-bold text-xl">TB</span>
          </div>
          <Link href="/" className="text-2xl font-bold text-primary font-poppins">
            Tech<span className="text-accent">Bharat</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className={`nav-item font-medium ${location === '/' ? 'text-primary' : ''}`}>Home</Link>
          <Link href="/blog" className={`nav-item font-medium ${location === '/blog' || location.startsWith('/blog/') ? 'text-primary' : ''}`}>Blog</Link>
          <Link href="/about" className={`nav-item font-medium ${location === '/about' ? 'text-primary' : ''}`}>About</Link>
          <Link href="/contact" className={`nav-item font-medium ${location === '/contact' ? 'text-primary' : ''}`}>Contact</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/contact" className="hidden md:block px-5 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition duration-300">
            Subscribe
          </Link>
          <button className="md:hidden text-2xl" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white p-4 shadow-md">
          <div className="flex flex-col space-y-3">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`font-medium py-2 ${location === '/' ? 'text-primary' : ''}`}>Home</Link>
            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className={`font-medium py-2 ${location === '/blog' || location.startsWith('/blog/') ? 'text-primary' : ''}`}>Blog</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className={`font-medium py-2 ${location === '/about' ? 'text-primary' : ''}`}>About</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`font-medium py-2 ${location === '/contact' ? 'text-primary' : ''}`}>Contact</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="px-5 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium text-center">Subscribe</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
