package main.java.com.example.server.controller;

import com.mongodb.client.MongoDatabase;
import main.java.com.example.server.entity.ActionType;
import main.java.com.example.server.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.HandlerMapping;

import java.util.*;

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
    @Autowired
    private InitiativeHandler initiativeHandler;

    public UsersAPIHandler(@Qualifier("resourceHandlerMapping") HandlerMapping resourceHandlerMapping) {
        this.resourceHandlerMapping = resourceHandlerMapping;
        this.dbConnection = DatabaseConnection.getInstance();
        database = dbConnection.getDatabase();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<ArrayList<String>> getUserWithID(@PathVariable String id) {
            ArrayList<String> userInfo = userHandler.getUserInfoByID(id);
            if(userInfo != null) {
                return ResponseEntity.ok(userInfo);
            }
            else {
                return ResponseEntity.ok(new ArrayList<>());
            }
     }

    @PutMapping("/users/{id}/locations")
    public ResponseEntity<String> putUserLocationID(@PathVariable String id, @RequestParam String locationID) {
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

    @GetMapping("/users/{id}/inits")
    public ResponseEntity<List<ArrayList<String>>> getUserInits(@PathVariable String id) {
        List<ArrayList<String>> inits = initiativeHandler.getInitiativeByUserId(id);
        if(inits != null) {
            return ResponseEntity.ok(inits);
        }else{
            return ResponseEntity.ok(new ArrayList<>());
        }
    }

    @PostMapping("/users/{id}/actions")
    public ResponseEntity<?> postActionWithUserID(@RequestBody Map<String, String> actionInfo)  {
        boolean ok = userHandler.postUserAction(actionInfo);
        if(ok){
            return ResponseEntity.ok(Map.of("success",true));
        }else{
            return ResponseEntity.status(500).body(Map.of("fail",false));
        }
    }

    @PostMapping("/users/{id}/inits")
    public ResponseEntity<?> joinInit(@RequestBody Map<String,String> initiativeInfo) {
        try {
            String initiativeId = initiativeInfo.get("initiativeId");
            String userId = initiativeInfo.get("userID");
            String response = userHandler.joinInitiative(initiativeId,userId);
            switch (response) {
                case "Initiative is empty":
                    return ResponseEntity.status(500).body(Map.of("fail",false));
                case "User does not exist":
                    return ResponseEntity.status(500).body(Map.of("fail",false));
                case "User has already joined this initiative":
                    return ResponseEntity.status(500).body(Map.of("fail",false));
                default:
                    return ResponseEntity.ok(Map.of("success",true));
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
