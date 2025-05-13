package main.java.com.example.server.controller;

import com.mongodb.client.MongoDatabase;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.HandlerMapping;


/**
 * info
 * @author Olivia Svensson, Mojtaba Hauari
 * //chaining design pattern ? routar/går igenom? ha metod för att hantera request?
 * */

@RestController
@RequestMapping("/api")
public class UsersAPIHandler {
    private final HandlerMapping resourceHandlerMapping;

    private final DatabaseConnection dbConnection;
    private MongoDatabase database;

    public UsersAPIHandler(@Qualifier("resourceHandlerMapping") HandlerMapping resourceHandlerMapping) {
        this.resourceHandlerMapping = resourceHandlerMapping;

        this.dbConnection = DatabaseConnection.getInstance();
        database = dbConnection.getDatabase();
    }
        @GetMapping("/users/{id}")
        public ResponseEntity<String> getUserWithID(@RequestParam String id) {
            //kolla om user finns i db, om ja få user, om inte så ge en error. ha i en try-catch block
            //kolla authapihandler /login, kalla på userhandler

            return ResponseEntity.ok("got user with request id");
        }

        @GetMapping("/users/{id}/actions")
        public ResponseEntity<String> getUsersWithIDActions(@RequestParam String id) {
            return ResponseEntity.ok("got user actions with request id");
        }

        @PostMapping("/users/{id}/actions")
        public ResponseEntity<String> postActionWithUserID(@RequestBody String id) {
            return ResponseEntity.ok("posted user action with request id");
        }

        @PostMapping("/users/{id}/inits")
        public ResponseEntity<String> joinInit(@RequestParam String id) {
            return ResponseEntity.ok("Joined iniative with user id");
        }

        @GetMapping("/users/{id}/notifications")
        public ResponseEntity<String> getNotifications(@RequestParam String id) {
            return ResponseEntity.ok("Got notifications for user id");
        }

    @PostMapping("/users/{id}/notifications")
    public ResponseEntity<String> postNotification(@RequestParam String id) {
        return ResponseEntity.ok("Post notification for user id");
    }

}
