import React from 'react';
import { render, screen } from '@testing-library/react';
import TweetList from './TweetList';

describe('TweetList', () => {
  const mockTweets = [
    { id: '1', content: 'First tweet' },
    { id: '2', content: 'Second tweet' },
  ];

  it('renders the list of tweets', () => {
    render(<TweetList tweets={mockTweets} />);
    
    expect(screen.getByText('Generated Tweets')).toBeInTheDocument();
    expect(screen.getByText('First tweet')).toBeInTheDocument();
    expect(screen.getByText('Second tweet')).toBeInTheDocument();
  });

  it('renders empty when no tweets provided', () => {
    render(<TweetList tweets={[]} />);
    
    expect(screen.getByText('Generated Tweets')).toBeInTheDocument();
    expect(screen.queryByText('First tweet')).not.toBeInTheDocument();
  });
}); 