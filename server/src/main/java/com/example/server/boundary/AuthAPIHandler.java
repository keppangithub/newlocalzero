package main.java.com.example.server.boundary;

import com.mongodb.client.MongoDatabase;
import main.java.com.example.server.controller.AuthHandler;
import main.java.com.example.server.controller.DatabaseConnection;
import main.java.com.example.server.controller.RegistrationService;
import main.java.com.example.server.controller.UserHandler;
import main.java.com.example.server.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    @Autowired
    private RegistrationService registrationService;

    public AuthAPIHandler() {
         this.dbConnection = DatabaseConnection.getInstance();
         database = dbConnection.getDatabase();
    }
    //skicka tillbaka user kolla auth.js i frontend
    //skicka null eller något som kan kollas
    //json objekt med attributes från auth.js
    @PostMapping("/login") // route/endpoint
    public ResponseEntity<List<Object>> login(@RequestBody Map<String, String> loginInfo) {
        String email = loginInfo.get("email");
        String password = loginInfo.get("password");
        try {
            User user = authHandler.validateLogin(email, password);

            List<Object> response = new ArrayList<>();
            response.add(user.getUserID());
            response.add(user.getUsername());
            response.add(user.getEmail());
            response.add(user.getLocationID());
            response.add(user.getRole());

            if (user == null) {
                return ResponseEntity.status(401).body(List.of("Invalid email or password"));
            }
            return ResponseEntity.ok(response);
        }catch (Exception e) {
            return ResponseEntity.status(500).body(List.of("Internal server error"));
        }
    }

    @PostMapping("/register")
    public boolean register(@RequestBody Map<String, String> registerInfo) {
        return registrationService.registerUser(registerInfo);
    }
}
