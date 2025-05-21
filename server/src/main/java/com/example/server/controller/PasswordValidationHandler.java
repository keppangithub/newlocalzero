package main.java.com.example.server.controller;

import java.util.Map;

public class PasswordValidationHandler extends RegistrationHandler{
    @Override
    public boolean handle(Map<String, String> userInfo) {
        String password = userInfo.get("password");
        if (password == null ||
                password.length() < 10 ||
                password.length() > 65 || password.contains(" ") ||
                !password.matches("^[a-zA-Z0-9]+$")) {
            return false;
        }
        if (next != null){
            return next.handle(userInfo);
        }else {
            return true;
        }


    }
}
