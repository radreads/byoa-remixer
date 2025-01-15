import React from 'react';
import type { SavedTweet } from '../hooks/useSavedTweets';
import EditableTweet from './EditableTweet';
import { TwitterIcon } from './icons/TwitterIcon';

interface SlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  savedTweets: SavedTweet[];
  onRemove: (id: string) => void;
  onEdit: (id: string, content: string) => void;
  isLoading: boolean;
}

const SlidePanel: React.FC<SlidePanelProps> = ({ 
  isOpen, 
  onClose, 
  savedTweets, 
  onRemove,
  onEdit,
  isLoading 
}) => {
  const shareToTwitter = (content: string) => {
    const tweetText = encodeURIComponent(content);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  return (
    <div 
      className={`fixed inset-y-0 right-0 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Slider button */}
      <button
        onClick={onClose}
        className="absolute -left-10 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-l-lg p-2 shadow-md hover:bg-gray-50"
        aria-label={isOpen ? "Close saved tweets" : "Open saved tweets"}
      >
        <svg 
          className={`w-6 h-6 text-gray-600 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Panel content */}
      <div className="w-96 h-full bg-white shadow-lg p-6 border-l overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Saved Tweets</h2>
        
        {isLoading ? (
          <div className="mt-6 p-4 border border-gray-200 rounded-lg text-center text-gray-500">
            Loading saved tweets...
          </div>
        ) : savedTweets.length === 0 ? (
          <div className="mt-6 p-4 border border-gray-200 rounded-lg text-center text-gray-500">
            No saved tweets yet
          </div>
        ) : (
          <div className="space-y-4">
            {savedTweets.map((tweet) => (
              <div 
                key={tweet.id} 
                className="p-4 border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <EditableTweet
                  content={tweet.content}
                  onSave={(newContent) => onEdit(tweet.id, newContent)}
                  className="mb-2"
                />
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
                    onClick={() => onRemove(tweet.id)}
                    className="px-3 py-1 text-sm text-red-500 hover:text-red-600 transition-colors"
                    aria-label="Remove saved tweet"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SlidePanel; 