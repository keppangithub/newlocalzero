import axios from "axios";

const port = "localhost:8080";

async function getMyActions(userID) {
  /*try {
    const response = await axios.get(
      port + "/api/users/" + userID + "/actions",
      {}
    );

    const actionsArray = [];
    response.data.array.forEach((action) => {
      const actionObject = {
        title: action[0],
        type: action[1],
        metric: action[2],
        date: action[3],
      };
      actionsArray.push(actionObject);
    });

    return actionsArray;

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

    // response is true/false
    return response.data;
  } catch (error) {
    console.error("Posting new action failed:", error);
    throw error;
  }
}

async function getActionStats(userID) {

  //TODO - bara kalkylera stats i frontenden

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
