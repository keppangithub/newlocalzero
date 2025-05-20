package main.java.com.example.server.entity;

import java.util.Date;

/**
 * Class which represents an action. An action can be made by a User.
 *
 * @author Olivia Svensson, ... kevin nordkivs
 */

public class Action {
    private String title;
    private ActionType actionType;
    private String metric;
    private String date;



    public Action(String title, ActionType actionType, String metric, String date) {
        this.title = title;
        this.actionType = actionType;
        this.metric = metric;
        this.date = date;
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
}
