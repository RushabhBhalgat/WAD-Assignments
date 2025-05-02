import { motion } from 'framer-motion';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const AboutSection: React.FC = () => {
  const { ref: leftSectionRef, inView: leftSectionInView } = useScrollAnimation();
  const { ref: rightSectionRef, inView: rightSectionInView } = useScrollAnimation();
  
  const skillTags = [
    { name: 'React', color: 'bg-blue-100 text-blue-700' },
    { name: 'Node.js', color: 'bg-green-100 text-green-700' },
    { name: 'Express', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'MongoDB', color: 'bg-red-100 text-red-700' },
    { name: 'GraphQL', color: 'bg-purple-100 text-purple-700' },
    { name: 'TypeScript', color: 'bg-indigo-100 text-indigo-700' },
    { name: 'Next.js', color: 'bg-pink-100 text-pink-700' },
    { name: 'AWS', color: 'bg-cyan-100 text-cyan-700' }
  ];
  
  const statsData = [
    { value: '120+', label: 'Articles Published', color: 'text-primary' },
    { value: '15k+', label: 'Monthly Readers', color: 'text-secondary' },
    { value: '8+', label: 'Years Experience', color: 'text-accent' },
    { value: '30+', label: 'Projects Completed', color: 'text-green-500' }
  ];

  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.div
            ref={leftSectionRef}
            className="md:w-2/5"
            initial={{ opacity: 0, y: 20 }}
            animate={leftSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7" 
                alt="Aarav Sharma - Tech Blogger" 
                className="w-full rounded-xl shadow-lg object-cover"
              />
              <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full rounded-xl bg-primary"></div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                <div className="flex flex-col items-center">
                  <h3 className="font-bold text-xl mb-1 font-poppins text-primary">Aarav Sharma</h3>
                  <p className="text-gray-600 text-sm mb-2">Full-stack Developer</p>
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-600 hover:text-primary transition">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary transition">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-primary transition">
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            ref={rightSectionRef}
            className="md:w-3/5"
            initial={{ opacity: 0, y: 20 }}
            animate={rightSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent font-medium mb-4">About Me</span>
            <h2 className="text-3xl font-bold font-poppins mb-6">Bringing Indian Perspective to Global Tech</h2>
            <p className="text-gray-700 mb-4">
              Hi, I'm Aarav Sharma, a full-stack developer based in Bangalore with over 8 years of experience building 
              web applications using the MERN stack. I've worked with startups and established companies across fintech, 
              e-commerce, and edtech sectors.
            </p>
            <p className="text-gray-700 mb-4">
              My passion lies in creating scalable, efficient web applications and sharing my knowledge with the developer community. 
              Through this blog, I aim to simplify complex technical concepts and provide practical solutions to real-world problems.
            </p>
            <p className="text-gray-700 mb-6">
              When I'm not coding, you can find me speaking at tech conferences, contributing to open-source projects, 
              or exploring the mountains of Northern India.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {statsData.map((stat, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {skillTags.map((tag, index) => (
                <span key={index} className={`text-sm px-3 py-1 rounded-full ${tag.color}`}>
                  {tag.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
