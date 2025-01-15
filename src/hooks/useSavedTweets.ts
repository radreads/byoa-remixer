import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

export type SavedTweet = Database['public']['Tables']['saved_tweets']['Row'];

export const useSavedTweets = () => {
  const [savedTweets, setSavedTweets] = useState<SavedTweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSavedTweets = async () => {
    try {
      console.log('Fetching saved tweets...');
      const { data, error } = await supabase
        .from('saved_tweets')
        .select('*')
        .order('saved_at', { ascending: false });

      if (error) throw error;
      console.log('Fetched tweets:', data);
      setSavedTweets(data || []);
    } catch (err) {
      console.error('Error fetching saved tweets:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch saved tweets');
    } finally {
      setLoading(false);
    }
  };

  // Fetch saved tweets on mount
  useEffect(() => {
    fetchSavedTweets();
  }, []);

  const saveTweet = async (tweet: { id: string; content: string; articleContext?: string }) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if tweet already exists
      const exists = savedTweets.some(t => t.tweet_id === tweet.id);
      if (exists) {
        console.log('Tweet already exists, skipping save');
        return;
      }

      const insertData = {
        tweet_id: tweet.id,
        content: tweet.content,
        article_context: tweet.articleContext || null
      };

      const { error } = await supabase
        .from('saved_tweets')
        .insert(insertData);

      if (error) throw error;
      
      // Fetch latest tweets after successful save
      await fetchSavedTweets();
    } catch (err) {
      console.error('Error saving tweet:', err);
      setError(err instanceof Error ? err.message : 'Failed to save tweet');
    } finally {
      setLoading(false);
    }
  };

  const updateTweet = async (id: string, content: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase
        .from('saved_tweets')
        .update({ content })
        .eq('id', id);

      if (error) throw error;
      
      // Fetch latest tweets after successful update
      await fetchSavedTweets();
    } catch (err) {
      console.error('Error updating tweet:', err);
      setError(err instanceof Error ? err.message : 'Failed to update tweet');
    } finally {
      setLoading(false);
    }
  };

  const removeTweet = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase
        .from('saved_tweets')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Fetch latest tweets after successful removal
      await fetchSavedTweets();
    } catch (err) {
      console.error('Error removing tweet:', err);
      setError(err instanceof Error ? err.message : 'Failed to remove tweet');
    } finally {
      setLoading(false);
    }
  };

  return {
    savedTweets,
    saveTweet,
    removeTweet,
    updateTweet,
    loading,
    error
  };
}; 