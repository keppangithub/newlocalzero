package main.java.com.example.server.boundary;

import main.java.com.example.server.controller.ChatHandler;
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
    public ResponseEntity<?> startChatWithUser(@RequestBody Map<String,String> userIds) {
        String user1Id = userIds.get("user1Id");
        String user2Id = userIds.get("user2Id");
        Boolean ok = chatHandler.startChatWithUser(user1Id, user2Id);
        if(ok){
            return ResponseEntity.ok(Map.of("success",true));
        }else{
            return ResponseEntity.status(500).body(Map.of("fail",false));
        }
    }


     @GetMapping("/chats")
    public List<List<Object>> getChats(@RequestBody Map<String,String> userInfo) {
        return chatHandler.getFormattedMessages(userInfo.get("userId"));
    }





}
