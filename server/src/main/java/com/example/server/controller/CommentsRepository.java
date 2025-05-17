package main.java.com.example.server.controller;

import main.java.com.example.server.entity.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentsRepository extends MongoRepository<Comment, String> {

    List<Comment> findByInitiativeId(String initiativeId);

}
