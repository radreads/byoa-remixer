import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TweetList from './TweetList';

describe('TweetList', () => {
  const mockTweets = [
    { id: '1', content: 'First tweet' },
    { id: '2', content: 'Second tweet' },
  ];

  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  it('renders all tweets with copy buttons', () => {
    render(<TweetList tweets={mockTweets} />);
    
    expect(screen.getByText('First tweet')).toBeInTheDocument();
    expect(screen.getByText('Second tweet')).toBeInTheDocument();
    expect(screen.getAllByText('Copy')).toHaveLength(2);
  });

  it('copies tweet text when copy button is clicked', async () => {
    render(<TweetList tweets={mockTweets} />);
    
    const copyButtons = screen.getAllByText('Copy');
    await fireEvent.click(copyButtons[0]);
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('First tweet');
  });
}); 