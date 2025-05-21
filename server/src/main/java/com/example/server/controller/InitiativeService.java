package main.java.com.example.server.controller;

import main.java.com.example.server.entity.Category;
import main.java.com.example.server.entity.Initiative;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class InitiativeService {

    public Initiative createInitiative(Map<String, String> initiativeInfo) {

        String title = initiativeInfo.get("title");
        String userId = initiativeInfo.get("userId");
        String description = initiativeInfo.get("description");
        String imgUrl = initiativeInfo.get("imageURL");
        String location = initiativeInfo.get("location");
        String startDate = initiativeInfo.get("startDate");
        String endDate = initiativeInfo.get("endDate");
        Category category = Category.valueOf(initiativeInfo.get("category"));

       return new Initiative(title,userId,description,imgUrl,location,startDate,endDate,category);
    }
}
