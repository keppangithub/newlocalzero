package main.java.com.example.server.controller;

import org.springframework.stereotype.Component;

@Component
public class MessageNotification extends AbstractNotificationTemplate {
    @Override
    protected String generateContent() {
        return "New message";
    }
}
