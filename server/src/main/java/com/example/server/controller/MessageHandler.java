package main.java.com.example.server.controller;

import main.java.com.example.server.entity.Chat;
import main.java.com.example.server.entity.Message;
import main.java.com.example.server.entity.NotificationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MessageHandler {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private UserHandler userHandler;
    @Autowired
    private NotificationHandler notificationHandler;

    public Boolean sendMessage(String chatId, String senderId, String message ,String date) {
        List<Chat> chats = chatRepository.findByChatId(chatId);
        if (chats.isEmpty()) {
            return false;
        }
        Chat chat = chats.get(0);
        String recieverId = chat.getOtherUserId(senderId); // This is just to ensure the chat exists, you can add more logic if needed
        Message newMessage = new Message(chatId,senderId, recieverId, message, date);
        ArrayList<String> receivers = new ArrayList<>();
        receivers.add(recieverId);
        notificationHandler.createNotification(NotificationType.MESSAGE, receivers);
        messageRepository.save(newMessage);
        return true;
    }
/*
    public Map<String, Object> getFormatedMessages(String userId) {
        List<Message> messages = messageRepository.findBySenderId(userId);

        String otherUserId = messages.stream()
                .map(m -> m.getSenderId().equals(userId) ? m.getReceiverId() : m.getSenderId())
                .filter(id -> !id.equals(userId))
                .findFirst()
                .orElse("Unknown");

        String name = userHandler.getUserName(otherUserId);

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd").withZone(ZoneId.systemDefault());

        List<Map<String, String>> formattedMessages = messages.stream().map(msg -> {
            Map<String, String> msgMap = new HashMap<>();
            msgMap.put("text", msg.getContent());
            msgMap.put("sender", msg.getSenderId().equals(userId) ? "You" : name);
            msgMap.put("date", msg.getDate());
            return msgMap;
        }).collect(Collectors.toList());

        Map<String, Object> result = new HashMap<>();
        result.put("name", name);
        result.put("messages", formattedMessages);

        return result;
    }

 */

}
