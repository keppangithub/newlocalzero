import axios from "axios";

const port = "localhost:3000";

async function getProfile(userID) {
  /*try {
    //TODO - uppdatera endpoint path
    const response = await axios.get((port+"/users/"+userID), {
    });

    return response.data;

  } catch (error) {
    console.error("Getting user profile failed:", error);
    throw error;
  }*/

  return {
    id: "123460",
    username: "Another User",
    location: "Stockholm",
    role: "Resident",
  };
}

async function updateLocation(userID, location) {
  /*try {
    //TODO - uppdatera endpoint path
    const response = await axios.put((port+"/users/"+userID), {
    userID, location
    });

    return response.data;

  } catch (error) {
    console.error("Updating user location failed:", error);
    throw error;
  }*/

  return {
    id: "123460",
    username: "Another User",
    location: "Stockholm",
    role: "Resident",
  };
}

export default {
  getProfile,
  updateLocation,
};
