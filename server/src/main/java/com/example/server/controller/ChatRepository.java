package main.java.com.example.server.controller;

import main.java.com.example.server.entity.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatRepository extends MongoRepository<Chat, String> {

    List<Chat> findByChatId(String chatId);
    List<Chat> findByUserIdsContaining(String userId);
}
