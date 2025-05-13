package src.main.java.com.example.server.entity;



import src.main.java.com.example.server.controller.ControllerClient;

import java.util.ArrayList;
import java.util.List;

/**
 * User class for users of the application. Users can be either online or offline.
 * singleton dp
 *
 * @author Olivia Svensson, ...
 */

public class User {
    private String userID;
    private String password;
    private String email;
    private int locationID;
    private Action[] actions;
    private Initiative[] initiatives;
    private List<User> friendList;
    private ControllerClient controller;

    public User(String userID, String password, ControllerClient controller) {
        this.userID = userID;
        this.password = password;
        friendList = new ArrayList<User>();
        this.controller = controller;
    }

    public void login() {
        //should be checked if user exists in db and if credentials match
        System.out.println("logging in");
        controller.login();
    }

    public void logout() {
        System.out.println("logging out");
        controller.logout();
    }

    public String post() {
        System.out.println("post");
        controller.post(this.userID, this);
        return null;
    }

    public void comment() {
        System.out.println("comment");
        controller.comment();
    }

    public void addFriend(User user) {
        friendList.add(user);
    }

    public void removeFriend(User user) {
        if (friendList.contains(user)) {
            friendList.remove(user);
        } else {
            System.out.println("friend not found");
        }
    }

    public void createChat() {
        System.out.println("creating chat");
        controller.createChat();
    }

    public void updatePost() {
        System.out.println("updating post");
        controller.updatePost();
    }

    public void register() {
        controller.createUser();
    }


}