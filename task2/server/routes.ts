import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.get('/api/posts', async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching blog posts' });
    }
  });

  app.get('/api/posts/featured', async (req, res) => {
    try {
      const featuredPosts = await storage.getFeaturedBlogPosts();
      res.json(featuredPosts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching featured blog posts' });
    }
  });

  app.get('/api/posts/:slug', async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching blog post' });
    }
  });

  app.get('/api/categories', async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching categories' });
    }
  });

  app.get('/api/categories/:slug/posts', async (req, res) => {
    try {
      const posts = await storage.getBlogPostsByCategory(req.params.slug);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching posts by category' });
    }
  });

  app.get('/api/tags', async (req, res) => {
    try {
      const tags = await storage.getAllTags();
      res.json(tags);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tags' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
