const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'app', '[lang]');
const configPath = path.join(__dirname, '..', 'config', 'languages.js');

// Get the list of supported languages
const { languages } = require(configPath);

// Function to update a page file
function updatePageFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already has generateStaticParams
    if (content.includes('generateStaticParams')) {
      console.log(`Skipping ${filePath} - already has generateStaticParams`);
      return;
    }
    
    // Add the imports if needed
    if (!content.includes("from '@/config/languages'")) {
      content = content.replace(
        /^('use client';?\n)/,
        `$1import { languages } from '@/config/languages';\n`
      );
    }
    
    // Add generateStaticParams before the component
    const staticParamsCode = `
// This function tells Next.js which paths to pre-render at build time
export async function generateStaticParams() {
  return languages.map((lang) => ({
    lang: lang.code,
  }));
}

// This ensures dynamic parameters are filled in at request time
export const dynamicParams = true;
`;

    // Insert before the component definition
    const componentMatch = content.match(/export\s+default\s+function\s+\w+\s*\(/);
    if (componentMatch) {
      const insertPos = componentMatch.index;
      content = content.slice(0, insertPos) + staticParamsCode + content.slice(insertPos);
      
      // Update the component to handle the lang param
      content = content.replace(
        /export\s+default\s+function\s+(\w+)\s*\(\s*\)/,
        'export default function $1({ params: { lang } })'
      );
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    } else {
      console.log(`Skipping ${filePath} - could not find component definition`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Process all page files
function processDirectory(directory) {
  const items = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(directory, item.name);
    
    if (item.isDirectory()) {
      // Skip node_modules and .next directories
      if (item.name === 'node_modules' || item.name === '.next') continue;
      processDirectory(fullPath);
    } else if (item.name.match(/page\.(js|jsx|ts|tsx)$/)) {
      updatePageFile(fullPath);
    }
  }
}

// Start processing from the [lang] directory
processDirectory(pagesDir);
