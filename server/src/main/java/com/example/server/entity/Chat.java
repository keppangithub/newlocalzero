package main.java.com.example.server.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Document(collection = "chats")
public class Chat {
    @Id
    private String chatId;
    private List<String> userIds;


    public Chat(String chatId, String user1Id, String user2Id, long lastMessageTimestamp) {
        this.chatId = chatId;

    }

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }
}
