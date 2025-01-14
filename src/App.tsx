import { useState } from 'react'
import ArticleInput from './components/ArticleInput'
import TweetList from './components/TweetList'

// Mock tweets for testing
const mockTweets = (content: string) => [
  {
    id: '1',
    content: `🔥 Key insight from this article: ${content.slice(0, 100)}...`,
  },
  {
    id: '2',
    content: '💡 Another fascinating perspective: Innovation drives success in unexpected ways.',
  },
  {
    id: '3',
    content: '🌟 Remember this: Great ideas come from challenging conventional wisdom.',
  },
];

function App() {
  const [tweets, setTweets] = useState<Array<{ id: string; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (text: string) => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const generatedTweets = mockTweets(text);
      setTweets(generatedTweets);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Remixer</h1>
      <ArticleInput onSubmit={handleSubmit} />
      {isLoading ? (
        <div className="mt-6 text-center text-gray-600">
          Generating tweets...
        </div>
      ) : (
        tweets.length > 0 && <TweetList tweets={tweets} />
      )}
    </div>
  );
}

export default App; 