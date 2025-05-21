package main.java.com.example.server.controller;

import java.util.Map;

public class UsernameValidationHandler extends RegistrationHandler{
    @Override
    public boolean handle(Map<String, String> userInfo) {
        String username = userInfo.get("username");
        if (username == null ||
                username.length() < 10 ||
                username.length() > 65 || username.contains(" ") ||
                !username.matches("^[a-zA-Z0-9]+$")) {
            return false;
        }
        if (next != null) {
            return next.handle(userInfo);
        } else {
            return true;
        }
    }
}
