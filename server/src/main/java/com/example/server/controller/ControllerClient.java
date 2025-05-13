package main.java.com.example.server.controller;
import main.java.com.example.server.entity.*;


import java.util.HashMap;
import java.util.Objects;

/*
 * denna classen är en controller klass. Kan funka som en mediator -- vi uppfyller då Mediator design pattern.
 * singleton design pattern ? kolla upp. Iom bara en controller.
 * Controller class handles all logic connected to users.
 * Mediator
 * ska kommunicera med en boundary class (boundaryklassen kommunicerar sen med API)
 *  @author Olivia Svensson, ...
 * */

public class ControllerClient implements Mediator {
    HashMap<String, Integer> users;

    Mediator controller = new ControllerClient(); //dubbelkolla

    public ControllerClient() {
        users = new HashMap<>(); //fixa, bara placeholder atm
    }

    public String post(String id, User user) {
        String response = "";
        if (id.isEmpty()) {
            System.out.println("id is empty");
            response = "empty ID";
        } else {

            if (users.containsKey(id)) {
                System.out.println("User successfully found");

                // lägg till logik hur man får tag på usern här;

                response = user.post();
                if (Objects.equals(response, "success")) {
                    System.out.println("Successfull post");
                } else if (Objects.equals(response, "error")) {
                    System.out.println("Failed");
                }
                response = "success";
            } else {
                System.out.println("User not found");
                response = "user not found";
            }
        }
        return response;
    }


    public void login() {
    }

    public void logout() {
    }

    public void comment() {
    }

    public void createChat() {
    }

    public void updatePost() {
    }

    public void createUser() {

    }
}