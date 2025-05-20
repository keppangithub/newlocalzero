package main.java.com.example.server.controller;

import main.java.com.example.server.entity.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String>{


    List<Notification> findByReceiversContaining(String userId);



}
