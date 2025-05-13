package main.java.com.example.server.controller;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

/**
 * Singleton class to manage the MongoDB connection.
 * This class ensures that only one instance of the MongoDB connection is created.
 * @author Mojtaba Hauari, Olivia Svensson
 * @version 1.0
 */
public class DatabaseConnection {

    private static DatabaseConnection instance;
    private MongoClient mongoClient;
    private MongoDatabase database;

    @Value("${mongo.database.url}")
    private String url;

    private DatabaseConnection() {
        try {
            mongoClient = MongoClients.create(url);
            database = mongoClient.getDatabase("localzero");
        }catch(Exception e) {
            throw new RuntimeException("Error connecting to MongoDB: " + e.getMessage());
        }

    }

    public static DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }

    public MongoDatabase getDatabase() {
        return database;
    }

    public void closeConnection(){
        if(mongoClient != null) {
            mongoClient.close();
        }
    }


}
