import { motion } from 'framer-motion';
import { Link } from 'wouter';
import SyntaxHighlighter from './SyntaxHighlighter';
import useScrollAnimation from '@/hooks/useScrollAnimation';

const CodeExampleSection: React.FC = () => {
  const { ref: leftSectionRef, inView: leftSectionInView } = useScrollAnimation();
  const { ref: rightSectionRef, inView: rightSectionInView } = useScrollAnimation();
  
  const codeString = `const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.div
            ref={leftSectionRef}
            className="md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={leftSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium mb-4">Code Examples</span>
            <h2 className="text-3xl font-bold font-poppins mb-6">Clear, Concise Code Snippets in Every Tutorial</h2>
            <p className="text-gray-700 mb-6">
              My articles feature well-documented code examples with syntax highlighting to help you implement solutions quickly. 
              Copy, paste, and adapt them to your projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/blog" 
                className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition duration-300 text-center"
              >
                View Tutorials
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            ref={rightSectionRef}
            className="md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={rightSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-dark rounded-xl overflow-hidden shadow-xl">
              <div className="flex items-center px-4 py-2 bg-gray-900">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="ml-4 text-gray-400 text-sm">server.js</span>
              </div>
              <div className="p-6">
                <SyntaxHighlighter language="javascript" code={codeString} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CodeExampleSection;
