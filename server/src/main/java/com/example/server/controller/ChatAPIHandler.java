package main.java.com.example.server.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * info
 * @author Olivia Svensson, Mojtaba Hauari
 * */

@RestController
@RequestMapping("/api")

public class ChatAPIHandler {
    @GetMapping("/chats")
    public ResponseEntity<String> getChats(@RequestParam String id) {
        return ResponseEntity.ok("got user chats");

    }

    @PostMapping("/chats")
    public ResponseEntity<String> postChats(@RequestParam String id) {
        return ResponseEntity.ok("posted user chats");
    }

    @GetMapping("/chats/{id}")
    public ResponseEntity<String> getUserChatWithID(@RequestParam String id) {
        return ResponseEntity.ok("got user with request id");
    }

    @PostMapping("/chats/{id}")
    public ResponseEntity<String> postUserChatWithID(@RequestParam String id) {
        return ResponseEntity.ok("posted chat with user id");
    }
}

