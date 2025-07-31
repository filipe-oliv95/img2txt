# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21-jre

# Instala apenas o binário do Tesseract
RUN apt-get update && \
    apt-get install -y tesseract-ocr && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia o .jar
COPY --from=build /app/target/*.jar app.jar

# Copia os arquivos de idioma
COPY ./src/main/resources/tessdata /app/tessdata

# Aponta onde estão os arquivos .traineddata
ENV TESSDATA_PREFIX=/app/tessdata

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
