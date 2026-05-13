# =================================
# STAGE 1 : Build avec Maven
# =================================
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /build

# Optimisation : retries Maven pour reseaux lents
ENV MAVEN_OPTS="-Dmaven.wagon.http.retryHandler.count=5 -Dmaven.wagon.http.timeout=120000"

# Telecharger les dependances en premier (cache Docker si pom.xml stable)
COPY pom.xml .
RUN mvn dependency:go-offline -B --fail-never || true

# Copier le code et compiler
COPY src ./src
RUN mvn clean package -DskipTests -B && \
    mv target/*.jar /build/app.jar

# =================================
# STAGE 2 : Runtime leger
# =================================
FROM eclipse-temurin:17-jre-alpine

# Outils minimum pour healthcheck + timezone
RUN apk add --no-cache wget tzdata && \
    cp /usr/share/zoneinfo/Africa/Douala /etc/localtime && \
    echo "Africa/Douala" > /etc/timezone && \
    addgroup -S app && adduser -S app -G app

WORKDIR /app
COPY --from=builder /build/app.jar app.jar

USER app
EXPOSE 8080

ENV JAVA_OPTS="-Xms256m -Xmx512m -XX:+UseContainerSupport"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
