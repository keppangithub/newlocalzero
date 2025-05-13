package main.java.com.example.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class APIHandler {

    public ResponseEntity<String> getInits() {
        return ResponseEntity.ok("List of initiatives");
    }

    public ResponseEntity<String> getUsers() {
        return ResponseEntity.ok("List of users");
    }

}
