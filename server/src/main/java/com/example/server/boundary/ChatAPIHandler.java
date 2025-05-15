package main.java.com.example.server.boundary;

import main.java.com.example.server.controller.ChatHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ChatAPIHandler {

    @Autowired
    private ChatHandler chatHandler;

    @PostMapping("/chats")
    public String startChatWithUser(@RequestBody Map<String,String> userIds) {
        String user1Id = userIds.get("user1Id");
        String user2Id = userIds.get("user2Id");
        return chatHandler.startChatWithUser(user1Id, user2Id);
    }

/*
     @GetMapping("/chats")
    public Map<String,Object> getChats(@RequestParam String userId) {
        return chatHandler.getFormattedMessages(userId);
    }

 */



}
