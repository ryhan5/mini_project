const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Text generation model
const textModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Vision model for image analysis
const visionModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Function to generate text response
export async function generateText(prompt) {
  try {
    const result = await textModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating text:', error);
    return 'Sorry, I encountered an error while processing your request.';
  }
}

// Function to analyze image and generate response
export async function analyzeImage(imageData, prompt = 'Analyze this image and provide insights') {
  try {
    // Convert base64 image to GoogleGenerativeAI.Part
    const imagePart = {
      inlineData: {
        data: imageData.split(',')[1], // Remove the data URL prefix
        mimeType: 'image/jpeg',
      },
    };

    const result = await visionModel.generateContent([prompt, imagePart]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error analyzing image:', error);
    return 'Sorry, I encountered an error while analyzing the image.';
  }
}

// Function to convert file to base64
function fileToGenerativePart(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.readAsDataURL(file);
  });
}

export { fileToGenerativePart };
