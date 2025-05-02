import { Link } from 'wouter';
import { type ExtendedBlogPost } from '@shared/schema';
import { format } from 'date-fns';

interface BlogCardProps {
  post: ExtendedBlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="blog-card h-full">
      <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full border border-gray-100">
        <div className="relative">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-48 object-cover" 
          />
          <div className={`absolute top-4 left-4 ${post.category.bgColor} text-${post.category.color} text-xs px-2 py-1 rounded-full`}>
            {post.category.name}
          </div>
        </div>
        <div className="p-6">
          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-xl font-bold mb-3 font-poppins hover:text-primary transition-colors cursor-pointer">
              {post.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-4 line-clamp-3">{post.summary}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag.id} className={`text-xs px-2 py-1 rounded-full ${tag.bgColor} ${tag.color}`}>
                #{tag.name}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-full mr-2 flex items-center justify-center text-white font-bold">
                {post.author.username.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-700 text-sm">Aarav Sharma</span>
            </div>
            <span className="text-gray-500 text-sm">
              {format(new Date(post.publishedDate), 'MMM dd, yyyy')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
