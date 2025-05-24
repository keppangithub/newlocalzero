package main.java.com.example.server.controller;

import main.java.com.example.server.entity.Chat;
import main.java.com.example.server.entity.Message;
import main.java.com.example.server.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatHandler {

    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserRepository userRepository;

    public Chat createChat(String chatId, String user1Id, String user2Id, long l) {
        if(chatId == null || user1Id == null || user2Id == null) {
            return null;
        }

        List<String> userIds = List.of(user1Id, user2Id);

        Chat chat = new Chat(chatId, userIds, l);
        chatRepository.save(chat);
        return chat;
    }

    public boolean startChatWithUser(String user1Id, String user2Id) {
        String chatId = generateChatId(user1Id, user2Id);
        List<Chat> chatBetweenUser = chatRepository.findByChatId(chatId);
        if(chatBetweenUser.size() != 0) {
            return false;
        }

        Chat chat = createChat(chatId, user1Id, user2Id, System.currentTimeMillis());
        if(chat == null) {
            return false;
        }
        return true;
    }

    public String generateChatId(String user1Id, String user2Id) {
        return user1Id.compareTo(user2Id) < 0 ? user1Id + "_" + user2Id : user2Id + "_" + user1Id;
    }

    public List<List<Object>> getFormattedMessages(String userId) {
        List<Chat> chats = chatRepository.findByUserIdsContaining(userId);
        User user = userRepository.findByUserID(userId);


        List<List<Object>> formattedChats = new ArrayList<>();

        for (Chat chat : chats) {
            List<Object> chatData = new ArrayList<>();
            String receiverId = chat.getOtherUserId(userId);
            User user1 = userRepository.findByUserID(receiverId);

            chatData.add(user1.getUsername());
            chatData.add(chat.getChatId());

            List<List<String>> formattedMessages = new ArrayList<>();
            List<Message> messages = messageRepository.findByChatId(chat.getChatId());
            for (Message message : messages) {
                List<String> messageData = new ArrayList<>();
                messageData.add(message.getContent());
                User sender = userRepository.findByUserID(message.getSenderId());
                messageData.add(sender.getUsername());
                messageData.add(String.valueOf(message.getDate()));
                formattedMessages.add(messageData);
            }

            chatData.add(formattedMessages);

            formattedChats.add(chatData);
        }

        return formattedChats;
    }

}
