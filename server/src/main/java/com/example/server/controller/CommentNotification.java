package main.java.com.example.server.controller;

import org.springframework.stereotype.Component;

@Component
public class CommentNotification extends AbstractNotificationTemplate {
    @Override
    protected String generateContent() {
        return "New comment on your initiative";
    }
}
