package main.java.com.example.server.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;

/**
 * Class for notification. A notification cannot exist without a User.
 *
 * @author Olivia Svensson, ...
 */

@Document(collection = "notifications")
public class Notification {
    @Id
    private String Id;
    private String content;
    private String time;
    private ArrayList<String> receivers;

    public Notification(String content, String time, ArrayList<String> receivers) {
        this.content = content;
        this.time = time;
        this.receivers = receivers;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setReceivers(ArrayList<String> receivers) {
        this.receivers = receivers;
    }

    public String getContent() {
        return this.content;
    }

    public String getTime() {
        return this.time;
    }

    public ArrayList<String> getReceivers() {
        return this.receivers;
    }
    @Override
    public String toString() {
        return this.content;  // or however you want to format the notification
    }

}
