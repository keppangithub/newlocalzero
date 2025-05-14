package main.java.com.example.server.controller;

import main.java.com.example.server.entity.ActionType;
import main.java.com.example.server.entity.Initiative;
import main.java.com.example.server.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import main.java.com.example.server.entity.Action;
@Service
public class UserHandler {
    @Autowired
    private UserRepository userRepository;

    public Boolean registerUser(Map<String, String> Userinfo){
        String username = Userinfo.get("username");
        String password = Userinfo.get("password");
        String email = Userinfo.get("email");
        int location = Integer.parseInt(Userinfo.get("location"));
        String role = Userinfo.get("role");

        if(username == null || username.length() < 10 || username.length() > 65 || username.contains(" ") || !username.matches("^[a-zA-Z0-9]+$")){
            throw new IllegalArgumentException("Username must be between 10 and 65 characters long, cannot contain spaces, and must only include alphanumeric characters, underscores, or hyphens.");
        }

        if(password == null || password.length() < 10 || password.length() > 65 || password.contains(" ")){
            throw new IllegalArgumentException("Password must be between 10 and 65 characters long, cannot contain spaces.");
        }

        if(email == null || !email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")){
            throw new IllegalArgumentException("Email is not valid");
        }

        List<User> existingUsers = userRepository.findByEmail(email);
        if (!existingUsers.isEmpty()) {
            throw new IllegalArgumentException("Email already exists");
        }

        if(role == null || role.length() < 10 || role.length() > 65 || role.contains(" ") || !role.matches("^[a-zA-Z0-9]+$")){
            throw new IllegalArgumentException("Role must be between 10 and 65 characters long, cannot contain spaces, and must only include alphanumeric characters, underscores, or hyphens.");
        }

        User newUser = new User(username, password, email, location, role);
        //save the user in a local array or storage aswell? maybe not needed maybe needed have too loook into that
        User savedUser = userRepository.save(newUser);
        if(savedUser.equals(null)) {
            return false;
        }
        return true;
    }

    public ArrayList<ArrayList<String>> getUserID(String userID) {
        User user = userRepository.findByUserID(userID);
        ArrayList<ArrayList<String>> userInfo = new ArrayList<ArrayList<String>>();

        ArrayList<String> info = new ArrayList<>();
        info.add("Username: " + user.getUsername());
        info.add("Role: " + user.getRole());
        info.add("Location ID: " + user.getLocationID());
        userInfo.add(info);

        ArrayList<String> initiatives = new ArrayList<>();
        if(user.getInitatives() != null) {
            for(Initiative initiative : user.getInitatives()) {
                initiatives.add("Initiative: " + initiative.toString());
            }
        }
        userInfo.add(initiatives);

        ArrayList<String> actions = new ArrayList<>();
        if(user.getActions() != null) {
            for(Action action : user.getActions()) {
                actions.add("Initiative: " + action.toString());
            }
        }
        userInfo.add(actions);
        return userInfo;
    }

    public String setUserLocation(int locationID, String userID) {
        User user = userRepository.findByUserID(userID);

            if(user != null) {
                user.setLocation(locationID);
                userRepository.save(user);
                return "Location has been successfully updated";
            } else {
                return "User does not exist, unable to change location";
            }
    }

    public ArrayList<String> getUserActions(String id) {
        User user = userRepository.findByUserID(id);

        ArrayList<String> actions = new ArrayList<>();
        if(user.getActions() != null) {
            for(Action action : user.getActions()) {
                actions.add("Initiative: " + action.toString());
            }
        }
        return actions;
    }

    public String postUserAction(String id, ActionType type, int duration, Date date, String name) {
        User user = userRepository.findByUserID(id);

        if (user == null) {
            return "User does not exist";
        }

        if (type == null || name == null || date == null || duration <= 0) {
            return "Action is empty";
        }

        // Add the action to the user
        user.postAction(type, duration, date, name);
        userRepository.save(user);  // Save the updated user

        return "Action posted successfully";
    }
}
