import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { type ExtendedBlogPost } from '@shared/schema';
import { format } from 'date-fns';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import SyntaxHighlighter from '@/components/SyntaxHighlighter';
import NewsletterSection from '@/components/NewsletterSection';

const BlogPost: React.FC = () => {
  const { slug } = useParams();
  
  const { data: post, isLoading, error } = useQuery<ExtendedBlogPost>({
    queryKey: ['/api/posts', slug],
    enabled: !!slug
  });

  useEffect(() => {
    if (post) {
      document.title = `${post.title} - TechBharat`;
    } else {
      document.title = 'Blog Post - TechBharat';
    }
  }, [post]);

  // Function to render content with code blocks
  const renderContent = (content: string) => {
    // This is a simple implementation - a more robust solution would use a markdown parser
    const parts = content.split('```');
    
    return parts.map((part, index) => {
      // Even indexes are regular text, odd indexes are code blocks
      if (index % 2 === 0) {
        return <p key={index} className="mb-4">{part}</p>;
      } else {
        // Extract language and code
        const codeLines = part.split('\n');
        const language = codeLines[0] || 'javascript';
        const code = codeLines.slice(1).join('\n');
        
        return (
          <div key={index} className="mb-6">
            <SyntaxHighlighter language={language} code={code} />
          </div>
        );
      }
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse w-full max-w-4xl">
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-10"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold font-poppins mb-6 text-gray-800">
          Blog Post Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The blog post you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/blog" className="inline-flex items-center text-primary font-medium">
          <ArrowLeft size={16} className="mr-2" /> Back to all posts
        </Link>
      </div>
    );
  }

  return (
    <>
      <motion.article
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-primary font-medium mb-8 hover:underline">
            <ArrowLeft size={16} className="mr-2" /> Back to all posts
          </Link>
          
          <div className="mb-8">
            <span className={`inline-block px-3 py-1 rounded-full ${post.category.bgColor} text-${post.category.color} font-medium mb-4`}>
              {post.category.name}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-gray-600 gap-x-6 gap-y-2 mb-6">
              <div className="flex items-center">
                <User size={16} className="mr-1" />
                <span>Aarav Sharma</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>{format(new Date(post.publishedDate), 'MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <span key={tag.id} className={`text-xs px-2 py-1 rounded-full ${tag.bgColor} ${tag.color}`}>
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden mb-8">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-auto object-cover" 
            />
          </div>
          
          <div className="prose prose-lg max-w-none mb-10">
            {renderContent(post.content)}
          </div>
          
          <div className="border-t border-gray-200 pt-8 mt-10">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-full mr-4 flex items-center justify-center text-white text-xl font-bold">
                {post.author.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-bold font-poppins">Aarav Sharma</h3>
                <p className="text-gray-600">
                  Full-stack developer with 8+ years of experience, specializing in MERN stack and cloud architecture.
                </p>
              </div>
            </div>
            
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex gap-3">
                <a href="#" className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
                  Share on Twitter
                </a>
                <a href="#" className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
                  Share on LinkedIn
                </a>
              </div>
              <a href="#comments" className="px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition">
                Discuss
              </a>
            </div>
          </div>
        </div>
      </motion.article>
      
      <NewsletterSection />
    </>
  );
};

export default BlogPost;
