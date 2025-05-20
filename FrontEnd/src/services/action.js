import axios from "axios";

const port = "localhost:3000";

async function getMyActions(userID) {
  /*try {
    //TODO - uppdatera endpoint path
    const response = await axios.get((port+"/users/"+userID+"/actions"), {
    });

    return response.data;

  } catch (error) {
    console.error("Getting my actions failed:", error);
    throw error;
  }*/

  const allActions = [];
  allActions[0] = {
    title: "My morning route to work",
    type: "Biking",
    metric: "5 km",
    date: "2025-05-09",
  };
  allActions[1] = {
    title: "running with friends",
    type: "Jogging",
    metric: "10 km",
    date: "2025-05-12",
  };

  return allActions;
}

async function postNewAction(userID, title, date, type, metric) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.post(port+"/users/" + userID + "/actions", {
      userID,
      title,
      date,
      type,
      metric,
    });

    // TODO: switch case som returnerar true/false istället
    return response.data;
  } catch (error) {
    console.error("Posting new action failed:", error);
    throw error;
  }
}

async function getActionStats(userID) {
  /*try {
    //TODO - uppdatera endpoint path
    //TODO - denna endpoint finns inte, ska man lägga till det kanske?
    const response = await axios.get(port+"/users/" + userID + "/actions/stats", {});

    return response.data;
  } catch (error) {
    console.error("Getting action statistics failed:", error);
    throw error;
  }*/

  return {
    kmBiked: 30,
    publicTransport: 28,
    itemsThrifted: 12,
    trashPickedUp: 3,
  };
}

export default {
  getActionStats,
  getMyActions,
  postNewAction,
};
