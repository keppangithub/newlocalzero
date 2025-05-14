package main.java.com.example.server.controller;

import com.mongodb.client.MongoDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.HandlerMapping;
import java.util.ArrayList;
import java.util.Map;

/**
 * info
 * @author Olivia Svensson, Mojtaba Hauari
 * */

@RestController
@RequestMapping("/api")
public class UsersAPIHandler {
    private final HandlerMapping resourceHandlerMapping;

    private final DatabaseConnection dbConnection;
    private MongoDatabase database;
    @Autowired
    private UserHandler userHandler;

    public UsersAPIHandler(@Qualifier("resourceHandlerMapping") HandlerMapping resourceHandlerMapping) {
        this.resourceHandlerMapping = resourceHandlerMapping;
        this.dbConnection = DatabaseConnection.getInstance();
        database = dbConnection.getDatabase();
    }

    @GetMapping("/users/{id}")
    public ArrayList<ArrayList<String>> getUserWithID(@PathVariable String id) {
            ArrayList<ArrayList<String>> response = userHandler.getUserID(id);
            if(response != null) {
                return response;
            }
        else {
            return new ArrayList<>();
            }
     }

    @PutMapping("/users/{id}/locations")
    public ResponseEntity<String> putUserLocationID(@PathVariable String id, @RequestParam int locationID) {
        String response = userHandler.setUserLocation(locationID, id);
        try {
            if (response.equals("User does not exist, unable to change location")) {
                return ResponseEntity.status(401).body("User does not exist, unable to change location");
            }
            return ResponseEntity.ok("Successfylly updated user's location");
        }catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/users/{id}/actions")
    public ArrayList<String> getUserActions(@PathVariable String id) {
        ArrayList<String> response = userHandler.getUserActions(id);
        if(response != null) {
            return response;
        }
        else {
            return new ArrayList<>();
        }
    }
    
    @PostMapping("/users/{id}/actions")
    public ResponseEntity<String> postActionWithUserID(@RequestBody String id) {
        return ResponseEntity.ok("posted user action with request id");
    }

    @PostMapping("/users/{id}/inits")
    public ResponseEntity<String> joinInit(@RequestParam String id) {
        return ResponseEntity.ok("Joined initiative with user id");
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
