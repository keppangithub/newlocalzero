package main.java.com.example.server.controller;

import main.java.com.example.server.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserHandler {

    @Autowired
    private UserRepository userRepository;

    public User getUserID(String userID) {
        return userRepository.findByUserID(userID);
    }

}
