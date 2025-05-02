import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { type ExtendedBlogPost } from '@shared/schema';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BlogCard from './BlogCard';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const FeaturedPosts: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { ref: sectionRef, inView: sectionInView } = useScrollAnimation();

  const { data: featuredPosts, isLoading, error } = useQuery<ExtendedBlogPost[]>({
    queryKey: ['/api/posts/featured'],
  });

  const updateItemWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        return 100; // 100% on mobile
      } else if (window.innerWidth < 1024) {
        return 50; // 50% on tablet
      } else {
        return 33.33; // 33.33% on desktop
      }
    }
    return 33.33;
  };

  const [itemWidth, setItemWidth] = useState(updateItemWidth());

  useEffect(() => {
    const handleResize = () => {
      setItemWidth(updateItemWidth());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const itemCount = featuredPosts?.length || 0;

  const handlePrev = () => {
    setCurrentPosition(Math.max(currentPosition - 1, 0));
  };

  const handleNext = () => {
    const maxPosition = Math.ceil(itemCount - (100 / itemWidth));
    setCurrentPosition(Math.min(currentPosition + 1, maxPosition));
  };

  return (
    <section id="featured" className="py-16 bg-white">
      <div className="container mx-auto px-4" ref={sectionRef}>
        <div className="flex justify-between items-center mb-10">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">Featured</span>
            <h2 className="text-3xl font-bold font-poppins mt-2">Popular Articles</h2>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
              disabled={currentPosition === 0}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
              disabled={currentPosition >= Math.ceil(itemCount - (100 / itemWidth))}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className="overflow-hidden">
          <div 
            ref={carouselRef}
            className="flex transition-transform duration-500 space-x-6"
            style={{ transform: `translateX(-${currentPosition * itemWidth}%)` }}
          >
            {isLoading ? (
              [1, 2, 3].map((index) => (
                <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-2">
                  <div className="bg-gray-100 rounded-xl h-96 animate-pulse"></div>
                </div>
              ))
            ) : error ? (
              <div className="w-full text-center py-10 text-red-500">
                Failed to load featured posts
              </div>
            ) : featuredPosts?.length ? (
              featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  className={`flex-shrink-0 w-full md:w-1/2 lg:w-1/3`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))
            ) : (
              <div className="w-full text-center py-10 text-gray-500">
                No featured posts available
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition"
          >
            View all articles
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
