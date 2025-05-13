package main.java.com.example.server.entity;

import javax.swing.*;
import java.util.Date;

/**
 * Class for initiatives. Each initiative is created by a User and can be seen by other users.
 *
 * @author Olivia Svensson, ...
 */
public class Initiative implements Activity {
    private String title;
    private String description;
    private ImageIcon image;
    private String location;
    private Date start;
    private Date end;
    private Category category;
    private Comment[] comments;

    public Initiative(String title, String description, ImageIcon image, String location, Date start, Date end, Category category, Comment[] comments) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.location = location;
        this.start = start;
        this.end = end;
        this.category = category;
        this.comments = comments;
    }

    public ImageIcon getImage() {
        return image;
    }

    public void setImage(ImageIcon image) {
        this.image = image;
    }

    public Category getCategory() {
        return category;
    }

    public Comment[] getComments() {
        return comments;
    }

    public Date getEnd() {
        return end;
    }

    public Date getStart() {
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

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setComments(Comment[] comments) {
        this.comments = comments;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    //need to think through the logic here a bit more
    @Override
    public void startActivity(Date date) {
        start = date;
    }

    @Override
    public void stopActivity(Date date) {
        end = date;
    }
}
