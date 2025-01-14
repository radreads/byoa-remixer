import React from 'react';

interface Tweet {
  id: string;
  content: string;
}

interface TweetListProps {
  tweets: Tweet[];
}

const TweetList: React.FC<TweetListProps> = ({ tweets }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Generated Tweets</h2>
      <div className="space-y-4">
        {tweets.map((tweet) => (
          <div 
            key={tweet.id} 
            className="p-4 border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            {tweet.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TweetList; 