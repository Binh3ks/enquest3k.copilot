#!/bin/bash

###############################################################################
# YOUTUBE API QUOTA CHECKER
#
# Tests if the YouTube API key in .env has available quota.
# Prevents Issue #1 from W17-18 (quota exhausted during production).
#
# Usage: ./tools/check_api_quota.sh
###############################################################################

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "╔════════════════════════════════════════╗"
echo "║    YOUTUBE API QUOTA CHECKER V2.0      ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
  echo -e "${RED}❌ Error: .env file not found${NC}"
  echo ""
  echo "Create .env file with:"
  echo "  YOUTUBE_API_KEY=your_key_here"
  echo ""
  exit 1
fi

# Extract API key from .env
API_KEY=$(grep YOUTUBE_API_KEY .env | cut -d'=' -f2 | tr -d ' "'"'"'')

if [ -z "$API_KEY" ]; then
  echo -e "${RED}❌ Error: YOUTUBE_API_KEY not found in .env${NC}"
  echo ""
  echo "Add to .env:"
  echo "  YOUTUBE_API_KEY=your_key_here"
  echo ""
  exit 1
fi

echo -e "${BLUE}🔑 API Key:${NC} ${API_KEY:0:25}...${API_KEY: -5}"
echo ""
echo -e "${BLUE}🔍 Testing quota availability...${NC}"
echo ""

# Test with a simple query
TEST_QUERY="test"
RESPONSE=$(curl -s "https://www.googleapis.com/youtube/v3/search?part=snippet&q=$TEST_QUERY&type=video&maxResults=1&key=$API_KEY")

# Check for quota error
if echo "$RESPONSE" | grep -q '"quotaExceeded"'; then
  echo -e "${RED}❌ API QUOTA EXCEEDED!${NC}"
  echo ""
  echo "Your API key has exceeded its daily quota limit."
  echo ""
  echo "📊 YouTube API Quota Limits:"
  echo "   - Standard: 10,000 units/day"
  echo "   - 1 search = 100 units"
  echo "   - Max ~100 searches/day per key"
  echo ""
  echo "🔧 Solutions:"
  echo "   1. Wait 24 hours for quota reset (resets at midnight PST)"
  echo "   2. Get a new API key from Google Cloud Console:"
  echo "      https://console.cloud.google.com/apis/credentials"
  echo "   3. Update .env with new key:"
  echo "      YOUTUBE_API_KEY=new_key_here"
  echo "   4. Re-run this script to verify"
  echo ""
  exit 1

# Check for invalid key error
elif echo "$RESPONSE" | grep -q '"keyInvalid"'; then
  echo -e "${RED}❌ API KEY INVALID!${NC}"
  echo ""
  echo "The API key in .env is not valid."
  echo ""
  echo "🔧 Actions:"
  echo "   1. Verify key is correct (no extra spaces/quotes)"
  echo "   2. Check key is enabled in Google Cloud Console"
  echo "   3. Ensure YouTube Data API v3 is enabled for this key"
  echo ""
  exit 1

# Check for permission error
elif echo "$RESPONSE" | grep -q '"accessNotConfigured"'; then
  echo -e "${RED}❌ API NOT ENABLED!${NC}"
  echo ""
  echo "YouTube Data API v3 is not enabled for this project."
  echo ""
  echo "🔧 Actions:"
  echo "   1. Go to: https://console.cloud.google.com/apis/library"
  echo "   2. Search: YouTube Data API v3"
  echo "   3. Click 'Enable'"
  echo ""
  exit 1

# Check for successful response
elif echo "$RESPONSE" | grep -q '"items"'; then
  echo -e "${GREEN}✅ API KEY WORKING - QUOTA AVAILABLE${NC}"
  echo ""
  
  # Extract and show sample result
  SAMPLE_TITLE=$(echo "$RESPONSE" | grep -o '"title":"[^"]*' | head -1 | cut -d'"' -f4)
  
  if [ -n "$SAMPLE_TITLE" ]; then
    echo "📺 Sample search result:"
    echo "   \"$SAMPLE_TITLE\""
    echo ""
  fi
  
  echo "✅ Ready for mass production"
  echo ""
  echo "💡 Tips:"
  echo "   - 1 week = 5 searches = 500 quota units"
  echo "   - Daily limit: ~20 weeks (10,000 / 500)"
  echo "   - Plan batches accordingly"
  echo ""
  exit 0

# Unknown error
else
  echo -e "${YELLOW}⚠️  UNEXPECTED RESPONSE${NC}"
  echo ""
  echo "Response:"
  echo "$RESPONSE" | head -20
  echo ""
  echo "Check:"
  echo "   1. Internet connection"
  echo "   2. API key format in .env"
  echo "   3. Google Cloud Console status"
  echo ""
  exit 1
fi
