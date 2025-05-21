package main.java.com.example.server.controller;

import main.java.com.example.server.entity.Initiative;
import main.java.com.example.server.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
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
        Initiative initiative = initiativeService.createInitiative(initiativeInfo);

        List<User> users = userHandler.getUsersByLocationId(initiative.getLocation());

        ArrayList<String> receiverIds = new ArrayList<>(users.stream()
                .filter(user -> !user.getUserID().equals(initiative.getUserId()))
                .map(User::getUserID)
                .toList());

        notificationHandler.createNotification("New Initiative Created", receiverIds);

        initiativeRepository.save(initiative);

        return true;
    }
}
