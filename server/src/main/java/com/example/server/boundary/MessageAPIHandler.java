package main.java.com.example.server.boundary;

import main.java.com.example.server.controller.MessageHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class MessageAPIHandler {

    @Autowired
    private MessageHandler messageHandler;
/*
    @GetMapping("/messages/{userId}")
    public Map<String, Object> getMessages(@PathVariable String userId) {
        return messageHandler.getFormatedMessages(userId);
    }

 */

    @PostMapping("/messages")
    public ResponseEntity<?> sendMessage(@RequestBody Map<String, String> messageData) {
        String chatID = messageData.get("chatId");
        String message = messageData.get("text");
        String date = messageData.get("date");
        String senderId = messageData.get("sender");

        boolean ok = messageHandler.sendMessage(chatID, senderId, message,date);
        if(ok){
            return ResponseEntity.ok(Map.of("success",true));
        }else{
            return ResponseEntity.status(500).body(Map.of("fail",false));
        }
    }



}
