package main.java.com.example.server.controller;

import main.java.com.example.server.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
@Service
public class UserHandler {
    @Autowired
    private UserRepository userRepository;

    public String registerUser(Map<String, String> Userinfo){
        String username = Userinfo.get("username");
        String password = Userinfo.get("password");
        String email = Userinfo.get("email");
        int location = Integer.parseInt(Userinfo.get("location"));
        String role = Userinfo.get("role");

        if(username == null || username.length() < 10 || username.length() > 65 || username.contains(" ") || !username.matches("^[a-zA-Z0-9]+$")){
            return "Username must be between 10 and 65 characters long, cannot contain spaces, and must only include alphanumeric characters, underscores, or hyphens.";
        }

        if(password == null || password.length() < 10 || password.length() > 65 || password.contains(" ")){
            return "Password must be between 10 and 65 characters long, cannot contain spaces, and must only include alphanumeric characters, underscores, or hyphens.";
        }

        if(email == null || !email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")){
            return "Email is not valid";
        }

        List<User> existingUsers = userRepository.findByEmail(email);
        if (!existingUsers.isEmpty()) {
            return "Email already exists";
        }

        if(role == null || role.length() < 10 || role.length() > 65 || role.contains(" ") || !role.matches("^[a-zA-Z0-9]+$")){
            return "Role must be between 10 and 65 characters long, cannot contain spaces, and must only include alphanumeric characters, underscores, or hyphens.";
        }

        User newUser = new User(username, password, email, location, role);
        //save the user in a local array or storage aswell? maybe not needed maybe needed have too loook into that
        User savedUser = userRepository.save(newUser);
        if(savedUser.equals(null)) {
            return "failed to save user in db";
        }
        return "successfully registered user";
    }

    public String getUserName(String otherUserId) {
        List<User> user = userRepository.findByUserID(otherUserId);
        if(user.isEmpty()) {
            return "Unknown";
        }else {
            return user.get(0).getUsername();
        }
    }
}
