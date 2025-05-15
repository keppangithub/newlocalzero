package main.java.com.example.server.boundary;

import main.java.com.example.server.controller.InitiativeHandler;
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

@RestController
@RequestMapping("/api")
public class InitiativeAPIHandler {

    @Autowired
    private InitiativeHandler initiativeHandler;
    @GetMapping("/inits")
    public List<ArrayList<String>> getInits(@RequestBody Map<String,String> locationInfo) {
        String location = locationInfo.get("location");
        return initiativeHandler.getInitiatives(location);
    }
    @PostMapping("/inits")
    public String postInits(@RequestBody Map<String,String> initiativeInfo) {
        return initiativeHandler.createInitiative(initiativeInfo);
    }

    @GetMapping("/inits/{initiativeId}") //dubbelkolla
    public ArrayList<ArrayList<String>> getInitiativeWithID(@PathVariable String initiativeId) {
        return initiativeHandler.getInitiativeById(initiativeId);
    }

    @PutMapping("/inits/{id}")
    public ResponseEntity<String> putInitsID(@RequestParam String id, @RequestParam String description) {
        try {
            String response = initiativeHandler.changeInitsDescription(id, description);
            if (response.equals("Initiative does not exist")) {
                return ResponseEntity.status(404).body("Initiative does not exist");
            }
            return ResponseEntity.ok("Successfully updated initiative");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/inits/{id}")
    public ResponseEntity<String> postInitsID(@RequestBody String body) {
        return ResponseEntity.ok("post inits id successful");
    }
}


