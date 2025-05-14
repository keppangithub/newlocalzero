package main.java.com.example.server.boundary;

import com.mongodb.client.MongoDatabase;
import main.java.com.example.server.controller.AuthHandler;
import main.java.com.example.server.controller.DatabaseConnection;
import main.java.com.example.server.controller.UserHandler;
import main.java.com.example.server.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * info
 * @author Mojtaba Hauari, Olivia Svensson
 * */

@RestController // den här classen är en restcontroller, används för API
@RequestMapping("/auth") // uri efter den första / <-- endpoint för API
public class AuthAPIHandler {

    private final DatabaseConnection dbConnection;
    @Autowired
    private UserHandler userHandler;
    private MongoDatabase database;
    @Autowired
    private AuthHandler authHandler;

    public AuthAPIHandler() {
         this.dbConnection = DatabaseConnection.getInstance();
         database = dbConnection.getDatabase();
    }

    @PostMapping("/login") // route/endpoint
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginInfo) {
        String username = loginInfo.get("username");
        String password = loginInfo.get("password");
        try {
            Boolean ok = authHandler.validateLogin(username, password);
            if (!ok) {
                return ResponseEntity.status(401).body("Invalid username or password");
            }
            return ResponseEntity.ok("Login successful for user: " + username);
        }catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Map<String, String> registerInfo) {
        String response = userHandler.registerUser(registerInfo);
        if(!response.equals("successfully registered user")) {
            return ResponseEntity.status(400).body(response);
        }
        return ResponseEntity.ok("Register successful for user: " + registerInfo);
    }
}
