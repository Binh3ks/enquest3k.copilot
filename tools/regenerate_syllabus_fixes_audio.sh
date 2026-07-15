#!/bin/bash

# Regenerate audio for syllabus compliance fixes
# Total: ~96 files (Week 1 Easy, Week 1 Advanced, Week 4 Easy, Week 7 Easy)

set -e

TTS_URL="https://binh3k-engquest3k.hf.space/tts"
TOTAL_FILES=96
CURRENT=0

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🎵 Regenerating Audio for Syllabus Compliance Fixes${NC}"
echo -e "${YELLOW}Total files to generate: ~${TOTAL_FILES}${NC}"
echo ""

# Function to generate audio
generate_audio() {
    local text="$1"
    local output_file="$2"
    local description="$3"
    
    CURRENT=$((CURRENT + 1))
    echo -e "${BLUE}[$CURRENT/$TOTAL_FILES]${NC} Generating: $description"
    
    # URL encode the text
    local encoded_text=$(echo -n "$text" | jq -sRr @uri)
    
    # Create directory if needed
    mkdir -p "$(dirname "$output_file")"
    
    # Generate audio
    if curl -s "${TTS_URL}?text=${encoded_text}&station=mindmap" -o "$output_file"; then
        local size=$(ls -lh "$output_file" | awk '{print $5}')
        echo -e "${GREEN}✅ Created: $output_file ($size)${NC}"
    else
        echo -e "${YELLOW}⚠️  Failed: $output_file${NC}"
    fi
    
    # Small delay to avoid overwhelming the server
    sleep 0.5
}

# Wake up HF Space
echo -e "${YELLOW}🔄 Waking up HF Space...${NC}"
curl -s "${TTS_URL}/health" > /dev/null || true
sleep 2

echo ""
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo -e "${BLUE}  WEEK 1 EASY - Identity Theme (42 files)  ${NC}"
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""

# Week 1 Easy - STEMS (6 files)
generate_audio "I am." "public/audio/week1_easy/mindmap_stem_1.mp3" "Week 1 Easy - Stem 1"
generate_audio "My name is." "public/audio/week1_easy/mindmap_stem_2.mp3" "Week 1 Easy - Stem 2"
generate_audio "I am years old." "public/audio/week1_easy/mindmap_stem_3.mp3" "Week 1 Easy - Stem 3"
generate_audio "I am a." "public/audio/week1_easy/mindmap_stem_4.mp3" "Week 1 Easy - Stem 4"
generate_audio "I like." "public/audio/week1_easy/mindmap_stem_5.mp3" "Week 1 Easy - Stem 5"
generate_audio "I want to be." "public/audio/week1_easy/mindmap_stem_6.mp3" "Week 1 Easy - Stem 6"

# Week 1 Easy - BRANCHES (36 files)
# Stem 1: "I am ___"
generate_audio "happy" "public/audio/week1_easy/mindmap_branch_1.mp3" "Week 1 Easy - happy"
generate_audio "a student" "public/audio/week1_easy/mindmap_branch_2.mp3" "Week 1 Easy - a student"
generate_audio "tall" "public/audio/week1_easy/mindmap_branch_3.mp3" "Week 1 Easy - tall"
generate_audio "short" "public/audio/week1_easy/mindmap_branch_4.mp3" "Week 1 Easy - short"
generate_audio "kind" "public/audio/week1_easy/mindmap_branch_5.mp3" "Week 1 Easy - kind"
generate_audio "good" "public/audio/week1_easy/mindmap_branch_6.mp3" "Week 1 Easy - good"

# Stem 2: "My name is ___"
generate_audio "Tom" "public/audio/week1_easy/mindmap_branch_7.mp3" "Week 1 Easy - Tom"
generate_audio "Anna" "public/audio/week1_easy/mindmap_branch_8.mp3" "Week 1 Easy - Anna"
generate_audio "John" "public/audio/week1_easy/mindmap_branch_9.mp3" "Week 1 Easy - John"
generate_audio "Mary" "public/audio/week1_easy/mindmap_branch_10.mp3" "Week 1 Easy - Mary"
generate_audio "Ben" "public/audio/week1_easy/mindmap_branch_11.mp3" "Week 1 Easy - Ben"
generate_audio "Lisa" "public/audio/week1_easy/mindmap_branch_12.mp3" "Week 1 Easy - Lisa"

# Stem 3: "I am ___ years old"
generate_audio "six" "public/audio/week1_easy/mindmap_branch_13.mp3" "Week 1 Easy - six"
generate_audio "seven" "public/audio/week1_easy/mindmap_branch_14.mp3" "Week 1 Easy - seven"
generate_audio "eight" "public/audio/week1_easy/mindmap_branch_15.mp3" "Week 1 Easy - eight"
generate_audio "nine" "public/audio/week1_easy/mindmap_branch_16.mp3" "Week 1 Easy - nine"
generate_audio "ten" "public/audio/week1_easy/mindmap_branch_17.mp3" "Week 1 Easy - ten"
generate_audio "five" "public/audio/week1_easy/mindmap_branch_18.mp3" "Week 1 Easy - five"

# Stem 4: "I am a ___"
generate_audio "student" "public/audio/week1_easy/mindmap_branch_19.mp3" "Week 1 Easy - student"
generate_audio "boy" "public/audio/week1_easy/mindmap_branch_20.mp3" "Week 1 Easy - boy"
generate_audio "girl" "public/audio/week1_easy/mindmap_branch_21.mp3" "Week 1 Easy - girl"
generate_audio "hero" "public/audio/week1_easy/mindmap_branch_22.mp3" "Week 1 Easy - hero"
generate_audio "friend" "public/audio/week1_easy/mindmap_branch_23.mp3" "Week 1 Easy - friend"
generate_audio "good student" "public/audio/week1_easy/mindmap_branch_24.mp3" "Week 1 Easy - good student"

# Stem 5: "I like ___"
generate_audio "reading" "public/audio/week1_easy/mindmap_branch_25.mp3" "Week 1 Easy - reading"
generate_audio "learning" "public/audio/week1_easy/mindmap_branch_26.mp3" "Week 1 Easy - learning"
generate_audio "playing" "public/audio/week1_easy/mindmap_branch_27.mp3" "Week 1 Easy - playing"
generate_audio "drawing" "public/audio/week1_easy/mindmap_branch_28.mp3" "Week 1 Easy - drawing"
generate_audio "my friends" "public/audio/week1_easy/mindmap_branch_29.mp3" "Week 1 Easy - my friends"
generate_audio "school" "public/audio/week1_easy/mindmap_branch_30.mp3" "Week 1 Easy - school"

# Stem 6: "I want to be ___"
generate_audio "a hero" "public/audio/week1_easy/mindmap_branch_31.mp3" "Week 1 Easy - a hero"
generate_audio "a scientist" "public/audio/week1_easy/mindmap_branch_32.mp3" "Week 1 Easy - a scientist"
generate_audio "a teacher" "public/audio/week1_easy/mindmap_branch_33.mp3" "Week 1 Easy - a teacher"
generate_audio "smart" "public/audio/week1_easy/mindmap_branch_34.mp3" "Week 1 Easy - smart"
generate_audio "helpful" "public/audio/week1_easy/mindmap_branch_35.mp3" "Week 1 Easy - helpful"
generate_audio "happy" "public/audio/week1_easy/mindmap_branch_36.mp3" "Week 1 Easy - happy"

echo ""
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo -e "${BLUE}  WEEK 1 ADVANCED - Identity Theme (42 files)${NC}"
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""

# Week 1 Advanced - STEMS (6 files)
generate_audio "I am." "public/audio/week1/mindmap_stem_1.mp3" "Week 1 Adv - Stem 1"
generate_audio "My full name is." "public/audio/week1/mindmap_stem_2.mp3" "Week 1 Adv - Stem 2"
generate_audio "I am years old." "public/audio/week1/mindmap_stem_3.mp3" "Week 1 Adv - Stem 3"
generate_audio "I am a." "public/audio/week1/mindmap_stem_4.mp3" "Week 1 Adv - Stem 4"
generate_audio "I like." "public/audio/week1/mindmap_stem_5.mp3" "Week 1 Adv - Stem 5"
generate_audio "When I grow up, I want to be." "public/audio/week1/mindmap_stem_6.mp3" "Week 1 Adv - Stem 6"

# Week 1 Advanced - BRANCHES (36 files)
# Stem 1: "I am ___"
generate_audio "a student" "public/audio/week1/mindmap_branch_1.mp3" "Week 1 Adv - a student"
generate_audio "happy every day" "public/audio/week1/mindmap_branch_2.mp3" "Week 1 Adv - happy every day"
generate_audio "learning new things" "public/audio/week1/mindmap_branch_3.mp3" "Week 1 Adv - learning new things"
generate_audio "curious about everything" "public/audio/week1/mindmap_branch_4.mp3" "Week 1 Adv - curious about everything"
generate_audio "good at many things" "public/audio/week1/mindmap_branch_5.mp3" "Week 1 Adv - good at many things"
generate_audio "excited to discover" "public/audio/week1/mindmap_branch_6.mp3" "Week 1 Adv - excited to discover"

# Stem 2: "My full name is ___"
generate_audio "Thomas Anderson" "public/audio/week1/mindmap_branch_7.mp3" "Week 1 Adv - Thomas Anderson"
generate_audio "Anna Smith" "public/audio/week1/mindmap_branch_8.mp3" "Week 1 Adv - Anna Smith"
generate_audio "John Wilson" "public/audio/week1/mindmap_branch_9.mp3" "Week 1 Adv - John Wilson"
generate_audio "Mary Johnson" "public/audio/week1/mindmap_branch_10.mp3" "Week 1 Adv - Mary Johnson"
generate_audio "Benjamin Lee" "public/audio/week1/mindmap_branch_11.mp3" "Week 1 Adv - Benjamin Lee"
generate_audio "Lisa Brown" "public/audio/week1/mindmap_branch_12.mp3" "Week 1 Adv - Lisa Brown"

# Stem 3: "I am ___ years old"
generate_audio "six years old" "public/audio/week1/mindmap_branch_13.mp3" "Week 1 Adv - six years old"
generate_audio "seven years old" "public/audio/week1/mindmap_branch_14.mp3" "Week 1 Adv - seven years old"
generate_audio "eight years old" "public/audio/week1/mindmap_branch_15.mp3" "Week 1 Adv - eight years old"
generate_audio "nine years old" "public/audio/week1/mindmap_branch_16.mp3" "Week 1 Adv - nine years old"
generate_audio "ten years old" "public/audio/week1/mindmap_branch_17.mp3" "Week 1 Adv - ten years old"
generate_audio "five years old" "public/audio/week1/mindmap_branch_18.mp3" "Week 1 Adv - five years old"

# Stem 4: "I am a ___"
generate_audio "student with big dreams" "public/audio/week1/mindmap_branch_19.mp3" "Week 1 Adv - student with big dreams"
generate_audio "boy who loves learning" "public/audio/week1/mindmap_branch_20.mp3" "Week 1 Adv - boy who loves learning"
generate_audio "girl who loves reading" "public/audio/week1/mindmap_branch_21.mp3" "Week 1 Adv - girl who loves reading"
generate_audio "hero in my own story" "public/audio/week1/mindmap_branch_22.mp3" "Week 1 Adv - hero in my own story"
generate_audio "friend to everyone" "public/audio/week1/mindmap_branch_23.mp3" "Week 1 Adv - friend to everyone"
generate_audio "person with superpowers" "public/audio/week1/mindmap_branch_24.mp3" "Week 1 Adv - person with superpowers"

# Stem 5: "I like ___"
generate_audio "reading adventure books" "public/audio/week1/mindmap_branch_25.mp3" "Week 1 Adv - reading adventure books"
generate_audio "doing exciting projects" "public/audio/week1/mindmap_branch_26.mp3" "Week 1 Adv - doing exciting projects"
generate_audio "learning about heroes" "public/audio/week1/mindmap_branch_27.mp3" "Week 1 Adv - learning about heroes"
generate_audio "discovering new things" "public/audio/week1/mindmap_branch_28.mp3" "Week 1 Adv - discovering new things"
generate_audio "using my imagination" "public/audio/week1/mindmap_branch_29.mp3" "Week 1 Adv - using my imagination"
generate_audio "helping my friends" "public/audio/week1/mindmap_branch_30.mp3" "Week 1 Adv - helping my friends"

# Stem 6: "When I grow up, I want to be ___"
generate_audio "a scientist discovering things" "public/audio/week1/mindmap_branch_31.mp3" "Week 1 Adv - a scientist discovering things"
generate_audio "a teacher helping students" "public/audio/week1/mindmap_branch_32.mp3" "Week 1 Adv - a teacher helping students"
generate_audio "someone who helps others" "public/audio/week1/mindmap_branch_33.mp3" "Week 1 Adv - someone who helps others"
generate_audio "smart and successful" "public/audio/week1/mindmap_branch_34.mp3" "Week 1 Adv - smart and successful"
generate_audio "a person who makes a difference" "public/audio/week1/mindmap_branch_35.mp3" "Week 1 Adv - a person who makes a difference"
generate_audio "happy with my superpowers" "public/audio/week1/mindmap_branch_36.mp3" "Week 1 Adv - happy with my superpowers"

echo ""
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo -e "${BLUE}  WEEK 7 EASY - Articles Fix (6 files)    ${NC}"
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""

# Week 7 Easy - Only branches with articles added
generate_audio "a pencil" "public/audio/week7_easy/mindmap_branch_1.mp3" "Week 7 Easy - a pencil (draw)"
generate_audio "a crayon" "public/audio/week7_easy/mindmap_branch_2.mp3" "Week 7 Easy - a crayon (draw)"
generate_audio "a marker" "public/audio/week7_easy/mindmap_branch_3.mp3" "Week 7 Easy - a marker (draw)"
generate_audio "a pen" "public/audio/week7_easy/mindmap_branch_4.mp3" "Week 7 Easy - a pen (draw)"

generate_audio "a pencil" "public/audio/week7_easy/mindmap_branch_13.mp3" "Week 7 Easy - a pencil (bag)"
generate_audio "a lunch box" "public/audio/week7_easy/mindmap_branch_15.mp3" "Week 7 Easy - a lunch box"
generate_audio "a water bottle" "public/audio/week7_easy/mindmap_branch_16.mp3" "Week 7 Easy - a water bottle"
generate_audio "a folder" "public/audio/week7_easy/mindmap_branch_17.mp3" "Week 7 Easy - a folder"

generate_audio "a pencil" "public/audio/week7_easy/mindmap_branch_25.mp3" "Week 7 Easy - a pencil (write)"
generate_audio "a pen" "public/audio/week7_easy/mindmap_branch_26.mp3" "Week 7 Easy - a pen (write)"
generate_audio "a marker" "public/audio/week7_easy/mindmap_branch_27.mp3" "Week 7 Easy - a marker (write)"
generate_audio "a crayon" "public/audio/week7_easy/mindmap_branch_28.mp3" "Week 7 Easy - a crayon (write)"
generate_audio "a colored pencil" "public/audio/week7_easy/mindmap_branch_30.mp3" "Week 7 Easy - a colored pencil (write)"

generate_audio "a crayon" "public/audio/week7_easy/mindmap_branch_31.mp3" "Week 7 Easy - a crayon (color)"
generate_audio "a marker" "public/audio/week7_easy/mindmap_branch_32.mp3" "Week 7 Easy - a marker (color)"
generate_audio "a colored pencil" "public/audio/week7_easy/mindmap_branch_33.mp3" "Week 7 Easy - a colored pencil (color)"
generate_audio "a red crayon" "public/audio/week7_easy/mindmap_branch_35.mp3" "Week 7 Easy - a red crayon"
generate_audio "a blue marker" "public/audio/week7_easy/mindmap_branch_36.mp3" "Week 7 Easy - a blue marker"

echo ""
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo -e "${BLUE}  WEEK 4 EASY - V-ing Fix (6 files)       ${NC}"
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""

# Week 4 Easy - Only V-ing branches that changed
generate_audio "playing" "public/audio/week4_easy/mindmap_branch_1.mp3" "Week 4 Easy - playing"
generate_audio "drawing" "public/audio/week4_easy/mindmap_branch_2.mp3" "Week 4 Easy - drawing"
generate_audio "reading" "public/audio/week4_easy/mindmap_branch_3.mp3" "Week 4 Easy - reading"
generate_audio "running" "public/audio/week4_easy/mindmap_branch_4.mp3" "Week 4 Easy - running"
generate_audio "jumping" "public/audio/week4_easy/mindmap_branch_5.mp3" "Week 4 Easy - jumping"
generate_audio "smiling" "public/audio/week4_easy/mindmap_branch_23.mp3" "Week 4 Easy - smiling"

echo ""
echo -e "${GREEN}════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✅ COMPLETED: $CURRENT files generated          ${NC}"
echo -e "${GREEN}════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Verify audio files: ls -lh public/audio/week{1,4,7}*/mindmap*.mp3"
echo "2. Upload to R2: tools/upload_all_mindmap_r2.sh"
echo "3. Test in app"
