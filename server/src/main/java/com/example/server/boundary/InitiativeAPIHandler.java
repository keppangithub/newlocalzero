package main.java.com.example.server.boundary;

import main.java.com.example.server.controller.CommentHandler;
import main.java.com.example.server.controller.CreateInitiativeMediator;
import main.java.com.example.server.controller.InitiativeHandler;
import main.java.com.example.server.controller.InitiativeMediatorConcrete;
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
    @Autowired
    private CreateInitiativeMediator initiativeMediator;
    @Autowired
    private CommentHandler commentHandler;

    @GetMapping("/inits")
    public List<ArrayList<String>> getInits(@RequestBody Map<String,String> locationInfo) {
        String location = locationInfo.get("location");
        return initiativeHandler.getInitiatives(location);
    }
    @PostMapping("/inits")
    public boolean postInits(@RequestBody Map<String,String> initiativeInfo) {
        return initiativeMediator.createInitiative(initiativeInfo);
    }

    @GetMapping("/inits/{initiativeId}") //dubbelkolla
    public ArrayList<ArrayList<String>> getInitiativeWithID(@PathVariable String initiativeId) {
        return initiativeHandler.getInitiativeById(initiativeId);
    }

    @PutMapping("/inits/{id}")
    public ResponseEntity<String> putInitsID(@PathVariable String id, @RequestBody Map<String, String> description) {
        try {
            String newUpdate = description.get("description");
            String response = initiativeHandler.changeInitsDescription(id, newUpdate);
            if (response.equals("Initiative does not exist")) {
                return ResponseEntity.status(404).body("Initiative does not exist");
            }
            return ResponseEntity.ok("Successfully updated initiative");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/inits/{id}")
    public String postCommentOnIntiative(@RequestBody Map<String,String> body) {
        return commentHandler.postComment(body);

    }
}


