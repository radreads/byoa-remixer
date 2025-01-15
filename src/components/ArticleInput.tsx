import React, { useState } from 'react';
import LoadingSpinner from './icons/LoadingSpinner';

interface ArticleInputProps {
  onSubmit: (text: string) => void;
  isLoading?: boolean;
}

const ArticleInput: React.FC<ArticleInputProps> = ({ onSubmit, isLoading = false }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your article or content here..."
        className="w-full p-4 border border-gray-300 rounded-lg min-h-[200px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        data-testid="article-input"
        disabled={isLoading}
      />
      <button
        type="submit"
        className={`px-6 py-3 rounded-lg font-medium text-white transition-colors flex items-center justify-center gap-2
          ${isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600'
          }`}
        data-testid="submit-button"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <LoadingSpinner size={18} />
            <span>Generating...</span>
          </>
        ) : (
          'Generate Tweets'
        )}
      </button>
    </form>
  );
};

export default ArticleInput; 