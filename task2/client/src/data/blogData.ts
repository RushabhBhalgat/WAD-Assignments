import { ExtendedBlogPost } from '@shared/schema';

// This file is used for reference and backup data if the API is not functioning
// The actual data is served by the backend in the storage.ts implementation

export const sampleBlogPosts: ExtendedBlogPost[] = [
  {
    id: 1,
    title: "Building Scalable Microservices with Node.js and Docker",
    slug: "building-scalable-microservices-nodejs-docker",
    summary: "Learn how to build and deploy scalable microservices using Node.js and Docker, with practical examples and best practices.",
    content: "# Building Scalable Microservices with Node.js and Docker\n\nIn today's fast-paced digital world, building scalable applications is more important than ever. This article explores how to use Node.js and Docker to create microservices that can scale efficiently...",
    imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    categoryId: 1,
    authorId: 1,
    isFeatured: true,
    publishedDate: new Date("2023-05-12"),
    readTime: 12,
    category: {
      id: 1,
      name: "Web Dev",
      slug: "web-dev",
      color: "white",
      bgColor: "bg-accent"
    },
    author: {
      id: 1,
      username: "aaravsharma",
      password: "hashed_password"
    },
    tags: [
      {
        id: 1,
        name: "Node.js",
        slug: "nodejs",
        color: "text-blue-700",
        bgColor: "bg-blue-100"
      },
      {
        id: 2,
        name: "Docker",
        slug: "docker",
        color: "text-green-700",
        bgColor: "bg-green-100"
      },
      {
        id: 3,
        name: "Microservices",
        slug: "microservices",
        color: "text-blue-700",
        bgColor: "bg-blue-100"
      }
    ]
  },
  // Additional sample blog post entries would go here
];
