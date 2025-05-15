package main.java.com.example.server.controller;

import main.java.com.example.server.entity.Chat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ChatHandler {

    @Autowired
    private ChatRepository chatRepository;

    public Chat createChat(String chatId, String user1Id, String user2Id, long l) {
        if(chatId == null || user1Id == null || user2Id == null) {
            return null;
        }

        List<String> userIds = List.of(user1Id, user2Id);

        Chat chat = new Chat(chatId, userIds, l);
        chatRepository.save(chat);
        return chat;
    }

    public String startChatWithUser(String user1Id, String user2Id) {
        String chatId = generateChatId(user1Id, user2Id);
        List<Chat> chatBetweenUser = chatRepository.findByChatId(chatId);
        if(chatBetweenUser.size() != 0) {
            return "Chat already exists";
        }

        Chat chat = createChat(chatId, user1Id, user2Id, System.currentTimeMillis());
        if(chat == null) {
            return "Failed to create chat";
        }
        return "Successfully started chat";
    }

    public String generateChatId(String user1Id, String user2Id) {
        return user1Id.compareTo(user2Id) < 0 ? user1Id + "_" + user2Id : user2Id + "_" + user1Id;
    }
/*

    public List<Map<String, Object>> getFormattedMessages(String userId) {
        List<Chat> chats = chatRepository.findByUserIdsContaining(userId);

        return chats.stream().map(chat -> {
            Map<String, Object> chatInfo = new HashMap<>();
            chatInfo.put("chatId", chat.getChatId());
            chatInfo.put("partnerId", chat.getOtherUserId(userId));
            chatInfo.put("lastMessageTimestamp", chat.getLastMessageTimestamp());
            return chatInfo;
        }).collect(Collectors.toList());
    }

 */
}
