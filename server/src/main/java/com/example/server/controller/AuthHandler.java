package main.java.com.example.server.controller;

import main.java.com.example.server.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthHandler {

    @Autowired
    private UserRepository userRepository;

    public List<User> validateLogin(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

}
