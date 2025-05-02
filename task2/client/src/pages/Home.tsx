import HeroSection from '@/components/HeroSection';
import FeaturedPosts from '@/components/FeaturedPosts';
import BlogSection from '@/components/BlogSection';
import CodeExampleSection from '@/components/CodeExampleSection';
import AboutSection from '@/components/AboutSection';
import NewsletterSection from '@/components/NewsletterSection';
import ContactSection from '@/components/ContactSection';
import { useEffect } from 'react';

const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'TechBharat - Aarav Sharma\'s Technical Blog';
  }, []);

  return (
    <>
      <HeroSection />
      <FeaturedPosts />
      <BlogSection />
      <CodeExampleSection />
      <AboutSection />
      <NewsletterSection />
      <ContactSection />
    </>
  );
};

export default Home;
