package main.java.com.example.server.controller;

import main.java.com.example.server.entity.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class NotificationHandler {

    @Autowired
    private NotificationRepository notificationRepository;

    public String createNotification(String content, ArrayList<String> receivers) {

        if (content == null || content.isEmpty()) {
            return "Content cannot be null or empty";
        }
        if (receivers == null || receivers.isEmpty()) {
            return "Receivers cannot be null or empty";
        }

        Notification notification = new Notification(content, "2023-10-01T12:00:00Z", receivers);
        notificationRepository.save(notification);

        return "Notification created successfully";
    }

}
