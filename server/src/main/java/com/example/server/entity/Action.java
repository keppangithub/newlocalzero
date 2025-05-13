package src.main.java.com.example.server.entity;

/**
 * Class which represents an action. An action can be made by a User.
 *
 * @author Olivia Svensson, ...
 */

public class Action {
    private ActionType actionType;
    private int duration;


    public Action(ActionType actionType, int duration) {
        this.actionType = actionType;
        this.duration = duration;
    }

    public void setActionType(ActionType actionType) {
        this.actionType = actionType;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public ActionType getActionType() {
        return this.actionType;
    }

    public int getDuration() {
        return this.duration;
    }
}
