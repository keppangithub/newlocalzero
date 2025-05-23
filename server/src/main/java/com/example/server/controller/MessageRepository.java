package main.java.com.example.server.controller;

import main.java.com.example.server.entity.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findBySenderId(String userId);
    List<Message> findByChatId(String chatId);
    List<Message> findBySenderIdOrReceiverId(String userId,String userId2);

}
