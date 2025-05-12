package com.example.LocalZero.entity;

import java.util.Date;

/**
 * Class for notification. A notification cannot exist without a User.
 * @author Olivia Svensson, ...
 * */

public class Notification {
    private String content;
    private Date time;
    private User[] receivers;

    public Notification(String content, Date time, User[] receivers) {
        this.content = content;
        this.time = time;
        this.receivers = receivers;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public void setReceivers(User[] receivers) {
        this.receivers = receivers;
    }

    public String getContent() {
        return this.content;
    }

    public Date getTime() {
        return this.time;
    }

    public User[] getReceivers() {
        return this.receivers;
    }

}
