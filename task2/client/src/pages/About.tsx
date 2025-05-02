import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AboutSection from '@/components/AboutSection';
import NewsletterSection from '@/components/NewsletterSection';

const About: React.FC = () => {
  useEffect(() => {
    document.title = 'About - TechBharat';
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
            About Me
          </h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Get to know more about Aarav Sharma, the author behind TechBharat and my journey in technology.
          </p>
        </div>
      </motion.div>
      <AboutSection />
      <NewsletterSection />
    </>
  );
};

export default About;
