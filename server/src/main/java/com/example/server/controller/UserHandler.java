package main.java.com.example.server.controller;

import main.java.com.example.server.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.CharacterEncodingFilter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class UserHandler {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private InitiativeRepository initiativeRepository;
    @Autowired
    private CharacterEncodingFilter characterEncodingFilter;

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

    public ArrayList<ArrayList<String>> getUserInfoByID(String userID) {
        User user = userRepository.findByUserID(userID);
        ArrayList<ArrayList<String>> userInfo = new ArrayList<ArrayList<String>>();

        ArrayList<String> info = new ArrayList<>();
        info.add("Username: " + user.getUsername());
        info.add("Role: " + user.getRole());
        info.add("Location ID: " + user.getLocationID());
        userInfo.add(info);

        ArrayList<String> initiatives = new ArrayList<>();
        if(user.getInitiatives() != null) {
            for(Initiative initiative : user.getInitiatives()) {
                initiatives.add("Initiative: " + initiative.toString());
            }
        }
        userInfo.add(initiatives);

        ArrayList<String> actions = new ArrayList<>();
        if(user.getActions() != null) {
            for(Action action : user.getActions()) {
                actions.add("Actions: " + action.toString());
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

        user.postAction(type, duration, date, name);
        userRepository.save(user);

        return "Action posted successfully";
    }


    public String joinInitiative(String initiativeId, String userId) {

        User user = userRepository.findByUserID(userId);

        if (user == null) {
            return "User does not exist";
        }

        Initiative initiative = initiativeRepository.findInitiativeByInitiativeId(initiativeId);

        String title = initiative.getTitle();
        String description = initiative.getDescription();
        String location = initiative.getLocation();

        Category category = initiative.getCategory();
        String imgUrl = initiative.getImage();
        if (title == null || title.isEmpty() ||
                description == null || description.isEmpty() ||
                location == null || location.isEmpty() || category == null) {
            return "Initiative is empty";
        }

        if(initiative.getUserIds().contains(userId)){
            return "user already in initiative";
        }
        initiative.getUserIds().add(userId);
        initiativeRepository.save(initiative);

       // user.joinInitiative(initiativeId); ??
        return "User joined initiative successfully";
    }


    public ArrayList<String> getUserNotifications(String id) {
        User user = userRepository.findByUserID(id);
        if (user == null || user.getNotifications() == null) {
            return new ArrayList<>();
        }
        ArrayList<String> notifications = new ArrayList<>();
        for (Notification notification : user.getNotifications()) {
            notifications.add(notification.toString());
        }
        return notifications;
    }

    public String getUserName(String otherUserId) {
        User user = userRepository.findByUserID(otherUserId);
        if(user == null) {
            return "Unknown";
        }else {
            return user.getUsername();
        }
    }
}
