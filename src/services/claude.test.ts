import { generateTweets } from './claude';

async function testClaudeIntegration() {
  try {
    const tweets = await generateTweets('Test article about AI and its impact.');
    console.log('Generated tweets:', tweets);
  } catch (error) {
    console.error('Integration test failed:', error);
  }
}

// Run test
testClaudeIntegration(); 