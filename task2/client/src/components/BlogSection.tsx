import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { type ExtendedBlogPost, type Category } from '@shared/schema';
import BlogCard from './BlogCard';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const BlogSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { ref: titleRef, inView: titleInView } = useScrollAnimation();
  const { ref: categoriesRef, inView: categoriesInView } = useScrollAnimation();
  const { ref: loadMoreRef, inView: loadMoreInView } = useScrollAnimation();

  const { data: categories, isLoading: isLoadingCategories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const { data: allPosts, isLoading: isLoadingPosts } = useQuery<ExtendedBlogPost[]>({
    queryKey: ['/api/posts'],
  });

  const { data: categoryPosts, isLoading: isLoadingCategoryPosts } = useQuery<ExtendedBlogPost[]>({
    queryKey: ['/api/categories', activeCategory, 'posts'],
    enabled: !!activeCategory,
  });

  const posts = activeCategory ? categoryPosts : allPosts;
  const [displayCount, setDisplayCount] = useState(6);

  const handleCategoryClick = (slug: string | null) => {
    setActiveCategory(slug);
    setDisplayCount(6);
  };

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 3);
  };

  const isLoading = isLoadingPosts || (activeCategory && isLoadingCategoryPosts);

  return (
    <section id="blog" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={titleRef}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium">Blog Posts</span>
          <h2 className="text-3xl font-bold font-poppins mt-2 mb-4">Latest Articles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover insights, tutorials, and perspectives on web development, cloud architecture, and emerging technologies
          </p>
        </motion.div>
        
        <motion.div 
          ref={categoriesRef}
          className="mb-8 flex items-center justify-center flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <button 
            className={`category-btn px-5 py-2 rounded-full font-medium hover:opacity-90 transition
                      ${activeCategory === null ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            onClick={() => handleCategoryClick(null)}
          >
            All
          </button>
          
          {isLoadingCategories ? (
            <div className="w-20 h-10 bg-gray-200 animate-pulse rounded-full"></div>
          ) : (
            categories?.map(category => (
              <button 
                key={category.id}
                className={`category-btn px-5 py-2 rounded-full font-medium hover:opacity-90 transition
                          ${activeCategory === category.slug ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                onClick={() => handleCategoryClick(category.slug)}
              >
                {category.name}
              </button>
            ))
          )}
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: displayCount }).map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-xl h-96 animate-pulse"></div>
            ))
          ) : posts?.length ? (
            posts.slice(0, displayCount).map((post, index) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-10 text-gray-500">
              No posts available for this category
            </div>
          )}
        </div>
        
        {posts && displayCount < posts.length && (
          <motion.div 
            ref={loadMoreRef}
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={loadMoreInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button 
              onClick={handleLoadMore}
              className="px-6 py-3 rounded-full bg-white text-primary border-2 border-primary font-medium hover:bg-primary hover:text-white transition duration-300"
            >
              Load More Articles
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
