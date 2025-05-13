package src.main.java.com.example.server.controller;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.HandlerMapping;


/**
 * info
 * @author Olivia Svensson, Mojtaba Hauari
 * */

@RestController
@RequestMapping("/api")
public class UsersAPIHandler {
    private final HandlerMapping resourceHandlerMapping;

    public UsersAPIHandler(@Qualifier("resourceHandlerMapping") HandlerMapping resourceHandlerMapping) {
        this.resourceHandlerMapping = resourceHandlerMapping;
    }
        @GetMapping("/users/{id}")
        public ResponseEntity<String> getUserWithID(@RequestParam String id) {
            return ResponseEntity.ok("got user with request id");
        }

        @GetMapping("/users/{id}/actions")
        public ResponseEntity<String> getUsersWithIDActions(@RequestParam String id) {
            return ResponseEntity.ok("got user actions with request id");
        }

        @PostMapping("/users/{id}/actions")
        public ResponseEntity<String> postActionWithUserID(@RequestBody String id) {
            return ResponseEntity.ok("posted user action with request id");
        }

        @PostMapping("/users/{id}/inits")
        public ResponseEntity<String> joinInit(@RequestParam String id) {
            return ResponseEntity.ok("Joined iniative with user id");
        }

        @GetMapping("/users/{id}/notifications")
        public ResponseEntity<String> getNotifications(@RequestParam String id) {
            return ResponseEntity.ok("Got notifications for user id");
        }

    @PostMapping("/users/{id}/notifications")
    public ResponseEntity<String> postNotification(@RequestParam String id) {
        return ResponseEntity.ok("Post notification for user id");
    }

}
