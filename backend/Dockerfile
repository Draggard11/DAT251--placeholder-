# ---------- BUILD ----------
FROM amazoncorretto:21-alpine-jdk AS builder

WORKDIR /app

COPY . .

RUN chmod +x gradlew
RUN ./gradlew bootJar --no-daemon

# ---------- RUN ----------
FROM amazoncorretto:21-alpine-jdk

WORKDIR /app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]