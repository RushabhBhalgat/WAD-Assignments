import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { type ExtendedBlogPost } from '@shared/schema';
import { format } from 'date-fns';

const HeroSection: React.FC = () => {
  const { ref: leftSectionRef, inView: leftSectionInView } = useScrollAnimation();
  const { ref: rightSectionRef, inView: rightSectionInView } = useScrollAnimation();

  const { data: featuredPosts, isLoading, error } = useQuery<ExtendedBlogPost[]>({
    queryKey: ['/api/posts/featured'],
  });

  const getFeaturedPost = () => {
    if (isLoading || error || !featuredPosts?.length) return null;
    return featuredPosts[0];
  };

  const featuredPost = getFeaturedPost();

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-pattern">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 -z-10"></div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            ref={leftSectionRef}
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={leftSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent font-medium mb-4">
              Welcome to my blog
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight mb-6">
              Exploring <span className="text-primary">Technology</span> Through Indian Lenses
            </h1>
            <p className="text-gray-700 text-lg mb-8">
              Join Aarav Sharma on a journey through the world of web development, cloud computing, and emerging technologies with an Indian perspective.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/blog" className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition duration-300 text-center">
                Read Blog
              </Link>
              <Link href="/about" className="px-8 py-3 rounded-full border-2 border-primary text-primary font-medium hover:bg-primary hover:text-white transition duration-300 text-center">
                About Me
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            ref={rightSectionRef}
            className="md:w-1/2 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={rightSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {featuredPost ? (
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img 
                  src={featuredPost.imageUrl} 
                  alt={featuredPost.title} 
                  className="w-full object-cover h-64 md:h-96"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent flex flex-col justify-end p-6">
                  <span className="bg-accent text-white text-sm px-3 py-1 rounded-full inline-block mb-3 w-fit">Latest Post</span>
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{featuredPost.title}</h3>
                  <p className="text-gray-200 mb-4 line-clamp-2">{featuredPost.summary}</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary rounded-full mr-3 flex items-center justify-center text-white font-bold">
                      {featuredPost.author.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-medium">Aarav Sharma</p>
                      <p className="text-gray-300 text-sm">
                        {format(new Date(featuredPost.publishedDate), 'MMM dd, yyyy')} · {featuredPost.readTime} min read
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden shadow-xl bg-gray-100 h-64 md:h-96 flex items-center justify-center">
                <div className="text-gray-500">Loading featured post...</div>
              </div>
            )}
            <div className="absolute -bottom-4 -right-4 -z-10 w-full h-full rounded-xl bg-secondary"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
