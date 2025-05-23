package main.java.com.example.server.controller;

import java.util.Map;

public class RoleValidationHandler extends RegistrationHandler {

    @Override
    public boolean handle(Map<String, String> userInfo) {
        String role = userInfo.get("role");
        if (role == null || !role.matches("^[a-zA-Z0-9]+$")) {
            return false;
        }
        if(next!=null){
            return next.handle(userInfo);
        }
        return true;
    }

}