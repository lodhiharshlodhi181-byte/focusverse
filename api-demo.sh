#!/bin/bash
# api-demo.sh - Demonstrate FocusVerse API endpoints

BASE_URL="http://localhost:5000/api"
EMAIL="demo@example.com"
PASSWORD="demo123"
TOKEN=""

echo "🎮 FocusVerse API Demo"
echo "===================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# 1. Check server health
echo -e "${BLUE}1️⃣  Checking Server Health...${NC}"
curl -s $BASE_URL/health | jq '.'
echo ""

# 2. Register a user
echo -e "${BLUE}2️⃣  Registering User...${NC}"
REGISTER_RESPONSE=$(curl -s -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d "{
    \"username\": \"demofuser\",
    \"email\": \"$EMAIL\",
    \"password\": \"$PASSWORD\",
    \"confirmPassword\": \"$PASSWORD\"
  }")

echo $REGISTER_RESPONSE | jq '.'
TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.token')
echo ""

# 3. Get user profile
echo -e "${BLUE}3️⃣  Fetching User Profile...${NC}"
curl -s -X GET $BASE_URL/user/profile \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

# 4. Update user stats
echo -e "${BLUE}4️⃣  Updating User Stats...${NC}"
curl -s -X PUT $BASE_URL/user/stats \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{
    \"totalFocus\": 120,
    \"productiveHours\": 2,
    \"nonProductiveHours\": 0.5
  }" | jq '.'
echo ""

# 5. Update avatar
echo -e "${BLUE}5️⃣  Updating Avatar...${NC}"
curl -s -X PUT $BASE_URL/user/avatar \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{
    \"expression\": \"happy\",
    \"level\": 2
  }" | jq '.'
echo ""

# 6. Get leaderboard
echo -e "${BLUE}6️⃣  Fetching Leaderboard...${NC}"
curl -s -X GET "$BASE_URL/leaderboard?page=1" \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

# 7. Get user rank
echo -e "${BLUE}7️⃣  Getting User Rank...${NC}"
curl -s -X GET $BASE_URL/leaderboard/rank \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

# 8. Get stats
echo -e "${BLUE}8️⃣  Fetching User Stats...${NC}"
curl -s -X GET $BASE_URL/stats \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

echo -e "${GREEN}✅ API Demo Complete!${NC}"
echo ""
echo "🎯 Next Steps:"
echo "1. Visit http://localhost:3000 in your browser"
echo "2. Login with:"
echo "   Email: $EMAIL"
echo "   Password: $PASSWORD"
echo "3. Check the dashboard to see updated stats"
echo ""
