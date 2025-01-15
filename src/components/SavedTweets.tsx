import React from 'react';
import { useSavedTweets } from '../hooks/useSavedTweets';
import { TwitterIcon } from './icons/TwitterIcon';

const SavedTweets: React.FC = () => {
  const { savedTweets, removeTweet, loading, error } = useSavedTweets();

  const shareToTwitter = (content: string) => {
    const tweetText = encodeURIComponent(content);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  if (loading) {
    return (
      <div className="mt-6 p-4 border border-gray-200 rounded-lg text-center text-gray-500">
        Loading saved tweets...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 p-4 border border-red-200 bg-red-50 rounded-lg text-center text-red-600">
        Error: {error}
      </div>
    );
  }

  if (savedTweets.length === 0) {
    return (
      <div className="mt-6 p-4 border border-gray-200 rounded-lg text-center text-gray-500">
        No saved tweets yet
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Saved Tweets</h2>
      <div className="space-y-4">
        {savedTweets.map((tweet) => (
          <div 
            key={tweet.id} 
            className="p-4 border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <p className="mb-2">{tweet.content}</p>
            <div className="flex justify-end items-center space-x-2">
              <button
                onClick={() => shareToTwitter(tweet.content)}
                className="group relative flex items-center justify-center p-2 rounded-full hover:bg-blue-50 transition-colors"
                aria-label="Share on Twitter"
              >
                <TwitterIcon 
                  className="w-5 h-5 text-gray-500 group-hover:text-[#1DA1F2] active:scale-90 group-active:rotate-[360deg] transition-all duration-300" 
                />
                <span className="absolute inset-0 rounded-full group-active:animate-ripple bg-blue-100/50" />
              </button>
              <button
                onClick={() => removeTweet(tweet.id)}
                className="px-3 py-1 text-sm text-red-500 hover:text-red-600 transition-colors"
                aria-label="Remove saved tweet"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedTweets; 