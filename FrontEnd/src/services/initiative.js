import axios from "axios";

const port = "http://localhost:8080";

async function getAllInitiatives(location) {
  console.log("entered getAllInitiaitves body:");

  try {
    const response = await axios.get(port + "/api/inits", {
      params: { location },
    });

    const initiativesArray = [];

    console.log("logging response in getAllInitiaitves body:");
    console.log(response.data);

    if (response.data !== undefined && Array.isArray(response.data)) {
      response.data.forEach((init) => {
        const initObject = {
          title: init[0],
          caption: init[1],
          id: init[2],
        };
        initiativesArray.push(initObject);
      });
      return initiativesArray;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Getting initiatives failed:", error);
    throw error;
  }
}

async function getMyInitiatives(userID) {
  try {
    const response = await axios.get(
      port + "/api/users/" + userID + "/inits",
      {}
    );

    const initiativesArray = [];

    console.log("My Initiatives object");
    console.log(response.data);

    if (response.data !== undefined && Array.isArray(response.data)) {
      response.data.forEach((init) => {
        const initObject = {
          title: init[0],
          caption: init[1],
          id: init[2],
        };
        initiativesArray.push(initObject);
      });
      return initiativesArray;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Getting my initiatives failed:", error);
    throw error;
  }
}

async function getMyNotifications(userID) {
  try {
    const response = await axios.get(
      port + "/api/users/" + userID + "/notifications",
      {}
    );

    const notifsArray = [];
    if (response.data !== undefined && Array.isArray(response.data)) {
      response.data.forEach((notif) => {
        const notifObject = {
          title: notif[0],
          date: notif[1],
          id: notif[2],
        };
        notifsArray.push(notifObject);
      });
      return notifsArray;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Getting my notifications failed:", error);
    throw error;
  }
}

async function postNewInitiative(
  userId,
  title,
  description,
  imageURL,
  location,
  startDate,
  endDate,
  category
) {
  try {
    const response = await axios.post(port + "/api/inits", {
      userId,
      title,
      description,
      imageURL,
      location,
      startDate,
      endDate,
      category,
    });

    if (response.data.success) {
      console.log("Initiative posted successfully!");
      return true;
    } else {
      console.log("Initiative posting failed (unexpected success value)");
      return false;
    }
  } catch (error) {
    console.error("Posting new initiative failed:", error);
    throw error;
  }
}

async function updateInitiative(initiativeID, description) {
  try {
    const response = await axios.put(port + "/api/inits/" + initiativeID, {
      description,
    });

    if (response.data.success) {
      console.log("Updated initiative successfully!");
      return true;
    } else {
      console.log("Updating initiative failed (unexpected success value)");
      return false;
    }
  } catch (error) {
    console.error("Adding update to an initiative failed:", error);
    throw error;
  }
}

async function postInitiativeComment(
  initiativeID,
  posterID,
  comment,
  date,
  imageURL
) {
  try {
    const response = await axios.post(port + "/api/inits/" + initiativeID, {
      initiativeID,
      posterID,
      comment,
      date,
      imageURL,
    });

    if (response.data.success) {
      console.log("Posted comment successfully!");
      return true;
    } else {
      console.log("Posting comment failed (unexpected success value)");
      return false;
    }
  } catch (error) {
    console.error("Posting comment failed:", error);
    throw error;
  }
}

async function joinInitiative(userID, initiativeId) {

  try {
    const response = await axios.post(
      port + "/api/users/" + userID + "/inits",
      {
        userID,
        initiativeId,
      }
    );

    if (response.data.success) {
      console.log("Joined initiative successfully!");
      return true;
    } else {
      console.log("Joining initiative failed (unexpected success value)");
      return false;
    }

  } catch (error) {
    console.error("Joining initiative failed:", error);
    throw error;
  }
}
async function getInitiative(initiativeID) {
  try {
    const response = await axios.get(port + "/api/inits/" + initiativeID, {});

    let comments = [];
    if (response.data[1] !== undefined && Array.isArray(response.data[1])) {
      console.log(response);
      response.data[1].forEach((comment) => {
        const commentObject = {
          content: comment[0],
          date: comment[1],
          commenterName: comment[2],
          commenterID: comment[3],
          imageURL: comment[4],
          id: comment[5],
        };
        comments.push(commentObject);
      });
    }

    return {
      title: response.data[0][0],
      description: response.data[0][1],
      startDate: response.data[0][2],
      endDate: response.data[0][3],
      location: response.data[0][4],
      category: response.data[0][5],
      posterUsername: response.data[0][6],
      posterID: response.data[0][7],
      imageURL: response.data[0][8],
      allComments: comments,
    };
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
  getMyNotifications,
};
