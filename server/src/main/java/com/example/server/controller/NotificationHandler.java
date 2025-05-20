package main.java.com.example.server.controller;

import main.java.com.example.server.entity.Notification;
import main.java.com.example.server.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationHandler {

    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private UserRepository userRepository;

    public String createNotification(String content, ArrayList<String> receivers) {

        if (content == null || content.isEmpty()) {
            return "Content cannot be null or empty";
        }
        if (receivers == null || receivers.isEmpty()) {
            return "Receivers cannot be null or empty";
        }

        Notification notification = new Notification(content, "2023-10-01T12:00:00Z", receivers);
        notificationRepository.save(notification);

        return "Notification created successfully";
    }

    public ArrayList<ArrayList<String>> getUserNotifications(String id) {
        List<Notification> notifications = notificationRepository.findByReceiversContaining(id);
        ArrayList<ArrayList<String>> result = new ArrayList<>();
        for(Notification notification : notifications){
            ArrayList<String> notificationInfo = new ArrayList<>();
            notificationInfo.add(notification.getContent());
            notificationInfo.add(notification.getTime());

            result.add(notificationInfo);
        }
        return result;
    }

}
