package main.java.com.example.server.controller;

import main.java.com.example.server.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthHandler {

    @Autowired
    private UserRepository userRepository;

    public List<Object> validateLogin(String email, String password) {
        List<User> users = userRepository.findByEmailAndPassword(email, password);
        if (users == null || users.isEmpty()) {
            return null;
        }else {
            User user = users.get(0);
            List<Object> response = new ArrayList<>();
            response.add(user.getUserID());
            response.add(user.getUsername());
            response.add(user.getEmail());
            response.add(user.getLocationID());
            response.add(user.getRole());
            return response;
        }
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }

}
