package main.java.com.example.server.boundary;

import main.java.com.example.server.controller.MessageHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class MessageAPIHandler {

    @Autowired
    private MessageHandler messageHandler;


    @RequestMapping("/chats")
    public String startChatWithUser(@RequestBody Map<String,String> userIds) {
        String user1Id = userIds.get("user1Id");
        String user2Id = userIds.get("user2Id");

        return messageHandler.startChatWithUser(user1Id, user2Id);

    }

}
