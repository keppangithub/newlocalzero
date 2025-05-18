import axios from "axios";

async function getProfile(userID) {
  /*try {
    //TODO - uppdatera endpoint path
    const response = await axios.get(("/users/"+userID), {
    });

    return response.data;

  } catch (error) {
    console.error("Getting user profile failed:", error);
    throw error;
  }*/

    return {
    id : "123460",
    username : "Another User",
    location: "Stockholm",
    role: "Resident"
  }

}

export default {
    getProfile
};
