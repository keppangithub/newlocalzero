import axios from "axios";

const port = "http://localhost:8080";

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

    let kmBiked1 = 0;
    let kmWalked1 = 0;
    let publicTransport1 = 0;
    let pickupTrash1 = 0;
    let recycle1 = 0;
    let toolSharing1 = 0;
    let recyclingDrive1 = 0;
    let rideSharing1 = 0;
    let communityGardening1 = 0;
    let foodSwaps1 = 0;


    actionsArray.forEach((action) => {
      switch (action.type) {
        case "BIKING":
          kmBiked1 += Number(action.metric);
          break;
        case "WALKING":
          kmWalked1 += Number(action.metric);
          break;
        case "PUBLIC_TRANSPORT":
          publicTransport1 += Number(action.metric);
          break;
        case "PICK_UP_TRASH":
          pickupTrash1 += Number(action.metric);
          break;
        case "RECYCLING":
          recycle1 += Number(action.metric);
          break;
        case "TOOL_SHARING":
          toolSharing1 += Number(action.metric);
          break;
        case "RECYCLING_DRIVE":
          recyclingDrive1 += Number(action.metric);
          break;
        case "RIDE_SHARING":
          rideSharing1 += Number(action.metric);
          break;
        case "COMMUNITY_GARDENING":
          communityGardening1 += Number(action.metric);
          break;
        case "FOOD_SWAPS":
          foodSwaps1 += Number(action.metric);
          break;
        default:
      }
    });

    const actionStats = {
    kmBiked : kmBiked1,
    kmWalked : kmWalked1,
    publicTransport : publicTransport1,
    pickupTrash : pickupTrash1,
    recycle : recycle1,
    toolSharing : toolSharing1,
    recyclingDrive : recyclingDrive1,
    rideSharing : rideSharing1, 
    communityGardening : communityGardening1, 
    foodSwaps : foodSwaps1
    };

    localStorage.setItem("actionStats", JSON.stringify(actionStats));

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
      console.log("Action added successfully!");
      return true;
    } else {
      console.log("Action adding failed (unexpected success value)");
      return false;
    }
  } catch (error) {
    console.error("Posting new action failed:", error);
    throw error;
  }
}

async function getActionStats() {
  const storedStats = localStorage.getItem("actionStats");
  return storedStats ? JSON.parse(storedStats) : null;
}

export default {
  getActionStats,
  getMyActions,
  postNewAction,
};
