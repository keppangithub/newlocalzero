package main.java.com.example.server.entity;



import main.java.com.example.server.controller.ControllerClient;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

/**
 * User class for users of the application. Users can be either online or offline.
 * singleton dp
 *
 * @author Olivia Svensson, ...
 */

@Document(collection = "users")
public class User {
    @Id
    private String userID;
    private String username;
    private String password;
    private String email;
    private Integer locationID;
    private String role;
    private Action[] actions;
    private Initiative[] initiatives;
    private List<User> friendList;
    private ControllerClient controller;

    public User(String username, String password, String email, Integer locationID, String role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.locationID = locationID;
        this.role = role;
        friendList = new ArrayList<User>();
        //this.controller = controller;
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

    public String getUsername(){
        return username;
    }

}