package main.java.com.example.server.controller;

import main.java.com.example.server.entity.Notification;
import main.java.com.example.server.entity.NotificationType;
import main.java.com.example.server.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NotificationHandler {

    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private UserRepository userRepository;

    private final Map<NotificationType, AbstractNotificationTemplate> strategies = new HashMap<>();

    @Autowired
    public NotificationHandler(List<AbstractNotificationTemplate> templates) {
        for (AbstractNotificationTemplate template : templates) {
            if (template instanceof CommentNotification) {
                strategies.put(NotificationType.COMMENT, template);
            } else if (template instanceof InitiativeUpdateNotification) {
                strategies.put(NotificationType.INITIATIVE_UPDATE, template);
            } else if (template instanceof MessageNotification) {
                strategies.put(NotificationType.MESSAGE, template);
            } else if (template instanceof NewInitiativeNotification) {
                strategies.put(NotificationType.NEW_INITIATIVE, template);
            }
        }
    }


    public String createNotification(NotificationType type, ArrayList<String> receivers) {
        AbstractNotificationTemplate template = strategies.get(type);
        if (template == null) {
            return "Notification type not supported";
        }
        return template.sendNotification(receivers);
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
