import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

console.log('Initializing Supabase client with URL:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'X-Client-Info': 'article-tweeter'
    }
  }
});

// Test the connection and log more details
supabase.auth.getSession().then(({ data: { session }, error }) => {
  if (error) {
    console.error('Auth session error:', error);
  } else {
    console.log('Auth session status:', session ? 'Active' : 'No session');
  }
});

// Test database access
supabase
  .from('saved_tweets')
  .select('count')
  .limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.error('Supabase database test failed:', error);
    } else {
      console.log('Supabase database test successful:', data);
    }
  });

export type Database = {
  public: {
    Tables: {
      saved_tweets: {
        Row: {
          id: string;
          tweet_id: string;
          content: string;
          saved_at: string;
          article_context: string | null;
        };
        Insert: Omit<Database['public']['Tables']['saved_tweets']['Row'], 'id' | 'saved_at'>;
        Update: Partial<Database['public']['Tables']['saved_tweets']['Insert']>;
      };
    };
  };
}; 