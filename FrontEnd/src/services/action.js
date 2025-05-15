import axios from "axios";

async function getMyActions(userID) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.get(("/api/users/"+userID+"/actions"), {
    });

    return response.data;

  } catch (error) {
    console.error("Getting my actions failed:", error);
    throw error;
  }
}

async function postNewAction(userID, title, date, type, metric) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.post("/api/users/"+userID+"/actions", {
        userID, title, date, type, metric
    });

    // TODO: switch case som returnerar true/false istället
    return response.data;

  } catch (error) {
    console.error("Posting new action failed:", error);
    throw error;
  }
}

async function getActionStats(userID) {
  try {
    //TODO - uppdatera endpoint path
    //TODO - denna endpoint finns inte, ska man lägga till det kanske?
    const response = await axios.get(("/api/users/"+userID+"/actions/stats"), {
    });

    return response.data;

  } catch (error) {
    console.error("Getting action statistics failed:", error);
    throw error;
  }
}

export default {
    getActionStats,
    getMyActions,
    postNewAction
};
