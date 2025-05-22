import axios from "axios";

const port = "localhost:8080";

async function getProfile(userID) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.get((port+"/api/users/"+userID), {
    });

    return {
    id: response.data.id,
    username: response.data.username,
    location: response.data.location,
    role: response.data.role,
  };

  } catch (error) {
    console.error("Getting user profile failed:", error);
    throw error;
  }

  // TEST DATA
  return {
    id: "123460",
    username: "Another User",
    location: "Stockholm",
    role: "Resident",
  };
}

async function updateLocation(userID, location) {
  try {
    const response = await axios.put(port + "/api/users/" + userID, {
      userID,
      location,
    });

    // returnerar true/false
    return response.data;
  } catch (error) {
    console.error("Updating user location failed:", error);
    throw error;
  }
}

export default {
  getProfile,
  updateLocation,
};
