package main.java.com.example.server;

import main.java.com.example.server.controller.DatabaseConnection;
import main.java.com.example.server.controller.MongoClientConnectionExample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication {


    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }

}
