package main.java.com.example.server.controller;

import main.java.com.example.server.entity.Initiative;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
@Service
public class InitiativeMediatorConcrete implements CreateInitiativeMediator{

    @Autowired
    private InitiativeRepository initiativeRepository;
    @Autowired
    private UserHandler userHandler;
    @Autowired
    private NotificationHandler notificationHandler;
    @Autowired
    private InitiativeService initiativeService;



    @Override
    public Boolean createInitiative(Map<String, String> initiativeInfo) {
        Initiative initiativeService.createInitiative(initiativeInfo);

    }
}
