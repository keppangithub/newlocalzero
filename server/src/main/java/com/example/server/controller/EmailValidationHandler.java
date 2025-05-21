package main.java.com.example.server.controller;

import java.util.Map;

public class EmailValidationHandler extends RegistrationHandler{

    public boolean handle(Map<String, String> userInfo) {
        String email = userInfo.get("email");
        if (email == null || !email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            return false;
        }
        if(next != null){
            return next.handle(userInfo);
        }else{
            return false;
        }
    }
}
