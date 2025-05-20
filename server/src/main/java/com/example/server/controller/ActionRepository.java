package main.java.com.example.server.controller;


import main.java.com.example.server.entity.Action;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ActionRepository extends MongoRepository<Action, String> {
    List<Action> getAll();



}
