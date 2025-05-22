package main.java.com.example.server.controller;

import main.java.com.example.server.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthHandler {

    @Autowired
    private UserRepository userRepository;

    public User validateLogin(String email, String password) {
        List<User> user = userRepository.findByEmailAndPassword(email, password);
        if(user == null || user.isEmpty()) {
            return null;
        }
        return user.get(0);
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }

}
