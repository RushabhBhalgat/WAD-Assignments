import { useState } from 'react';
import { motion } from 'framer-motion';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { useToast } from '@/hooks/use-toast';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref: sectionRef, inView: sectionInView } = useScrollAnimation();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16 gradient-bg text-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={sectionRef}
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white font-medium mb-4">Stay Updated</span>
          <h2 className="text-3xl font-bold font-poppins mb-4">Subscribe to My Newsletter</h2>
          <p className="text-gray-100 mb-8">
            Get weekly updates on the latest articles, tutorials, and tech insights directly to your inbox. 
            No spam, only valuable content!
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-6 py-3 rounded-full flex-grow text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-accent text-white font-medium hover:bg-accent/90 transition duration-300 whitespace-nowrap disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Subscribe'}
            </button>
          </form>
          
          <p className="text-gray-200 text-sm mt-4">
            By subscribing, you agree to receive emails from TechBharat. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
