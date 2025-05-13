package src.main.java.com.example.server.entity;

// uppfyller Template design pattern - eventuellt kolla om fler uppfylls?
//

interface PostInterface {
    String text = "";
    int chatID = 0;
    int postID = 0;
    User poster = null;
}