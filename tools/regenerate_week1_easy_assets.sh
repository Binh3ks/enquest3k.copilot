#!/bin/bash

echo "=== REGENERATE WEEK 1 EASY MODE ASSETS ==="
echo ""
echo "This will:"
echo "1. Delete old images in public/images/week1_easy/"
echo "2. Generate NEW images for Easy vocab (name, friend, desk, chair...)"
echo "3. Generate NEW images for Easy word_power"
echo "4. Generate audio files"
echo ""
read -p "Continue? (y/n): " confirm

if [ "$confirm" != "y" ]; then
  echo "Cancelled."
  exit 0
fi

cd "$(dirname "$0")/.."

# Step 1: Delete old vocab images (but keep cover images)
echo ""
echo "Step 1: Cleaning old vocab images..."
cd public/images/week1_easy
rm -f student.jpg teacher.jpg school.jpg classroom.jpg backpack.jpg book.jpg notebook.jpg library.jpg scientist.jpg pencil.jpg
rm -f wordpower_*.jpg
echo "✅ Deleted old images"

cd ../../..

# Step 2: Generate NEW vocab images for Easy mode
echo ""
echo "Step 2: Generating Easy vocab images..."
echo "Images needed: name.jpg, friend.jpg, desk.jpg, chair.jpg, pen.jpg, bag.jpg, toy.jpg, picture.jpg, box.jpg, door.jpg"

node tools/batch_manager.js 1 easy --images-only

# Step 3: Generate audio
echo ""
echo "Step 3: Generating audio files..."
node tools/generate_audio.js 1 easy

echo ""
echo "=== DONE ==="
echo "Check: public/images/week1_easy/ and public/audio/week1_easy/"
