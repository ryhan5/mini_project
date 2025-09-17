// Gemini AI Integration for Farming Assistant
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
let genAI = null;
let model = null;

// Initialize Gemini with API key
export function initializeGemini(apiKey) {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    console.log('Gemini 2.0 Flash initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize Gemini 2.0 Flash:', error);
    return false;
  }
}

// Get Gemini API key from environment or return null
function getGeminiApiKey() {
  return process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || null;
}

// Auto-initialize Gemini if API key is available
const apiKey = getGeminiApiKey();
if (apiKey) {
  initializeGemini(apiKey);
}

// Enhanced prompt for farming context
const FARMING_SYSTEM_PROMPT = `You are an expert AI farming assistant with deep knowledge of agriculture, crop management, and sustainable farming practices. You help farmers with:

- Crop diseases and pest management
- Soil health and fertilization
- Irrigation and water management
- Weather-based farming advice
- Market trends and crop planning
- Organic and sustainable farming methods
- Government schemes and subsidies for farmers

Guidelines:
- Provide practical, actionable advice
- Consider regional variations when possible
- Emphasize sustainable and eco-friendly practices
- Include safety precautions when recommending chemicals
- Suggest consulting local agricultural extension officers for region-specific advice
- Keep responses concise but comprehensive
- Use simple language that farmers can easily understand

Current conversation context: Agricultural assistance and farming guidance.`;

// Main function to get AI response from Gemini
export async function getGeminiResponse(userMessage, context = {}) {
  try {
    // Check if Gemini is initialized
    if (!model) {
      const apiKey = getGeminiApiKey();
      if (!apiKey) {
        throw new Error('Gemini API key not found. Please add NEXT_PUBLIC_GEMINI_API_KEY to your environment variables.');
      }
      
      const initialized = initializeGemini(apiKey);
      if (!initialized) {
        throw new Error('Failed to initialize Gemini AI');
      }
    }

    // Prepare the prompt with farming context
    const fullPrompt = `${FARMING_SYSTEM_PROMPT}

User Question: ${userMessage}

Please provide a helpful farming-related response:`;

    console.log('Sending request to Gemini...');
    
    // Generate response using Gemini
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    console.log('Gemini response received');

    return {
      message: text,
      type: 'gemini-response',
      timestamp: new Date().toISOString(),
      confidence: 0.95,
      source: 'Gemini 2.0 Flash'
    };

  } catch (error) {
    console.error('Gemini AI Error:', error);
    
    // Fallback response with helpful error information
    let errorMessage = "I'm having trouble connecting to the AI service. ";
    
    if (error.message.includes('API key')) {
      errorMessage += "Please make sure the Gemini API key is properly configured.";
    } else if (error.message.includes('quota') || error.message.includes('limit')) {
      errorMessage += "The AI service quota has been exceeded. Please try again later.";
    } else {
      errorMessage += "Please try again in a moment or contact support if the issue persists.";
    }

    return {
      message: errorMessage,
      type: 'error',
      timestamp: new Date().toISOString(),
      confidence: 0,
      source: 'Error Handler'
    };
  }
}

// Function to analyze images with Gemini Vision (if available)
export async function analyzeImageWithGemini(imageData, query) {
  try {
    if (!genAI) {
      throw new Error('Gemini AI not initialized');
    }

    // Use Gemini 2.0 Flash for image analysis (supports vision)
    const visionModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `You are an expert agricultural AI assistant analyzing crop images. 

Analyze this crop image and provide:
1. Crop identification (if possible)
2. Health assessment
3. Any visible diseases or pest damage
4. Soil condition observations
5. Recommendations for treatment or care

User's specific question: ${query}

Please provide detailed, actionable farming advice based on what you observe in the image.`;

    // Convert image data to the format Gemini expects
    const imagePart = {
      inlineData: {
        data: imageData.split(',')[1], // Remove data:image/jpeg;base64, prefix
        mimeType: "image/jpeg"
      }
    };

    const result = await visionModel.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    return {
      message: text,
      type: 'image-analysis',
      timestamp: new Date().toISOString(),
      confidence: 0.90,
      source: 'Gemini 2.0 Flash Vision'
    };

  } catch (error) {
    console.error('Gemini Vision Error:', error);
    
    return {
      message: "I'm having trouble analyzing the image with AI. For now, please use our dedicated Crop Disease Detection tool for image analysis, or describe what you see in the image and I'll provide general advice.",
      type: 'error',
      timestamp: new Date().toISOString(),
      confidence: 0,
      source: 'Error Handler'
    };
  }
}

// Test function to check if Gemini is working
export async function testGeminiConnection() {
  try {
    const testResponse = await getGeminiResponse("Hello, can you help me with farming?");
    return testResponse.type !== 'error';
  } catch (error) {
    console.error('Gemini connection test failed:', error);
    return false;
  }
}

// Export the main function with the same interface as the original aiAssistant
export { getGeminiResponse as getAIResponse, analyzeImageWithGemini as analyzeImageQuery };
