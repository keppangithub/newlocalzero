package main.java.com.example.server.controller;

import main.java.com.example.server.entity.Initiative;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InitiativeHandler {

    @Autowired
    private InitiativeRepository initiativeRepository;


    public List<ArrayList<String>> getInitiatives(String location) {
        List<Initiative> initiatives = initiativeRepository.findByLocation(location);
        if(initiatives == null || initiatives.isEmpty()){
            return null;
        }

        List<ArrayList<String>> result = new ArrayList<>();

        for(Initiative initiative : initiatives){
            ArrayList<String> initiativeInfo = new ArrayList<>();
            initiativeInfo.add(initiative.getTitle());
            initiativeInfo.add(initiative.getDescription());
            initiativeInfo.add(initiative.getId());
            result.add(initiativeInfo);
        }
        return result;
    }
}
