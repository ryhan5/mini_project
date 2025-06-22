const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const IMAGE_SIZE = 800;
const EQUIPMENT_IMAGES = [
  { name: 'tractor-1.jpg', label: 'Tractor 1' },
  { name: 'tractor-2.jpg', label: 'Tractor 2' },
  { name: 'harvester-1.jpg', label: 'Harvester' },
  { name: 'irrigation-1.jpg', label: 'Irrigation' },
  { name: 'sprayer-1.jpg', label: 'Sprayer' },
];

// Create images directory if it doesn't exist
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Generate placeholder images
EQUIPMENT_IMAGES.forEach(({ name, label }) => {
  const canvas = createCanvas(IMAGE_SIZE, IMAGE_SIZE);
  const ctx = canvas.getContext('2d');
  
  // Background color
  const hue = Math.floor(Math.random() * 360);
  ctx.fillStyle = `hsl(${hue}, 70%, 90%)`;
  ctx.fillRect(0, 0, IMAGE_SIZE, IMAGE_SIZE);
  
  // Text
  ctx.fillStyle = `hsl(${hue}, 70%, 30%)`;
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, IMAGE_SIZE / 2, IMAGE_SIZE / 2);
  
  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(path.join(IMAGES_DIR, name), buffer);
});

console.log(`Generated ${EQUIPMENT_IMAGES.length} placeholder images in ${IMAGES_DIR}`);
