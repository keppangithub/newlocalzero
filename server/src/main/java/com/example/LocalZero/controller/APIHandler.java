package com.example.LocalZero.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class APIHandler {

    @GetMapping("/inits")
    public ResponseEntity<String> getInits() {
        return ResponseEntity.ok("List of initiatives");
    }

    @GetMapping("/users")
    public ResponseEntity<String> getUsers() {
        return ResponseEntity.ok("List of users");
    }

}
