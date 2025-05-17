package main.java.com.example.server.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.swing.*;

/**
 * Class for comments. A comment is tied to a user as well as a post. A comment cannot exist on its own.
 * composite design pattern, en comment kan innehålla en till comment, som Reddit
 *
 * @author Olivia Svensson, ...
 */

@Document(collection = "comments")
public class Comment implements PostInterface {
    @Id
    private String commentId;
    private String initiativeId;
    private String content;
    private int senderID;
    private User commenter;
    private String imgUrl;

    public Comment() {
        //def constructor for mongo
    }

    public Comment(String initiativeId, String content, int senderID, User commenter, String imgUrl) {
        this.initiativeId = initiativeId;
        this.content = content;
        this.senderID = senderID;
        this.commenter = commenter;
        this.imgUrl = imgUrl;
    }

    public void setInitiativeId(String intiativeId) {
        this.initiativeId = intiativeId;
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

    public void setImage(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getImage() {
        return imgUrl;
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

    public String getInitiativeId() {
        return initiativeId;
    }
}