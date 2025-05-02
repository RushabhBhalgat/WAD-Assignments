import { 
  users, type User, type InsertUser,
  blogPosts, type BlogPost, type InsertBlogPost,
  categories, type Category, type InsertCategory,
  tags, type Tag, type InsertTag,
  postTags, type PostTag, type InsertPostTag,
  type ExtendedBlogPost
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Blog post methods
  getAllBlogPosts(): Promise<ExtendedBlogPost[]>;
  getFeaturedBlogPosts(): Promise<ExtendedBlogPost[]>;
  getBlogPostsByCategory(categorySlug: string): Promise<ExtendedBlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<ExtendedBlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;

  // Category methods
  getAllCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Tag methods
  getAllTags(): Promise<Tag[]>;
  getTagsByPostId(postId: number): Promise<Tag[]>;
  createTag(tag: InsertTag): Promise<Tag>;
  
  // PostTag methods
  addTagToPost(postTag: InsertPostTag): Promise<PostTag>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private blogPosts: Map<number, BlogPost>;
  private categories: Map<number, Category>;
  private tags: Map<number, Tag>;
  private postTags: Map<number, PostTag>;
  
  private userIdCounter: number;
  private blogPostIdCounter: number;
  private categoryIdCounter: number;
  private tagIdCounter: number;
  private postTagIdCounter: number;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.categories = new Map();
    this.tags = new Map();
    this.postTags = new Map();
    
    this.userIdCounter = 1;
    this.blogPostIdCounter = 1;
    this.categoryIdCounter = 1;
    this.tagIdCounter = 1;
    this.postTagIdCounter = 1;
    
    // Initialize with seed data
    this.initializeData();
  }

  private initializeData() {
    // Create a user
    const user: User = {
      id: this.userIdCounter++,
      username: "aaravsharma",
      password: "hashed_password", // In a real app, this would be properly hashed
    };
    this.users.set(user.id, user);

    // Create categories
    const categories: InsertCategory[] = [
      { name: "Web Dev", slug: "web-dev", color: "white", bgColor: "bg-accent" },
      { name: "AI/ML", slug: "ai-ml", color: "white", bgColor: "bg-secondary" },
      { name: "Cloud", slug: "cloud", color: "white", bgColor: "bg-primary" },
      { name: "Database", slug: "database", color: "white", bgColor: "bg-green-500" },
      { name: "Security", slug: "security", color: "white", bgColor: "bg-yellow-500" },
      { name: "Architecture", slug: "architecture", color: "white", bgColor: "bg-blue-500" }
    ];
    
    categories.forEach(cat => this.createCategory(cat));

    // Create tags
    const tags: InsertTag[] = [
      { name: "MongoDB", slug: "mongodb", color: "text-green-700", bgColor: "bg-green-100" },
      { name: "Express", slug: "express", color: "text-green-700", bgColor: "bg-green-100" },
      { name: "React", slug: "react", color: "text-blue-700", bgColor: "bg-blue-100" },
      { name: "Node.js", slug: "nodejs", color: "text-blue-700", bgColor: "bg-blue-100" },
      { name: "TypeScript", slug: "typescript", color: "text-blue-700", bgColor: "bg-blue-100" },
      { name: "JavaScript", slug: "javascript", color: "text-purple-700", bgColor: "bg-purple-100" },
      { name: "TensorFlow", slug: "tensorflow", color: "text-orange-700", bgColor: "bg-orange-100" },
      { name: "ML", slug: "ml", color: "text-red-700", bgColor: "bg-red-100" },
      { name: "Python", slug: "python", color: "text-blue-700", bgColor: "bg-blue-100" },
      { name: "AWS", slug: "aws", color: "text-yellow-700", bgColor: "bg-yellow-100" },
      { name: "Serverless", slug: "serverless", color: "text-green-700", bgColor: "bg-green-100" },
      { name: "Microservices", slug: "microservices", color: "text-blue-700", bgColor: "bg-blue-100" },
      { name: "Performance", slug: "performance", color: "text-green-700", bgColor: "bg-green-100" },
      { name: "Database", slug: "database", color: "text-blue-700", bgColor: "bg-blue-100" },
      { name: "Security", slug: "security", color: "text-red-700", bgColor: "bg-red-100" },
      { name: "JWT", slug: "jwt", color: "text-blue-700", bgColor: "bg-blue-100" },
      { name: "Docker", slug: "docker", color: "text-green-700", bgColor: "bg-green-100" },
      { name: "Testing", slug: "testing", color: "text-purple-700", bgColor: "bg-purple-100" },
      { name: "Jest", slug: "jest", color: "text-red-700", bgColor: "bg-red-100" },
      { name: "Migration", slug: "migration", color: "text-orange-700", bgColor: "bg-orange-100" }
    ];
    
    tags.forEach(tag => this.createTag(tag));

    // Create blog posts
    const blogPosts: InsertBlogPost[] = [
      {
        title: "Building Scalable Microservices with Node.js and Docker",
        slug: "building-scalable-microservices-nodejs-docker",
        summary: "Learn how to build and deploy scalable microservices using Node.js and Docker, with practical examples and best practices.",
        content: "# Building Scalable Microservices with Node.js and Docker\n\nIn today's fast-paced digital world, building scalable applications is more important than ever. This article explores how to use Node.js and Docker to create microservices that can scale efficiently...",
        imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
        categoryId: 1,
        authorId: 1,
        isFeatured: true,
        publishedDate: new Date("2023-05-12"),
        readTime: 12
      },
      {
        title: "Complete Guide to MERN Stack Development in 2023",
        slug: "complete-guide-mern-stack-development-2023",
        summary: "Explore MongoDB, Express.js, React, and Node.js to build full-stack web applications with this comprehensive guide.",
        content: "# Complete Guide to MERN Stack Development in 2023\n\nThe MERN stack continues to be one of the most popular technology stacks for building full-stack web applications...",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        categoryId: 1,
        authorId: 1,
        isFeatured: true,
        publishedDate: new Date("2023-06-24"),
        readTime: 15
      },
      {
        title: "Getting Started with TensorFlow for Image Recognition",
        slug: "getting-started-tensorflow-image-recognition",
        summary: "Learn how to implement image recognition systems using TensorFlow with practical code examples and tutorials.",
        content: "# Getting Started with TensorFlow for Image Recognition\n\nImage recognition is a fascinating field of machine learning that enables computers to 'see' and identify objects...",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        categoryId: 2,
        authorId: 1,
        isFeatured: true,
        publishedDate: new Date("2023-05-18"),
        readTime: 10
      },
      {
        title: "Designing Resilient Microservices on AWS",
        slug: "designing-resilient-microservices-aws",
        summary: "Discover strategies for creating fault-tolerant microservice architectures using AWS services like Lambda, ECS, and API Gateway.",
        content: "# Designing Resilient Microservices on AWS\n\nMicroservices architecture has become the standard for building scalable and maintainable applications...",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
        categoryId: 3,
        authorId: 1,
        isFeatured: true,
        publishedDate: new Date("2023-04-05"),
        readTime: 18
      },
      {
        title: "10 React Performance Optimization Techniques You Should Know",
        slug: "10-react-performance-optimization-techniques",
        summary: "Learn how to boost your React application's performance with memoization, lazy loading, and code splitting techniques.",
        content: "# 10 React Performance Optimization Techniques You Should Know\n\nAs React applications grow in complexity, performance optimization becomes increasingly important...",
        imageUrl: "https://images.unsplash.com/photo-1602992708529-c9fdb12905c9",
        categoryId: 1,
        authorId: 1,
        isFeatured: false,
        publishedDate: new Date("2023-07-02"),
        readTime: 9
      },
      {
        title: "MongoDB Performance Tuning for High-Traffic Applications",
        slug: "mongodb-performance-tuning-high-traffic-applications",
        summary: "Discover advanced MongoDB optimization strategies including indexing, sharding, and query optimization techniques.",
        content: "# MongoDB Performance Tuning for High-Traffic Applications\n\nAs your application scales and user traffic increases, MongoDB performance can become a critical factor...",
        imageUrl: "https://images.unsplash.com/photo-1585079542156-2755d9c8a094",
        categoryId: 4,
        authorId: 1,
        isFeatured: false,
        publishedDate: new Date("2023-06-18"),
        readTime: 12
      },
      {
        title: "Building Secure Authentication in Express.js with JWT",
        slug: "building-secure-authentication-expressjs-jwt",
        summary: "Learn how to implement secure authentication using JSON Web Tokens in your Express.js applications with best practices.",
        content: "# Building Secure Authentication in Express.js with JWT\n\nImplementing secure authentication is essential for protecting user data and preventing unauthorized access to your application...",
        imageUrl: "https://images.unsplash.com/photo-1568952433726-3896e3881c65",
        categoryId: 5,
        authorId: 1,
        isFeatured: false,
        publishedDate: new Date("2023-06-10"),
        readTime: 13
      },
      {
        title: "Transitioning from Monolith to Microservices with Node.js",
        slug: "transitioning-monolith-microservices-nodejs",
        summary: "A practical guide to breaking down your monolithic application into microservices using Node.js and container technologies.",
        content: "# Transitioning from Monolith to Microservices with Node.js\n\nMany companies start with a monolithic architecture, but as the application grows, they face challenges with scale and maintenance...",
        imageUrl: "https://images.unsplash.com/photo-1598425237654-4fc758e50a93",
        categoryId: 6,
        authorId: 1,
        isFeatured: false,
        publishedDate: new Date("2023-05-28"),
        readTime: 16
      },
      {
        title: "Complete Guide to Testing React Applications in 2023",
        slug: "complete-guide-testing-react-applications-2023",
        summary: "Master unit, integration, and end-to-end testing for React using Jest, React Testing Library, and Cypress with real-world examples.",
        content: "# Complete Guide to Testing React Applications in 2023\n\nTesting is an essential part of the development process that ensures your React application works as expected...",
        imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8",
        categoryId: 1,
        authorId: 1,
        isFeatured: false,
        publishedDate: new Date("2023-05-15"),
        readTime: 15
      },
      {
        title: "Upgrading Your MERN Stack to TypeScript: A Step-by-Step Guide",
        slug: "upgrading-mern-stack-typescript-step-by-step-guide",
        summary: "Convert your JavaScript-based MERN application to TypeScript for improved type safety and developer experience.",
        content: "# Upgrading Your MERN Stack to TypeScript: A Step-by-Step Guide\n\nTypeScript has gained immense popularity in recent years for its ability to enhance code quality through static typing...",
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
        categoryId: 1,
        authorId: 1,
        isFeatured: false,
        publishedDate: new Date("2023-05-03"),
        readTime: 14
      }
    ];
    
    blogPosts.forEach(post => {
      const newPost = this.createBlogPost(post);
      
      // Add tags to posts
      if (post.slug === "building-scalable-microservices-nodejs-docker") {
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("nodejs")!.id });
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("docker")!.id });
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("microservices")!.id });
      } else if (post.slug === "complete-guide-mern-stack-development-2023") {
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("mongodb")!.id });
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("express")!.id });
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("react")!.id });
      } else if (post.slug === "getting-started-tensorflow-image-recognition") {
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("tensorflow")!.id });
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("ml")!.id });
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("python")!.id });
      } else if (post.slug === "designing-resilient-microservices-aws") {
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("aws")!.id });
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("serverless")!.id });
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("microservices")!.id });
      } else if (post.slug === "10-react-performance-optimization-techniques") {
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("react")!.id });
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("performance")!.id });
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("javascript")!.id });
      } else if (post.slug === "mongodb-performance-tuning-high-traffic-applications") {
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("mongodb")!.id });
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("database")!.id });
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("performance")!.id });
      } else if (post.slug === "building-secure-authentication-expressjs-jwt") {
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("express")!.id });
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("security")!.id });
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("jwt")!.id });
      } else if (post.slug === "transitioning-monolith-microservices-nodejs") {
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("nodejs")!.id });
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("microservices")!.id });
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("docker")!.id });
      } else if (post.slug === "complete-guide-testing-react-applications-2023") {
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("testing")!.id });
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("react")!.id });
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("jest")!.id });
      } else if (post.slug === "upgrading-mern-stack-typescript-step-by-step-guide") {
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("typescript")!.id });
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("mongodb")!.id });
        this.addTagToPost({ postId: newPost.id, tagId: this.getTagBySlug("migration")!.id });
      }
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const newUser: User = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }
  
  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }
  
  private getCategoryById(id: number): Category | undefined {
    return this.categories.get(id);
  }
  
  async createCategory(category: InsertCategory): Promise<Category> {
    const id = this.categoryIdCounter++;
    const newCategory: Category = { ...category, id };
    this.categories.set(id, newCategory);
    return newCategory;
  }
  
  // Tag methods
  async getAllTags(): Promise<Tag[]> {
    return Array.from(this.tags.values());
  }
  
  async getTagsByPostId(postId: number): Promise<Tag[]> {
    const tagIds = Array.from(this.postTags.values())
      .filter(postTag => postTag.postId === postId)
      .map(postTag => postTag.tagId);
    
    return tagIds.map(tagId => this.tags.get(tagId)!);
  }
  
  private getTagBySlug(slug: string): Tag | undefined {
    return Array.from(this.tags.values()).find(
      (tag) => tag.slug === slug
    );
  }
  
  async createTag(tag: InsertTag): Promise<Tag> {
    const id = this.tagIdCounter++;
    const newTag: Tag = { ...tag, id };
    this.tags.set(id, newTag);
    return newTag;
  }
  
  // PostTag methods
  async addTagToPost(postTag: InsertPostTag): Promise<PostTag> {
    const id = this.postTagIdCounter++;
    const newPostTag: PostTag = { ...postTag, id };
    this.postTags.set(id, newPostTag);
    return newPostTag;
  }
  
  // Blog post methods
  async getAllBlogPosts(): Promise<ExtendedBlogPost[]> {
    return Promise.all(
      Array.from(this.blogPosts.values()).map(async post => this.extendBlogPost(post))
    );
  }
  
  async getFeaturedBlogPosts(): Promise<ExtendedBlogPost[]> {
    const featuredPosts = Array.from(this.blogPosts.values())
      .filter(post => post.isFeatured);
    
    return Promise.all(featuredPosts.map(async post => this.extendBlogPost(post)));
  }
  
  async getBlogPostsByCategory(categorySlug: string): Promise<ExtendedBlogPost[]> {
    const category = await this.getCategoryBySlug(categorySlug);
    if (!category) return [];
    
    const posts = Array.from(this.blogPosts.values())
      .filter(post => post.categoryId === category.id);
    
    return Promise.all(posts.map(async post => this.extendBlogPost(post)));
  }
  
  async getBlogPostBySlug(slug: string): Promise<ExtendedBlogPost | undefined> {
    const post = Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug
    );
    
    if (!post) return undefined;
    
    return this.extendBlogPost(post);
  }
  
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostIdCounter++;
    const newPost: BlogPost = { ...post, id };
    this.blogPosts.set(id, newPost);
    return newPost;
  }
  
  private async extendBlogPost(post: BlogPost): Promise<ExtendedBlogPost> {
    const category = this.getCategoryById(post.categoryId)!;
    const author = await this.getUser(post.authorId)!;
    const tags = await this.getTagsByPostId(post.id);
    
    return {
      ...post,
      category,
      author,
      tags
    };
  }
}

export const storage = new MemStorage();
