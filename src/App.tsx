import { useState } from 'react'
import ArticleInput from './components/ArticleInput'
import TweetList from './components/TweetList'
import SlidePanel from './components/SlidePanel'
import { generateTweets } from './services/claude'
import { useSavedTweets } from './hooks/useSavedTweets'

// Add this temporarily to check if API key is loaded
console.log('API Key exists:', !!import.meta.env.VITE_ANTHROPIC_API_KEY);

function App() {
  const [tweets, setTweets] = useState<Array<{ id: string; content: string }>>([]);
  const [articleText, setArticleText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { savedTweets, saveTweet, removeTweet, updateTweet, loading: savedTweetsLoading } = useSavedTweets();

  const handleSubmit = async (text: string) => {
    setIsLoading(true);
    setError(null);
    setArticleText(text);
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

  const handleSaveTweet = async (tweet: { id: string; content: string }) => {
    await saveTweet({
      id: tweet.id,
      content: tweet.content,
      articleContext: articleText
    });
    setIsPanelOpen(true);
  };

  const handleEditSavedTweet = async (id: string, content: string) => {
    await updateTweet(id, content);
  };

  const togglePanel = () => {
    setIsPanelOpen(current => !current);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Blog Post Remixer</h1>
        <p className="text-gray-600 mb-6">Paste a blog post below to convert it into a series of Tweets in Khe Hy's voice.</p>
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
          tweets.length > 0 && (
            <TweetList 
              tweets={tweets} 
              articleText={articleText} 
              onSave={handleSaveTweet}
              savedTweetIds={savedTweets.map(t => t.tweet_id)} 
            />
          )
        )}
        <SlidePanel 
          isOpen={isPanelOpen} 
          onClose={togglePanel}
          savedTweets={savedTweets}
          onRemove={removeTweet}
          onEdit={handleEditSavedTweet}
          isLoading={savedTweetsLoading}
        />
      </div>
    </div>
  );
}

export default App; 