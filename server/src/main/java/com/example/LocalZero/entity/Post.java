package com.example.LocalZero.entity;

import java.util.List;

public class Post implements PostInterface {
    private String text;
    private User sender;
    private List<User> receivers; // <-- ska det vara en eller flera man ska kunna skriva till? eventuellt ha en grupp med flera
    private int chatID;
    private String location;

    public Post(String text, User sender, List<User> receivers, int chatID, String location) {
        this.text = text;
        this.sender = sender;
        this.receivers = receivers;
        this.chatID = chatID;
        this.location = location;
    }


}