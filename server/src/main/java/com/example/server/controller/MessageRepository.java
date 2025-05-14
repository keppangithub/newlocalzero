package main.java.com.example.server.controller;

import main.java.com.example.server.entity.Message;
import main.java.com.example.server.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {
    //List<User> findByUserId(String senderId, String receiverId);
}
