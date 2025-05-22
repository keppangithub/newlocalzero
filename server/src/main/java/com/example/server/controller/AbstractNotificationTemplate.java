package main.java.com.example.server.controller;

import main.java.com.example.server.entity.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

public abstract class AbstractNotificationTemplate {

    @Autowired
    protected NotificationRepository notificationRepository;

    public final String sendNotification(List<String> receivers) {
        if (receivers == null || receivers.isEmpty()) {
            return "Receivers cannot be null or empty";
        }

        String content = generateContent();
        String time = generateTime();

        Notification notification = new Notification(content, time, new ArrayList<>(receivers));
        notificationRepository.save(notification);

        return "Notification created: " + content;
    }

    protected abstract String generateContent();

    protected String generateTime() {
        return java.time.ZonedDateTime.now().toString();
    }
}

