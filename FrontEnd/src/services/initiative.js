import axios from "axios";

async function getAllInitiatives(location) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.get("/inits", {
      location,
    });

    return response.data;

  } catch (error) {
    console.error("Getting initiatives failed:", error);
    throw error;
  }
}

async function getMyInitiatives(userID) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.get(("/users/"+userID+"/inits"), {
    });

    return response.data;

  } catch (error) {
    console.error("Getting my initiatives failed:", error);
    throw error;
  }
}

async function getMyNotifcations(userID) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.get(("/users/"+userID+"/notifications"), {
    });

    return response.data;

  } catch (error) {
    console.error("Getting my notifications failed:", error);
    throw error;
  }
}

async function postNewInitiative(userID, title, description, imageURL, location, startDate, endDate, category) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.post("/inits", {
        userID,
        title,
        description,
        imageURL,
        location,
        startDate,
        endDate,
        category
    });

    // TODO: switch case som returnerar true/false istället
    return response.data;

  } catch (error) {
    console.error("Posting new initiative failed:", error);
    throw error;
  }
}

async function updateInitiative(initiativeID, ) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.put(("/api/inits/" + initiativeID), {
        description
    });

    // TODO: switch case som returnerar true/false istället
    return response.data;

  } catch (error) {
    console.error("Adding update to an initiative failed:", error);
    throw error;
  }
}

async function postInitiativeComment(initiativeID, posterID, comment, date, imageURL) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.post("/inits/" + initiativeID, {
        initiativeID, posterID, comment, date, imageURL
    });

    // TODO: switch case som returnerar true/false istället
    return response.data;

  } catch (error) {
    console.error("Posting comment failed:", error);
    throw error;
  }
}

async function joinInitiative(userID, initiativeID) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.post("/users/"+userID+"/inits/", {
        userID, initiativeID
    });

    // TODO: switch case som returnerar true/false istället
    return response.data;

  } catch (error) {
    console.error("Joining initiative failed:", error);
    throw error;
  }
}
async function getInitiative(initiativeID){
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.get(("/inits/" + initiativeID), {
    });

    return response.data;

  } catch (error) {
    console.error("Getting initiative failed:", error);
    throw error;
  }
}

export default {
  getAllInitiatives,
  getMyInitiatives,
  postNewInitiative,
  updateInitiative,
  postInitiativeComment,
  joinInitiative,
  getInitiative,
  getMyNotifcations
};
