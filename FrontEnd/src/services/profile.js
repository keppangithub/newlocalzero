import axios from "axios";

const port = "http://localhost:8080";

async function getProfile(userID) {
  try {
    const response = await axios.get(port + "/api/users/" + userID);
    console.log(response);

    // Extracting data from the nested ArrayList structure
    if (response.data.length > 0) {
      //const userInfo = response.data[0];
      return {
        id: response.data[0],
        username: response.data[1],
        location: response.data[2],
        role: response.data[3],
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
