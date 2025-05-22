package main.java.com.example.server.controller;

import java.util.Map;

public abstract class RegistrationHandler {
    protected RegistrationHandler next;

    public RegistrationHandler setNext(RegistrationHandler next) {
        this.next = next;
        return next;
    }

    public abstract boolean handle(Map<String, String> userInfo);

    //Username validation(), password validation (), email validation, email uniqueness, role validation handler
}
