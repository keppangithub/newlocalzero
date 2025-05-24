package main.java.com.example.server.boundary;

import main.java.com.example.server.controller.CommentHandler;
import main.java.com.example.server.controller.CreateInitiativeMediator;
import main.java.com.example.server.controller.InitiativeHandler;
import main.java.com.example.server.controller.InitiativeMediatorConcrete;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

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
    public ResponseEntity<List<ArrayList<String>>> getInits(@RequestParam String location) {
        return ResponseEntity.ok(initiativeHandler.getInitiatives(location));
    }
    @PostMapping("/inits")
    public ResponseEntity<?> postInits(@RequestBody Map<String,String> initiativeInfo) {
        boolean ok = initiativeMediator.createInitiative(initiativeInfo);
        if(ok) {
            return ResponseEntity.ok(Map.of("success", true));
        }else{
            return ResponseEntity.status(500).body(Map.of("fail", false));
        }
    }

    @GetMapping("/inits/{initiativeId}") //dubbelkolla
    public ResponseEntity<List<Object>> getInitiativeWithID(@PathVariable String initiativeId) {
        return ResponseEntity.ok(initiativeHandler.getInitiativeById(initiativeId));
    }

    @PutMapping("/inits/{id}")
    public ResponseEntity<?> putInitsID(@PathVariable String id, @RequestBody Map<String, String> description) {
        try {
            String newUpdate = description.get("description");
            String response = initiativeHandler.changeInitsDescription(id, newUpdate);
            if (response.equals("Initiative does not exist")) {
                return ResponseEntity.status(500).body(Map.of("fail",false));
            }
            return ResponseEntity.ok(Map.of("success",true));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("fail",false));
        }
    }

    @PostMapping("/inits/{id}")
    public ResponseEntity<?> postCommentOnIntiative(@RequestBody Map<String,String> body) {
        boolean ok = commentHandler.postComment(body);
        if(ok){
            return ResponseEntity.ok(Map.of("success",true));
        }else{
            return ResponseEntity.status(500).body(Map.of("fail",false));
        }
    }
}


