FROM maven:3.8.4-openjdk-17 AS build
COPY . .
WORKDIR /backend
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-slim
COPY --from=build /backend/target/backend-0.0.1-SNAPSHOT.jar backend.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "backend.jar"]
