package main.java.com.example.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * info
 * @author Mojtaba Hauari, Olivia Svensson
 * */

@RestController // den här classen är en restcontroller, används för API
@RequestMapping("/auth") // uri efter den första / <-- endpoint för API
public class AuthAPIHandler {

// Add your authentication methods here
    // For example, login, register, etc.

    // Example method
    @PostMapping("/login") // route/endpoint
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginInfo) {
        String username = loginInfo.get("username");
        String password = loginInfo.get("password");

        return ResponseEntity.ok("Login successful for user: " + username);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody String registerInfo) {
        return ResponseEntity.ok("Register successful for user: " + registerInfo);
    }

// maybe add logout??


}
