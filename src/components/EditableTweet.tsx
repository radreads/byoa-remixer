import React, { useState, useRef, useEffect } from 'react';

interface EditableTweetProps {
  content: string;
  onSave: (newContent: string) => void;
  className?: string;
}

const EditableTweet: React.FC<EditableTweetProps> = ({ 
  content, 
  onSave,
  className = ""
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedContent(content);
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  const handleSave = () => {
    if (editedContent.trim() !== content.trim()) {
      onSave(editedContent);
    }
    setIsEditing(false);
  };

  const handleBlur = () => {
    handleSave();
  };

  if (isEditing) {
    return (
      <textarea
        ref={textareaRef}
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className={`w-full p-0 bg-transparent border-none resize-none focus:ring-0 ${className}`}
        style={{ 
          minHeight: '1.5em',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit'
        }}
      />
    );
  }

  return (
    <p 
      onClick={() => setIsEditing(true)} 
      className={`cursor-text ${className}`}
    >
      {content}
    </p>
  );
};

export default EditableTweet; 