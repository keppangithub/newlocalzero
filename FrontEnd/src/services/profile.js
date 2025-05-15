import axios from "axios";

async function getProfile(userID) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.get(("/api/users/"+userID), {
    });

    return response.data;

  } catch (error) {
    console.error("Getting user profile failed:", error);
    throw error;
  }
}

export default {
    getProfile
};
