export async function generateTweets(articleText: string): Promise<Array<{ id: string; content: string }>> {
  try {
    console.log('Sending request to server...');
    const response = await fetch('http://localhost:3000/api/generate-tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ articleText }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error:', errorData);
      throw new Error(errorData.error || 'Failed to generate tweets');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating tweets:', error);
    throw new Error('Failed to generate tweets');
  }
} 