package main.java.com.example.server.controller;

import org.springframework.stereotype.Component;

@Component
public class InitiativeUpdateNotification extends AbstractNotificationTemplate {
    @Override
    protected String generateContent() {
        return "Initiative description has been updated";
    }
}
