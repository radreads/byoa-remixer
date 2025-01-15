import { useState, useEffect } from 'react';

export interface SavedTweet {
  id: string;
  content: string;
  savedAt: string;
  articleContext?: string;
}

const STORAGE_KEY = 'savedTweets';

export const useSavedTweets = () => {
  const [savedTweets, setSavedTweets] = useState<SavedTweet[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedTweets));
  }, [savedTweets]);

  const saveTweet = (tweet: Omit<SavedTweet, 'savedAt'>) => {
    setSavedTweets(prev => {
      // Check if tweet already exists
      if (prev.some(t => t.id === tweet.id)) {
        return prev;
      }
      return [...prev, { ...tweet, savedAt: new Date().toISOString() }];
    });
  };

  const removeTweet = (id: string) => {
    setSavedTweets(prev => prev.filter(tweet => tweet.id !== id));
  };

  const clearSavedTweets = () => {
    setSavedTweets([]);
  };

  return {
    savedTweets,
    saveTweet,
    removeTweet,
    clearSavedTweets
  };
}; 