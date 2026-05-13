#!/usr/bin/env bash
# Smoke test bash pour blogSite
# Usage : bash smoke-test.sh

PASS=0
FAIL=0
RESULTS=()

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

test_step() {
    local name="$1"
    shift
    echo -n "  Test : $name ... "
    if "$@" > /dev/null 2>&1; then
        echo -e "${GREEN}OK${NC}"
        PASS=$((PASS + 1))
        RESULTS+=("[OK]   $name")
        return 0
    else
        echo -e "${RED}FAIL${NC}"
        FAIL=$((FAIL + 1))
        RESULTS+=("[FAIL] $name")
        return 1
    fi
}

echo ""
echo "=========================================="
echo " Smoke test blogSite"
echo "=========================================="
echo ""

# 1. Pre-requis
echo "1. Pre-requis"
test_step "docker installe" docker --version
test_step "docker-compose installe" docker-compose --version

# 2. Fichiers
echo ""
echo "2. Fichiers projet"
test_step "docker-compose.yml" test -f docker-compose.yml
test_step ".env (sinon le creer : cp .env.example .env)" test -f .env
test_step "backend/pom.xml" test -f backend/pom.xml
test_step "backend/Dockerfile" test -f backend/Dockerfile
test_step "frontend/package.json" test -f frontend/package.json
test_step "frontend/Dockerfile" test -f frontend/Dockerfile

# 3. Conteneurs
echo ""
echo "3. Conteneurs Docker"
docker-compose ps > /tmp/dc_ps.txt 2>&1 || true
test_step "blogsite-mysql Up" grep -q "blogsite-mysql.*Up" /tmp/dc_ps.txt
test_step "blogsite-backend Up" grep -q "blogsite-backend.*Up" /tmp/dc_ps.txt
test_step "blogsite-frontend Up" grep -q "blogsite-frontend.*Up" /tmp/dc_ps.txt

# 4. Endpoints
echo ""
echo "4. Endpoints HTTP"

check_url() {
    local url="$1"
    local code
    code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$url" 2>/dev/null)
    [ "$code" = "200" ] || [ "$code" = "302" ]
}

check_regions() {
    local count
    count=$(curl -s --max-time 5 http://localhost:8080/api/v1/regions 2>/dev/null \
        | grep -o '"id":' | wc -l)
    [ "$count" -eq 10 ]
}

test_step "Backend ping (8080)" check_url "http://localhost:8080/api/v1/ping"
test_step "Backend regions = 10 entrees" check_regions
test_step "Backend Swagger UI" check_url "http://localhost:8080/swagger-ui.html"
test_step "Frontend (4200)" check_url "http://localhost:4200/"

# 5. Test fonctionnel
echo ""
echo "5. Test fonctionnel"

check_admin_login() {
    local response
    response=$(curl -s --max-time 5 -X POST http://localhost:8080/api/v1/auth/login \
        -H "Content-Type: application/json" \
        -d '{"identifier":"admin@blogsite.cm","password":"Admin@123"}' 2>/dev/null)
    echo "$response" | grep -q '"accessToken"'
}

test_step "Login admin par defaut" check_admin_login

# Synthese
echo ""
echo "=========================================="
echo " Resultats : $PASS OK, $FAIL FAIL"
echo "=========================================="
for r in "${RESULTS[@]}"; do
    echo "  $r"
done
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}Tous les tests passent. La stack est operationnelle.${NC}"
    exit 0
else
    echo -e "${YELLOW}Des tests ont echoue.${NC}"
    echo "  - Verifier que la stack est demarree : docker-compose ps"
    echo "  - Patientez 60s apres docker-compose up (demarrage MySQL + backend)"
    echo "  - Voir les logs : docker-compose logs -f"
    exit 1
fi
