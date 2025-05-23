import axios from "axios";

const port = "http://localhost:8080";
let actionStats;

async function getMyActions(userID) {
  try {
    const response = await axios.get(
      port + "/api/users/" + userID + "/actions",
      {}
    );

    const actionsArray = [];
    if (response.data !== undefined && Array.isArray(response.data)) {
      response.data.forEach((action) => {
        const actionObject = {
          title: action[0],
          type: action[1],
          metric: action[2],
          date: action[3],
        };
        actionsArray.push(actionObject);
      });
    }

    let kmBiked = 0;
    let publicTransport = 0;
    let itemsThrifted = 0;
    let trashPickedUp = 0;

    if (actionsArray.length > 0) {
      actionsArray.forEach((action) => {
        switch (action.type) {
          case "Running/Jogging/Biking":
            kmBiked += Number(action.metric);
            break;
          case "Public Transport":
            publicTransport += Number(action.metric);
            break;
          case "Thrifting":
            itemsThrifted += Number(action.metric);
            break;
          case "Trash Pickup":
            trashPickedUp += Number(action.metric);
            break;
          default:
        }
      });
    }
    
    actionStats = {
      kmBiked: kmBiked,
      publicTransport: publicTransport,
      itemsThrifted: itemsThrifted,
      trashPickedUp: trashPickedUp,
    };

    return actionsArray;
  } catch (error) {
    console.error("Getting my actions failed:", error);
    throw error;
  }
}

async function postNewAction(userID, title, date, type, metric) {
  try {
    const response = await axios.post(
      port + "/api/users/" + userID + "/actions",
      {
        userID,
        title,
        date,
        type,
        metric,
      }
    );

    if (response.data.success) {
      console.log("Posting new Action successful!");
      return true;
    } else {
      console.log("Posting new Action failed");
      return false;
    }
  } catch (error) {
    console.error("Posting new action failed:", error);
    throw error;
  }
}

async function getActionStats() {
  return actionStats;
}

export default {
  getActionStats,
  getMyActions,
  postNewAction,
};
