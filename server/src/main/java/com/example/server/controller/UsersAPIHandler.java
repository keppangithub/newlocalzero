package main.java.com.example.server.controller;

import com.mongodb.client.MongoDatabase;
import main.java.com.example.server.entity.ActionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.HandlerMapping;
import java.util.ArrayList;
import java.util.Date;
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
    @Autowired
    private NotificationHandler notificationHandler;

    public UsersAPIHandler(@Qualifier("resourceHandlerMapping") HandlerMapping resourceHandlerMapping) {
        this.resourceHandlerMapping = resourceHandlerMapping;
        this.dbConnection = DatabaseConnection.getInstance();
        database = dbConnection.getDatabase();
    }

    @GetMapping("/users/{id}")
    public ArrayList<ArrayList<String>> getUserWithID(@PathVariable String id) {
            ArrayList<ArrayList<String>> response = userHandler.getUserInfoByID(id);
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
            return ResponseEntity.ok("Successfully updated user's location");
        }catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/users/{id}/actions")
    public ArrayList<ArrayList<String>> getUserActions(@PathVariable String id) {
        ArrayList<ArrayList<String>> response = userHandler.getUserActions(id);
        if(response != null) {
            return response;
        }
        else {
            return new ArrayList<>();
        }
    }


    @PostMapping("/users/{id}/actions")
    public Boolean postActionWithUserID(@RequestBody Map<String, String> actionInfo)  {
        return userHandler.postUserAction(actionInfo);
    }

    @PostMapping("/users/{id}/inits")
    public ResponseEntity<String> joinInit(@RequestBody Map<String,String> initiativeInfo) {
        try {
            String initiativeId = initiativeInfo.get("initativeId");
            String userId = initiativeInfo.get("userID");
            String response = userHandler.joinInitiative(initiativeId,userId);
            switch (response) {
                case "Initiative is empty":
                    return ResponseEntity.status(400).body("Initiative is empty");
                case "User does not exist":
                    return ResponseEntity.status(404).body("User not found");
                case "User has already joined this initiative":
                    return ResponseEntity.status(409).body("User has already joined this initiative");
                default:
                    return ResponseEntity.ok("User joined initiative successfully");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/users/{id}/notifications")
    public ArrayList<ArrayList<String>> getNotifications(@PathVariable String id) {
        try {
            return notificationHandler.getUserNotifications(id);
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
}
