import { useEffect } from 'react';
import { motion } from 'framer-motion';
import ContactSection from '@/components/ContactSection';

const Contact: React.FC = () => {
  useEffect(() => {
    document.title = 'Contact - TechBharat';
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
            Get In Touch
          </h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Have questions, want to collaborate, or need consultation? Reach out to me directly through this page.
          </p>
        </div>
      </motion.div>
      <ContactSection />
    </>
  );
};

export default Contact;
