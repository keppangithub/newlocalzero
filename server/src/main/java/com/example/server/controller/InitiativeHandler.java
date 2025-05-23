package main.java.com.example.server.controller;

import main.java.com.example.server.entity.*;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class InitiativeHandler {

    @Autowired
    private InitiativeRepository initiativeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CommentsRepository commentsRepository;
    @Autowired
    private NotificationHandler notificationHandler;


    public List<List<Object>> getInitiatives(String location) {
        List<Initiative> initiatives = initiativeRepository.findByLocation(location);
        if(initiatives == null || initiatives.isEmpty()){
            return null;
        }

        List<List<Object>> results = new ArrayList<>();

        for (Initiative initiative : initiatives) {
            String userID = initiative.getUserId();
            User user = userRepository.findByUserID(userID);

            ArrayList<String> initiativeInfo = new ArrayList<>();
            initiativeInfo.add(initiative.getTitle());
            initiativeInfo.add(initiative.getDescription());
            initiativeInfo.add(initiative.getStart());
            initiativeInfo.add(initiative.getEnd());
            initiativeInfo.add(initiative.getLocation());
            initiativeInfo.add(initiative.getCategory().toString());
            initiativeInfo.add(user != null ? user.getUsername() : "Unknown");
            initiativeInfo.add(userID);
            initiativeInfo.add(initiative.getImage());

            ArrayList<ArrayList<String>> commentList = initiative.getComments();

            List<Object> result = new ArrayList<>();
            result.add(initiativeInfo);
            result.add(commentList);

            results.add(result);
        }

        return results;
    }


    public List<Object> getInitiativeById(String initiativeId) {
        Initiative initiative = initiativeRepository.findByInitiativeId(initiativeId);
        User user = userRepository.findByUserID(initiative.getUserId());
        if(initiative == null) {
            return new ArrayList<>();
        }
        ArrayList<String> initiativeInfo = new ArrayList<>();
        initiativeInfo.add(initiative.getTitle());
        initiativeInfo.add(initiative.getDescription());
        initiativeInfo.add(initiative.getStart());
        initiativeInfo.add(initiative.getEnd());
        initiativeInfo.add(initiative.getLocation());
        initiativeInfo.add(initiative.getCategory().toString());
        initiativeInfo.add(user.getUsername());
        initiativeInfo.add(initiative.getUserId());
        initiativeInfo.add(initiative.getImage());

        ArrayList<ArrayList<String>> commentList = initiative.getComments();



        List<Object> result = new ArrayList<>();
        result.add(initiativeInfo);
        result.add(commentList);

        return result;
    }

    public List<List<Object>> getInitiativeByUserId(String userId) {
        List<Initiative> initiatives = initiativeRepository.findAllByUserId(userId);
        if(initiatives == null || initiatives.isEmpty()){
            return null;
        }

        List<List<Object>> results = new ArrayList<>();

        for (Initiative initiative : initiatives) {
            String userID = initiative.getUserId();
            User user = userRepository.findByUserID(userID);

            ArrayList<String> initiativeInfo = new ArrayList<>();
            initiativeInfo.add(initiative.getTitle());
            initiativeInfo.add(initiative.getDescription());
            initiativeInfo.add(initiative.getStart());
            initiativeInfo.add(initiative.getEnd());
            initiativeInfo.add(initiative.getLocation());
            initiativeInfo.add(initiative.getCategory().toString());
            initiativeInfo.add(user != null ? user.getUsername() : "Unknown");
            initiativeInfo.add(userID);
            initiativeInfo.add(initiative.getImage());

            ArrayList<ArrayList<String>> commentList = initiative.getComments();

            List<Object> result = new ArrayList<>();
            result.add(initiativeInfo);
            result.add(commentList);

            results.add(result);
        }

        return results;
    }

    public String changeInitsDescription(String id, String description) {
        Initiative initiative = initiativeRepository.findByInitiativeId(id);
        initiative.updateDescription(description);

        notificationHandler.createNotification(NotificationType.INITIATIVE_UPDATE, initiative.getUserIds());


        if(initiative != null) {
            initiativeRepository.save(initiative);
            return "Initiative has successfully been updated";
        } else {
            return "Initiative does not exist";
        }
    }

}
