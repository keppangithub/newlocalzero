package main.java.com.example.server.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.swing.*;
import java.util.ArrayList;
import java.util.Date;

/**
 * Class for initiatives. Each initiative is created by a User and can be seen by other users.
 *
 * @author Olivia Svensson, ...
 */

@Document(collection = "initiatives")
public class Initiative implements Activity {
    @Id
    private String initiativeId;
    private String userId;
    private String title;
    private String description;
    private String imgUrl;
    private String location;
    private String start;
    private String end;
    private Category category;
    private Comment[] comments;
    private ArrayList<String> userIds;

    public Initiative(String title, String userId, String description, String imgUrl, String location, String start, String end, Category category) {

        this.title = title;
        this.userId = userId;
        this.description = description;
        this.imgUrl = imgUrl;
        this.location = location;
        this.start = start;
        this.end = end;
        this.category = category;
        userIds = new ArrayList<>();
    }

    public String getImage() {
        return imgUrl;
    }

    public void setImage(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public Category getCategory() {
        return category;
    }

    public Comment[] getComments() {
        return comments;
    }

    public String getEnd() {
        return end;
    }

    public String getStart() {
        return start;
    }

    public String getDescription() {
        return description;
    }

    public String getLocation() {
        return location;
    }

    public String getTitle() {
        return title;
    }

    public String getId(){
        return initiativeId;
    }

    public ArrayList<String> getUserIds() {
        return userIds;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setComments(Comment[] comments) {
        this.comments = comments;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUserId() {
        return userId;
    }

    //need to think through the logic here a bit more

    @Override
    public void startActivity(String date) {
        start = date;
    }

    @Override
    public void stopActivity(String date) {
        end = date;
    }


}
