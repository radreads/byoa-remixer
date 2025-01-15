import React from 'react';
import { useSavedTweets } from '../hooks/useSavedTweets';

const SavedTweets: React.FC = () => {
  const { savedTweets, removeTweet, loading, error } = useSavedTweets();

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
            <div className="flex justify-end">
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