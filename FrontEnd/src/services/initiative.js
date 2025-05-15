import axios from "axios";

async function getAllInitiatives(location) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.get("/api/inits", {
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
    const response = await axios.get(("/api/users/"+userID+"/inits"), {
    });

    return response.data;

  } catch (error) {
    console.error("Getting my initiatives failed:", error);
    throw error;
  }
}

async function postNewInitiative(userID, title, description, imageURL, location, startDate, endDate, category) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.post("/api/inits", {
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
        caption
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
    const response = await axios.post("/api/inits/" + initiativeID, {
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
    const response = await axios.post("/api/users/"+userID+"/inits/", {
        userID, initiativeID
    });

    // TODO: switch case som returnerar true/false istället
    return response.data;

  } catch (error) {
    console.error("Joining initiative failed:", error);
    throw error;
  }
}

export default {
  getAllInitiatives,
  getMyInitiatives,
  postNewInitiative,
  updateInitiative,
  postInitiativeComment,
  joinInitiative
};
