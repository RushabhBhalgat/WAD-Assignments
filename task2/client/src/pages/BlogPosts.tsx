import { useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogSection from '@/components/BlogSection';

const BlogPosts: React.FC = () => {
  useEffect(() => {
    document.title = 'Blog - TechBharat';
  }, []);

  return (
    <>
      <motion.div
        className="bg-pattern py-16 md:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            Technical Blog Posts
          </h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Explore articles on web development, cloud architecture, and emerging technologies from an Indian perspective.
          </p>
        </div>
      </motion.div>
      <BlogSection />
    </>
  );
};

export default BlogPosts;
