package main.java.com.example.server.controller;

import main.java.com.example.server.entity.Initiative;
import main.java.com.example.server.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface InitiativeRepository extends MongoRepository<Initiative, String> {

    Initiative findByInitiativeId(String initiativeId);
    List<Initiative> findByLocation(String location);
    Initiative findInitiativeById(String initiativeId);
    List<Initiative> findAllByUserId(String userId);
    List<Initiative> findByUserIdOrUserIdsContaining(String userId, String userIdInArray);


}
