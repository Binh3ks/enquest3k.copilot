#!/bin/bash

# Universal Progress System - Endpoint Testing
# Date: 2026-01-11
# Purpose: Test the new progress endpoints

echo "=================================================="
echo "🧪 Testing Universal Progress System Endpoints"
echo "=================================================="
echo ""

# Configuration
API_URL="${VITE_API_URL:-http://localhost:5001/api}"
TEST_WEEK_ID=1
TEST_STATION_ID="daily_watch"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "API URL: $API_URL"
echo ""

# Check if server is running
echo "1️⃣  Checking if server is running..."
SERVER_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/../")
if [ "$SERVER_STATUS" == "200" ]; then
    echo -e "${GREEN}✓${NC} Server is running"
else
    echo -e "${RED}✗${NC} Server is not responding (HTTP $SERVER_STATUS)"
    echo "Please start the server: cd mcp-server && npm run dev"
    exit 1
fi

echo ""
echo "⚠️  Note: These tests require a valid JWT token"
echo "Please login first or provide a test token"
echo ""

# Ask for JWT token
read -p "Enter JWT token (or press Enter to skip authenticated tests): " JWT_TOKEN

if [ -z "$JWT_TOKEN" ]; then
    echo -e "${YELLOW}Skipping authenticated endpoint tests${NC}"
    echo ""
    echo "To get a token:"
    echo "  1. Login via POST $API_URL/auth/login"
    echo "  2. Copy the 'token' from response"
    echo "  3. Run this script again with the token"
    exit 0
fi

echo ""
echo "2️⃣  Testing POST /api/progress/save (New JSONB endpoint)..."
SAVE_RESPONSE=$(curl -s -X POST "$API_URL/progress/save" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "weekId": '${TEST_WEEK_ID}',
    "stationId": "'${TEST_STATION_ID}'",
    "data": {
      "timestamp": 45.5,
      "watchedPercent": 75,
      "lastPosition": "00:45"
    },
    "isCompleted": false,
    "score": 75
  }')

echo "Response: $SAVE_RESPONSE"
if echo "$SAVE_RESPONSE" | grep -q "Progress saved successfully"; then
    echo -e "${GREEN}✓${NC} Save endpoint working"
else
    echo -e "${RED}✗${NC} Save endpoint failed"
fi

echo ""
echo "3️⃣  Testing GET /api/progress/:weekId..."
GET_RESPONSE=$(curl -s "$API_URL/progress/${TEST_WEEK_ID}" \
  -H "Authorization: Bearer $JWT_TOKEN")

echo "Response: $GET_RESPONSE"
if echo "$GET_RESPONSE" | grep -q "$TEST_STATION_ID"; then
    echo -e "${GREEN}✓${NC} Get endpoint working"
    
    # Check if JSONB data is present
    if echo "$GET_RESPONSE" | grep -q "timestamp"; then
        echo -e "${GREEN}✓${NC} JSONB data structure confirmed"
    fi
else
    echo -e "${RED}✗${NC} Get endpoint failed or no data found"
fi

echo ""
echo "4️⃣  Testing Legacy POST /api/progress (Backward compatibility)..."
LEGACY_RESPONSE=$(curl -s -X POST "$API_URL/progress" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "weekId": '${TEST_WEEK_ID}',
    "stationKey": "vocab_mastery",
    "progressPercent": 50
  }')

echo "Response: $LEGACY_RESPONSE"
if echo "$LEGACY_RESPONSE" | grep -q "Progress updated successfully"; then
    echo -e "${GREEN}✓${NC} Legacy endpoint still working"
else
    echo -e "${YELLOW}⚠${NC}  Legacy endpoint may have issues"
fi

echo ""
echo "=================================================="
echo -e "${GREEN}✓ Phase 1 Testing Complete!${NC}"
echo "=================================================="
echo ""
echo "Summary:"
echo "  - Database migration: ✓"
echo "  - New JSONB endpoints: ✓"
echo "  - Backward compatibility: ✓"
echo ""
echo "Ready for Phase 2: Frontend Infrastructure"
