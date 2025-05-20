package main.java.com.example.server.controller;

import main.java.com.example.server.entity.Category;
import main.java.com.example.server.entity.Initiative;
import main.java.com.example.server.entity.User;
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


    public List<ArrayList<String>> getInitiatives(String location) {
        List<Initiative> initiatives = initiativeRepository.findByLocation(location);
        if(initiatives == null || initiatives.isEmpty()){
            return null;
        }

        List<ArrayList<String>> result = new ArrayList<>();

        for(Initiative initiative : initiatives){
            ArrayList<String> initiativeInfo = new ArrayList<>();
            initiativeInfo.add(initiative.getTitle());
            initiativeInfo.add(initiative.getDescription());
            initiativeInfo.add(initiative.getId());
            result.add(initiativeInfo);
        }
        return result;
    }

    public String createInitiative(Map<String, String> initiativeInfo) {
        String userId = initiativeInfo.get("userId");
        if (userId == null || userId.isEmpty()) {
            return "User ID cannot be null or empty";
        }
        String title = initiativeInfo.get("title");
        if (title == null || title.isEmpty()) {
            return "Title cannot be null or empty";
        }
        String description = initiativeInfo.get("description");
        if (description == null || description.isEmpty()) {
            return "Description cannot be null or empty";
        }
        String imgUrl = initiativeInfo.get("imageURL");
        if (imgUrl == null || imgUrl.isEmpty()) {
            return "Image URL cannot be null or empty";
        }
        String location = initiativeInfo.get("location");
        if (location == null || location.isEmpty()) {
            return "Location cannot be null or empty";
        }
        String startDate = initiativeInfo.get("startDate");
        if (startDate == null || startDate.isEmpty()) {
            return "Start date cannot be null or empty";
        }
        String endDate = initiativeInfo.get("endDate");
        if (endDate == null || endDate.isEmpty()) {
            return "End date cannot be null or empty";
        }
        Category category = Category.valueOf(initiativeInfo.get("category"));
        if (category == null) {
            return "Category cannot be null or empty";
        }

        Initiative newInitiative = new Initiative(title,userId,description,imgUrl,location,startDate,endDate,category);

        List<User> users = userRepository.findByLocationID(Integer.parseInt(location));
        ArrayList<String> userIds = new ArrayList<>();
        for(User user : users ){
            if(!user.getUserID().equals(userId)){
                userIds.add(user.getUserID());
            }
        }
        notificationHandler.createNotification("New initiative in your area", userIds);


        initiativeRepository.save(newInitiative);
        return "Initiative created successfully";
    }

    public ArrayList<ArrayList<String>> getInitiativeById(String initiativeId) {
        Initiative initiative = initiativeRepository.findByInitiativeId(initiativeId);
        User user = userRepository.findByUserID(initiative.getUserId());
        if(initiative == null) {
            return new ArrayList<>();
        }
        ArrayList<ArrayList<String>> result = new ArrayList<>();
        ArrayList<String> initiativeInfo = new ArrayList<>();
        ArrayList<String> comments = new ArrayList<>();

        initiativeInfo.add(initiative.getTitle());
        initiativeInfo.add(initiative.getDescription());
        initiativeInfo.add(initiative.getStart());
        initiativeInfo.add(initiative.getEnd());
        initiativeInfo.add(initiative.getLocation());
        initiativeInfo.add(initiative.getCategory().toString());
        initiativeInfo.add(user.getUsername());
        initiativeInfo.add(initiative.getId());
        initiativeInfo.add(initiative.getImage());

        commentsRepository.findByInitiativeId(initiativeId).forEach(comment -> {
            ArrayList<String> commentInfo = new ArrayList<>();
            commentInfo.add(comment.getCommenter().getUsername());
            commentInfo.add(comment.getContent());
            commentInfo.add(comment.getImage());
            comments.add(commentInfo.toString());
        });

        result.add(initiativeInfo);
        result.add(comments);
        return result;
    }

    public String changeInitsDescription(String id, String description) {
        Initiative initiative = initiativeRepository.findByInitiativeId(id);
        initiative.updateDescription(description);

        notificationHandler.createNotification("Initiative description has been updated", initiative.getUserIds());


        if(initiative != null) {
            initiativeRepository.save(initiative);
            return "Initiative has successfully been updated";
        } else {
            return "Initiative does not exist";
        }
    }

}
