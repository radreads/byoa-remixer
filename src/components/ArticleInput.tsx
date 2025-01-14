import React, { useState } from 'react';

interface ArticleInputProps {
  onSubmit: (text: string) => void;
}

const ArticleInput: React.FC<ArticleInputProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(text);
    setText(''); // Clear input after submission
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your article text here..."
        className="w-full p-2 border border-gray-300 rounded min-h-[200px]"
        data-testid="article-input"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        data-testid="submit-button"
      >
        Submit
      </button>
    </form>
  );
};

export default ArticleInput; 