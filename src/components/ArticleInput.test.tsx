import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ArticleInput from './ArticleInput';

describe('ArticleInput', () => {
  it('renders textarea and submit button', () => {
    render(<ArticleInput onSubmit={() => {}} />);
    
    expect(screen.getByTestId('article-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('captures input and calls onSubmit', () => {
    const mockOnSubmit = jest.fn();
    render(<ArticleInput onSubmit={mockOnSubmit} />);

    const textarea = screen.getByTestId('article-input');
    const submitButton = screen.getByTestId('submit-button');
    const testText = 'Test article content';

    fireEvent.change(textarea, { target: { value: testText } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith(testText);
    expect(textarea).toHaveValue('');
  });

  it('disables input and shows loading state when isLoading is true', () => {
    render(<ArticleInput onSubmit={() => {}} isLoading={true} />);
    
    const textarea = screen.getByTestId('article-input');
    const submitButton = screen.getByTestId('submit-button');

    expect(textarea).toBeDisabled();
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Generating...');
  });

  it('does not submit empty content', () => {
    const mockOnSubmit = jest.fn();
    render(<ArticleInput onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
}); 