package main.java.com.example.server.controller;

import main.java.com.example.server.entity.Initiative;
import main.java.com.example.server.entity.NotificationType;
import main.java.com.example.server.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Map;

@Service
public class CommentHandler {

    @Autowired
    private InitiativeRepository initiativeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private NotificationHandler notificationHandeler;

    //        initiativeID, posterID, comment, date, imageURL

    public String postComment(Map<String, String> body) {
        String initiativeId = body.get("initiativeID");
        String posterId = body.get("posterID");
        String comment = body.get("comment");
        String date = body.get("date");
        String imageURL = body.get("imageURL");

        if(initiativeId == null || initiativeId.isEmpty()) {
            return "Initiative ID cannot be null or empty";
        }
        if(posterId == null || posterId.isEmpty()) {
            return "Poster ID cannot be null or empty";
        }
        if (comment == null || comment.isEmpty()) {
            return "Comment cannot be null or empty";
        }
        if (date == null || date.isEmpty()) {
            return "Date cannot be null or empty";
        }
        if (imageURL == null || imageURL.isEmpty()) {
            return "Image URL cannot be null or empty";
        }

        Initiative initiative = initiativeRepository.findByInitiativeId(initiativeId);
        if (initiative == null) {
            return "Initiative does not exist";
        }
        User commenter = userRepository.findByUserID(posterId);
        if (commenter == null) {
            return "User does not exist";
        }
        String commenterId = commenter.getUserID();
        String commenterName = commenter.getUsername();
        ArrayList<String> receivers = new ArrayList<>();
        receivers.add(initiative.getUserId());
        notificationHandeler.createNotification(NotificationType.COMMENT,receivers);
        initiative.addComment(comment, date, commenterName, commenterId,imageURL);
        initiativeRepository.save(initiative);
        return "Comment added successfully";
    }
}
