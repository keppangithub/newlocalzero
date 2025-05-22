package main.java.com.example.server.controller;

import main.java.com.example.server.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String>{


    List<User> findByEmailAndPassword(String email, String password);
    User findByUserID(String userID);
    List<User> findByEmail(String email);
    List<User> findByLocationID(Integer locationID);

    //List<User> findByUserID(String userId);
}
