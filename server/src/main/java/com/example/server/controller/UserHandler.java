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
    @Autowired
    private ActionRepository actionRepository;

    //unfinished mpste fixa databas collection för den
    public ArrayList<ArrayList<String>> getUserActions(String userID) {
        List<Action> actions = actionRepository.findActionByUserID(userID);

        ArrayList<ArrayList<String>> results = new ArrayList<>();

            for(Action action : actions) {
                ArrayList<String> actionInfo = new ArrayList<>();
                actionInfo.add(action.getTitle());
                actionInfo.add(action.getActionType().toString());
                actionInfo.add(action.getMetric());
                actionInfo.add(action.getDate());
                results.add(actionInfo);

            }
        return results;
    }


    public Boolean postUserAction(Map<String, String> actionInfo) {
        String userId = actionInfo.get("userID");

        User user = userRepository.findByUserID(userId);

        ActionType type = ActionType.valueOf(actionInfo.get("type"));
        String metric = actionInfo.get("metric");
        String date = actionInfo.get("date");
        String title = actionInfo.get("title");
        Action action = user.postAction(title, type,metric, date,userId);
        userRepository.save(user);
        actionRepository.save(action);

        return true;
    }


    public String joinInitiative(String initiativeId, String userId) {

        User user = userRepository.findByUserID(userId);

        if (user == null) {
            return "User does not exist";
        }

        Initiative initiative = initiativeRepository.findInitiativeById(initiativeId);

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

    public String getUserName(String otherUserId) {
        User user = userRepository.findByUserID(otherUserId);
        if(user == null) {
            return "Unknown";
        }else {
            return user.getUsername();
        }
    }
    public ArrayList<String> getUserInfoByID(String userID) {
        User user = userRepository.findByUserID(userID);

        ArrayList<String> info = new ArrayList<>();
        info.add("User ID: " + user.getUserID());
        info.add("Username: " + user.getUsername());
        info.add("Location ID: " + user.getLocationID());
        info.add("Role: " + user.getRole());

        return info;
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

    public List<User> getUsersByLocationId(String locationId) {
        return userRepository.findByLocationID(Integer.parseInt(locationId));
    }
}
