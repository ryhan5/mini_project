# Gemini AI Setup Guide

## Getting Your Gemini API Key

1. **Visit Google AI Studio**
   - Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account

2. **Create API Key**
   - Click "Create API Key"
   - Choose "Create API key in new project" or select existing project
   - Copy the generated API key

## Setting Up Environment Variables

1. **Create/Update .env.local file**
   ```bash
   # In your project root directory (d:\Web Dev\agrosarthi\)
   # Create or edit .env.local file and add:
   
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

2. **Replace `your_api_key_here` with your actual API key**
   ```bash
   NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyC-your-actual-api-key-here
   ```

## Restart Development Server

After adding the API key:
```bash
npm run dev
```

## Testing the Integration

1. Open the crop disease page: `http://localhost:3000/en/crop-disease`
2. Go to "AI Chat" tab
3. Send a message like "How do I grow tomatoes?"
4. You should get a response from Gemini AI

## Features Available

### Text Chat
- Ask farming questions
- Get AI-powered agricultural advice
- Crop-specific guidance
- Pest and disease management tips

### Image Analysis
- Upload crop images
- AI-powered disease detection
- Treatment recommendations
- Prevention advice

## Troubleshooting

### Common Issues

1. **"API key not found" error**
   - Make sure `.env.local` file is in the root directory
   - Check that the variable name is exactly `NEXT_PUBLIC_GEMINI_API_KEY`
   - Restart the development server after adding the key

2. **"Quota exceeded" error**
   - You've reached the free tier limit
   - Wait for quota reset or upgrade your plan

3. **"Failed to initialize" error**
   - Check your internet connection
   - Verify the API key is correct
   - Make sure the key has proper permissions

### API Limits (Free Tier)
- 60 requests per minute
- 1,500 requests per day
- Rate limits may apply

## Security Notes

- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- Keep your API key secure and don't share it publicly

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your API key is working at Google AI Studio
3. Make sure you have an active internet connection
