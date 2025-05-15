package main.java.com.example.server.controller;

import main.java.com.example.server.entity.Initiative;
import main.java.com.example.server.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface InitiativeRepository extends MongoRepository<Initiative, String> {

    Initiative findInitiativeByInitiativeId(String initiativeId);

}
