package main.java.com.example.server.controller;

import main.java.com.example.server.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class EmailUniquenessHandler extends RegistrationHandler{

    private final UserRepository userRepository;

    public EmailUniquenessHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean handle(Map<String, String> userInfo) {
        String email = userInfo.get("email");
        List<User> existingUsers = userRepository.findByEmail(email);
        if (!existingUsers.isEmpty()) {
            return false;
        }

        if (next != null) {
            next.handle(userInfo);
        }

        return true;
    }

}
