// Legacy Gemini compatibility layer - now redirects to our custom AI assistant
import { getAIResponse, analyzeImageQuery } from './aiAssistant';

// Function to generate text response (compatibility wrapper)
export async function generateText(prompt) {
  try {
    const response = await getAIResponse(prompt);
    return response.message;
  } catch (error) {
    console.error('Error generating text:', error);
    return 'Sorry, I encountered an error while processing your request.';
  }
}

// Function to analyze image and generate response (compatibility wrapper)
export async function analyzeImage(imageData, prompt = 'Analyze this image and provide insights') {
  try {
    const response = await analyzeImageQuery(imageData, prompt);
    return response.message;
  } catch (error) {
    console.error('Error analyzing image:', error);
    return 'Sorry, I encountered an error while analyzing the image.';
  }
}

// Function to convert file to base64 (compatibility wrapper)
export function fileToGenerativePart(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.readAsDataURL(file);
  });
}
