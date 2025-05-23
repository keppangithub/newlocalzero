package main.java.com.example.server.boundary;

import main.java.com.example.server.controller.ChatHandler;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ChatAPIHandler {

    @Autowired
    private ChatHandler chatHandler;

    @PostMapping("/chats")
    public ResponseEntity<String> startChatWithUser(@RequestBody Map<String,String> userIds) {
        String user1Id = userIds.get("user1Id");
        String user2Id = userIds.get("user2Id");
        return ResponseEntity.ok(chatHandler.startChatWithUser(user1Id, user2Id));
    }


     @GetMapping("/chats")
    public ResponseEntity<List<List<Object>>> getChats(@RequestBody Map<String,String> userInfo) {
        return ResponseEntity.ok(chatHandler.getFormattedMessages(userInfo.get("userId")));
    }





}
