import axios from "axios";

const port = "http://localhost:8080";

async function getProfile(userID) {
  try {
    const response = await axios.get(port + "/api/users/" + userID);

    // Extracting data from the nested ArrayList structure
    if (response.data.length > 0) {
      const userInfo = response.data[0];
      return {
        id: userInfo[0],
        username: userInfo[1],
        location: userInfo[2],
        role: userInfo[3],
      };
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Getting user profile failed:", error);
    throw error;
  }



  /* TEST DATA
  return {
    id: "123460",
    username: "Another User",
    location: "Stockholm",
    role: "Resident",
  };

   */
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
