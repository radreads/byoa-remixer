import express from 'express';
import cors from 'cors';
import { Anthropic } from '@anthropic-ai/sdk';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the server directory
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

app.post('/api/generate-tweets', async (req, res) => {
  try {
    const { articleText } = req.body;
    console.log('Received request with article text:', articleText?.slice(0, 50) + '...');
    
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('Missing API key');
    }

    if (!articleText) {
      throw new Error('Missing article text');
    }

    // Log before Claude API call
    console.log('Calling Claude API...');
    
    const response = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      system: "You are a helpful AI that generates engaging tweets from article content.",
      messages: [{
        role: 'user',
        content: `Generate 3-5 engaging tweets highlighting key insights from this article. Each tweet should be under 280 characters and include relevant emojis:\n\n${articleText}`
      }]
    });

    // Log successful response
    console.log('Claude API response received');
    
    if (!response.content || !response.content[0] || !response.content[0].text) {
      throw new Error('Invalid response from Claude API');
    }

    const tweets = response.content[0].text
      .split('\n')
      .filter(tweet => tweet.trim().length > 0)
      .map((tweet, index) => ({
        id: `tweet-${index + 1}`,
        content: tweet.trim()
      }));

    return res.json(tweets);

  } catch (error) {
    console.error('Detailed error:', error);
    return res.status(500).json({ 
      error: 'Failed to generate tweets',
      details: error.message 
    });
  }
});

// Modified server startup
const startServer = async (port: number) => {
  try {
    await new Promise((resolve, reject) => {
      const server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        resolve(server);
      }).on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          console.log(`Port ${port} is busy, trying ${port + 1}`);
          resolve(startServer(port + 1));
        } else {
          reject(err);
        }
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer(3000); 