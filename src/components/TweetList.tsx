import React from 'react';

interface Tweet {
  id: string;
  content: string;
}

interface TweetListProps {
  tweets: Tweet[];
}

const TweetList: React.FC<TweetListProps> = ({ tweets }) => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Could add a toast notification here later
      console.log('Tweet copied!');
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Generated Tweets</h2>
      <div className="space-y-4">
        {tweets.map((tweet) => (
          <div 
            key={tweet.id} 
            className="p-4 border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow flex justify-between items-start gap-4"
          >
            <p className="flex-1">{tweet.content}</p>
            <button
              onClick={() => copyToClipboard(tweet.content)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              aria-label="Copy tweet"
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TweetList; 