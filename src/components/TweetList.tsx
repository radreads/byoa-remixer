import React, { useState } from 'react';
import EditableTweet from './EditableTweet';
import { TwitterIcon } from './icons/TwitterIcon';

interface Tweet {
  id: string;
  content: string;
}

interface TweetListProps {
  tweets: Tweet[];
  articleText?: string;
  onSave: (tweet: Tweet) => void;
  savedTweetIds: string[];
}

const TweetList: React.FC<TweetListProps> = ({ tweets, articleText, onSave, savedTweetIds }) => {
  const [localTweets, setLocalTweets] = useState<Tweet[]>(tweets);

  const shareToTwitter = (text: string) => {
    const encodedText = encodeURIComponent(text);
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
  };

  const handleSaveTweet = async (tweet: Tweet) => {
    onSave(tweet);
    setLocalTweets(current => current.filter(t => t.id !== tweet.id));
  };

  const handleEditTweet = (tweetId: string, newContent: string) => {
    setLocalTweets(current =>
      current.map(t => t.id === tweetId ? { ...t, content: newContent } : t)
    );
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Generated Tweets</h2>
      <div className="space-y-4">
        {localTweets.map((tweet) => (
          <div 
            key={tweet.id} 
            className="p-4 border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <EditableTweet
              content={tweet.content}
              onSave={(newContent) => handleEditTweet(tweet.id, newContent)}
              className="mb-3"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => shareToTwitter(tweet.content)}
                className="relative p-2 rounded-full hover:bg-blue-50 transition-all duration-300 group active:scale-90"
                aria-label="Share on Twitter"
                title="Share on Twitter"
              >
                <TwitterIcon 
                  className="group-hover:fill-[#1DA1F2] group-active:rotate-[360deg] transition-all duration-300" 
                  color="#536471" 
                />
                <span className="absolute inset-0 rounded-full group-active:animate-ripple bg-blue-100/50" />
              </button>
              <button
                onClick={() => handleSaveTweet(tweet)}
                className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
                aria-label="Save tweet"
                disabled={savedTweetIds.includes(tweet.id)}
              >
                {savedTweetIds.includes(tweet.id) ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TweetList; 