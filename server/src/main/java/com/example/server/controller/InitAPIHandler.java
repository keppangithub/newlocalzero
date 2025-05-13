package src.main.java.com.example.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * info
 * @author Mojtaba Hauari, Olivia Svensson
 * */

@RestController
@RequestMapping("/api")
public class InitAPIHandler {
    @GetMapping("/inits")
    public ResponseEntity<String> getInits(@RequestParam String location) {
        return ResponseEntity.ok("location derived");
    }
    @PostMapping("/inits")
    public ResponseEntity<String> postInits(@RequestBody String body) {
        return ResponseEntity.ok("posted successfully");
    }

    @GetMapping("/inits/{id}") //dubbelkolla
    public ResponseEntity<String> getInitsID(@RequestParam String id) {
        return ResponseEntity.ok("get inits id successfull");
    }

    @PutMapping("/inits/{id}")
    public ResponseEntity<String> putInitsID(@RequestParam String id) {
        return ResponseEntity.ok("put inits id successfull");
    }

    @PostMapping("/inits/{id}")
    public ResponseEntity<String> postInitsID(@RequestBody String body) {
        return ResponseEntity.ok("post inits id successful");
    }
}


