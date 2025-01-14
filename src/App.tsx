import { useState } from 'react'
import ArticleInput from './components/ArticleInput'
import TweetList from './components/TweetList'
import { generateTweets } from './services/claude'

// Add this temporarily to check if API key is loaded
console.log('API Key exists:', !!import.meta.env.VITE_ANTHROPIC_API_KEY);

function App() {
  const [tweets, setTweets] = useState<Array<{ id: string; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (text: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedTweets = await generateTweets(text);
      setTweets(generatedTweets);
    } catch (err) {
      setError('Failed to generate tweets. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Remixer</h1>
      <ArticleInput onSubmit={handleSubmit} isLoading={isLoading} />
      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}
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