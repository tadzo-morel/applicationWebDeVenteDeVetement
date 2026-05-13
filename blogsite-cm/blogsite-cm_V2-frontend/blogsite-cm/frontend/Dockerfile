# =================================
# STAGE 1 : Build Angular
# =================================
FROM node:20-alpine AS builder

WORKDIR /build

# Cache npm install si package*.json inchanges
COPY package*.json ./
RUN npm install --no-audit --no-fund --legacy-peer-deps

COPY . .
RUN npm run build

# =================================
# STAGE 2 : Nginx
# =================================
FROM nginx:1.27-alpine

# Timezone Cameroun
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Africa/Douala /etc/localtime && \
    echo "Africa/Douala" > /etc/timezone

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Angular 20 avec @angular/build genere dans dist/blogSite/browser/
COPY --from=builder /build/dist/blogSite/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
