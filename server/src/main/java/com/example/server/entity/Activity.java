package main.java.com.example.server.entity;

import java.util.Date;

/**
 * Interface for different activities.
 *
 * @author Olivia Svensson, ...
 */

public interface Activity {
    // add stuff here

    public void startActivity(Date date);

    public void stopActivity(Date date);
}
