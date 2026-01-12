#!/bin/bash

# Universal Progress System - Migration Runner
# Date: 2026-01-11
# Purpose: Run database migration to add JSONB support

echo "=================================================="
echo "🚀 Universal Progress System Migration"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Load environment variables
if [ -f "mcp-server/.env" ]; then
    source mcp-server/.env
    echo -e "${GREEN}✓${NC} Loaded environment variables from mcp-server/.env"
else
    echo -e "${RED}✗${NC} File .env not found in mcp-server/"
    echo "Please create mcp-server/.env with database credentials"
    exit 1
fi

# Check if migration file exists
MIGRATION_FILE="mcp-server/database/migration_add_user_progress.sql"
if [ ! -f "$MIGRATION_FILE" ]; then
    echo -e "${RED}✗${NC} Migration file not found: $MIGRATION_FILE"
    exit 1
fi

echo ""
echo "📋 Migration Details:"
echo "   - Add JSONB 'data' column to station_progress"
echo "   - Add 'is_completed' and 'score' columns"
echo "   - Rename 'station_key' to 'station_id'"
echo "   - Create GIN index for JSONB queries"
echo ""
echo -e "${YELLOW}⚠️  WARNING:${NC} This will modify your database structure"
echo "   Current data will be preserved, but backup is recommended!"
echo ""

# Ask for confirmation
read -p "Do you want to continue? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo -e "${YELLOW}Migration cancelled${NC}"
    exit 0
fi

echo ""
echo "🔄 Running migration..."

# Build connection string
DB_URL="postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}"

# Run migration
psql "$DB_URL" -f "$MIGRATION_FILE"

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✓ Migration completed successfully!${NC}"
    echo ""
    echo "📊 Verifying changes..."
    
    # Verify the new structure
    psql "$DB_URL" -c "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'station_progress' ORDER BY ordinal_position;"
    
    echo ""
    echo -e "${GREEN}✓ Phase 1 Complete!${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Restart backend server: cd mcp-server && npm run dev"
    echo "  2. Test endpoints with: npm run test:progress (if available)"
    echo "  3. Proceed to Phase 2 (Frontend Infrastructure)"
else
    echo ""
    echo -e "${RED}✗ Migration failed!${NC}"
    echo "Please check the error messages above"
    exit 1
fi
