package main.java.com.example.server.boundary;

import com.mongodb.client.MongoDatabase;
import main.java.com.example.server.controller.DatabaseConnection;
import main.java.com.example.server.controller.InitiativeHandler;
import main.java.com.example.server.controller.NotificationHandler;
import main.java.com.example.server.controller.UserHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.HandlerMapping;

import javax.swing.text.html.ObjectView;
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

    /*
      title: action[0],
          type: action[1],
          metric: action[2],
          date: action[3],
     */

    @GetMapping("/users/{id}/actions")
    public List<List<Object>> getUserActions(@PathVariable String id) {
        List<List<Object>> response = userHandler.getUserActions(id);

        if(response != null) {
            return response;
        }
        else {
            return new ArrayList<>();
        }
    }

    @GetMapping("/users/{id}/inits")
    public ResponseEntity<List<List<Object>>> getUserInits(@PathVariable String id) {
        List<List<Object>> initiatives = initiativeHandler.getInitiativeByUserId(id);
        if(initiatives != null) {
            return ResponseEntity.ok(initiatives);
        }else{
            return ResponseEntity.ok(new ArrayList<>());
        }
    }

    @PostMapping("/users/{id}/actions")
    public ResponseEntity<String> postActionWithUserID(@RequestBody Map<String, String> actionInfo)  {
        boolean ok = userHandler.postUserAction(actionInfo);
        if(ok){
            return ResponseEntity.ok("Action posted successfully");
        }else{
            return ResponseEntity.status(400).body("Failed to post action");
        }
    }

    @PostMapping("/users/{id}/inits")
    public ResponseEntity<String> joinInit(@RequestBody Map<String,String> initiativeInfo) {
        try {
            String initiativeId = initiativeInfo.get("initiativeID");
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
