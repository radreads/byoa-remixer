import React from 'react';
import { useSavedTweets } from '../hooks/useSavedTweets';

interface Tweet {
  id: string;
  content: string;
}

interface TweetListProps {
  tweets: Tweet[];
  articleText?: string;
}

const TweetList: React.FC<TweetListProps> = ({ tweets, articleText }) => {
  const { savedTweets, saveTweet } = useSavedTweets();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Tweet copied!');
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleSaveTweet = (tweet: Tweet) => {
    console.log('Handling save tweet:', tweet);
    console.log('Article context:', articleText);
    saveTweet({
      ...tweet,
      articleContext: articleText
    });
  };

  const isTweetSaved = (id: string) => {
    const saved = savedTweets.some(tweet => tweet.tweet_id === id);
    console.log('Checking if tweet is saved:', id, saved);
    return saved;
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Generated Tweets</h2>
      <div className="space-y-4">
        {tweets.map((tweet) => (
          <div 
            key={tweet.id} 
            className="p-4 border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <p className="mb-3">{tweet.content}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => copyToClipboard(tweet.content)}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                aria-label="Copy tweet"
              >
                Copy
              </button>
              <button
                onClick={() => handleSaveTweet(tweet)}
                disabled={isTweetSaved(tweet.id)}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  isTweetSaved(tweet.id)
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
                aria-label="Save tweet"
              >
                {isTweetSaved(tweet.id) ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TweetList; 