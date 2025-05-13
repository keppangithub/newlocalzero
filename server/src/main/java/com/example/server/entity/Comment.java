package src.main.java.com.example.server.entity;

import javax.swing.*;

/**
 * Class for comments. A comment is tied to a user as well as a post. A comment cannot exist on its own.
 * composite design pattern, en comment kan innehålla en till comment, som Reddit
 *
 * @author Olivia Svensson, ...
 */

public class Comment implements PostInterface {
    private Post post;
    private String content;
    private int senderID;
    private User commenter;
    private ImageIcon image;

    public Comment(Post post, String content, int senderID, User commenter, ImageIcon image) {
        this.post = post;
        this.content = content;
        this.senderID = senderID;
        this.commenter = commenter;
        this.image = image;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setSenderID(int senderID) {
        this.senderID = senderID;
    }

    public void setCommenter(User commenter) {
        this.commenter = commenter;
    }

    public void setImage(ImageIcon image) {
        this.image = image;
    }

    public ImageIcon getImage() {
        return image;
    }

    public int getSenderID() {
        return senderID;
    }

    public User getCommenter() {
        return commenter;
    }

    public String getContent() {
        return content;
    }

    public Post getPost() {
        return post;
    }
}