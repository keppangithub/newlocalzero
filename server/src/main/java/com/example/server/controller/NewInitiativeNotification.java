package main.java.com.example.server.controller;

public class NewInitiativeNotification extends AbstractNotificationTemplate {
    @Override
    protected String generateContent() {
        return "New Initiative Created";
    }
}
