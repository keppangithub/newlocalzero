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
        //kunna göra update, inenhåll ex caption uppdateras
    }

    @PostMapping("/inits/{id}")
    public ResponseEntity<String> postInitsID(@RequestBody String body) {
        return ResponseEntity.ok("post inits id successful");
    }
}


