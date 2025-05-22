import axios from "axios";

const port = "localhost:8080";
let actionStats;

async function getMyActions(userID) {
  try {
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

    let kmBiked = 0;
    let publicTransport = 0;
    let itemsThrifted = 0;
    let trashPickedUp = 0;
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

    /* TEST DATA
  const allActions = [];
  allActions[0] = {
    title: "My morning route to work",
    type: "Public Transport",
    metric: "5",
    date: "2025-05-09",
  };
  allActions[1] = {
    title: "running with friends",
    type: "Running/Jogging/Biking",
    metric: "10",
    date: "2025-05-12",
  };
  allActions[2] = {
    title: "running with friends again",
    type: "Running/Jogging/Biking",
    metric: "4",
    date: "2025-05-20",
  };

  let kmBiked = 0;
  let publicTransport = 0;
  let itemsThrifted = 0;
  let trashPickedUp = 0;

  allActions.forEach((action) => {
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

  actionStats = {
    kmBiked: kmBiked,
    publicTransport: publicTransport,
    itemsThrifted: itemsThrifted,
    trashPickedUp: trashPickedUp,
  };

  return allActions;
     */
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

async function getActionStats() {
  return actionStats;
}

export default {
  getActionStats,
  getMyActions,
  postNewAction,
};
