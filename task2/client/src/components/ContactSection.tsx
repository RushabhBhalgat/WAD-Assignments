import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { FaEnvelope, FaMapMarkerAlt, FaGlobe, FaTwitter, FaLinkedinIn, FaGithub, FaDev } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref: leftSectionRef, inView: leftSectionInView } = useScrollAnimation();
  const { ref: rightSectionRef, inView: rightSectionInView } = useScrollAnimation();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon."
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-10">
          <motion.div
            ref={leftSectionRef}
            className="md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={leftSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium mb-4">Get In Touch</span>
            <h2 className="text-3xl font-bold font-poppins mb-6">Have a Question or Project Idea?</h2>
            <p className="text-gray-700 mb-6">
              Feel free to reach out if you have any questions about my articles, want to collaborate, 
              or need consulting for your project. I'll get back to you as soon as possible!
            </p>
            
            <div className="flex flex-col space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-medium">aarav.sharma@techbharat.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-4">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Location</p>
                  <p className="font-medium">Bangalore, India</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mr-4">
                  <FaGlobe />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Social</p>
                  <div className="flex space-x-4 mt-1">
                    <a href="#" className="text-gray-600 hover:text-primary transition">
                      <FaTwitter />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary transition">
                      <FaLinkedinIn />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary transition">
                      <FaGithub />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary transition">
                      <FaDev />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold font-poppins">Available For:</h3>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">Technical Writing</span>
                <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700">Consulting</span>
                <span className="text-sm px-3 py-1 rounded-full bg-purple-100 text-purple-700">Speaking</span>
                <span className="text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">Workshops</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            ref={rightSectionRef}
            className="md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={rightSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gray-50 rounded-xl p-6 lg:p-8 shadow-lg">
              <h3 className="text-xl font-bold font-poppins mb-6">Send Me a Message</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-700 font-medium">Message</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition duration-300 disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
