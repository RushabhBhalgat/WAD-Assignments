import { Link } from 'wouter';
import { FaTwitter, FaLinkedinIn, FaGithub, FaDev, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row mb-10">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center gradient-bg mr-3">
                <span className="text-white font-bold text-xl">TB</span>
              </div>
              <Link href="/" className="text-2xl font-bold text-white font-poppins">
                Tech<span className="text-accent">Bharat</span>
              </Link>
            </div>
            <p className="text-gray-400 mb-4">
              Exploring technology through an Indian perspective. Tutorials, insights, and solutions for modern web development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Twitter">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="LinkedIn">
                <FaLinkedinIn size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="GitHub">
                <FaGithub size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Dev.to">
                <FaDev size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="YouTube">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>
          
          <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 font-poppins">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition">About Me</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 font-poppins">Categories</h3>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition">Web Development</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition">MERN Stack</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition">Cloud Computing</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition">DevOps</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition">AI & ML</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 font-poppins">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition">Projects</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition">Tutorials</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition">Code Snippets</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Newsletter</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} TechBharat. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
