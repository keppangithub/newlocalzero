package main.java.com.example.server.controller;

import org.springframework.stereotype.Service;

@Service
public class MessageHandler {
    public String startChatWithUser(String user1Id, String user2Id) {



        return "Successfully started chat";
    }
}
