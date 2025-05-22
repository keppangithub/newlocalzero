package main.java.com.example.server.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * Class which represents an action. An action can be made by a User.
 *
 * @author Olivia Svensson, Kevin Nordkvist, Mojtaba Hauari
 */
@Document("action")
public class Action {
    private String title;
    private ActionType actionType;
    private String metric;
    private String date;
    private String userID;



    public Action(String title, ActionType actionType, String metric, String date,String userID) {
        this.title = title;
        this.actionType = actionType;
        this.metric = metric;
        this.date = date;
        this.userID = userID;
    }

    public void setActionType(ActionType actionType) {
        this.actionType = actionType;
    }

    public void setMetric(String duration) {
        this.metric = metric;
    }

    public ActionType getActionType() {
        return this.actionType;
    }

    public String getMetric() {
        return this.metric;
    }

    public String getTitle() {
        return this.title;
    }

    public String getDate() {
        return this.date;
    }
}
