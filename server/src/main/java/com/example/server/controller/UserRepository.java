package main.java.com.example.server.controller;

import main.java.com.example.server.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String>{

    List<User> findByUsernameAndPassword(String username, String password);

}
