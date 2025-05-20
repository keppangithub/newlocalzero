import axios from "axios";

const port = "localhost:8080";

async function getAllInitiatives(location) {
  /*try {
    const response = await axios.get(port + "/api/inits", {
      location,
    });

    const initiativesArray = [];
    response.data.array.forEach((init) => {
      const initObject = {
        title: init[0],
        caption: init[1],
        id: init[2],
      };
      initiativesArray.push(initObject);
    });

    return initiativesArray;

  } catch (error) {
    console.error("Getting initiatives failed:", error);
    throw error;
  }*/

  const allInitiatives = [];
  allInitiatives[0] = {
    title: "Pickup Trash Event",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    id: "12",
  };
  allInitiatives[1] = {
    title: "Charity day for a greener future",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    id: "13",
  };
  allInitiatives[2] = {
    title: "Blackout day 2025",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    id: "14",
  };

  return allInitiatives;
}

async function getMyInitiatives(userID) {
  /*try {
    //TODO - uppdatera endpoint path
    const response = await axios.get(port+"/api/users/" + userID + "/inits", {});

    const initiativesArray = [];
    response.data.array.forEach((init) => {
      const initObject = {
        title: init[0],
        caption: init[1],
        id: init[2],
      };
      initiativesArray.push(initObject);
    });

    return initiativesArray;

  } catch (error) {
    console.error("Getting my initiatives failed:", error);
    throw error;
  }*/

  const myInitiatives = [];
  myInitiatives[0] = {
    title: "Charity day for a greener future",
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    id: "13",
  };
  return myInitiatives;
}

async function getMyNotifications(userID) {
  /*try {
    const response = await axios.get(port+"/api/users/" + userID + "/notifications", {});
    const notifsArray = [];
    response.data.array.forEach((notif) => {
      const notifObject = {
        title: notif[0],
        date: notif[1],
        id: notif[2],
      };
      notifsArray.push(notifObject);
    });
    return notifsArray;
  } catch (error) {
    console.error("Getting my notifications failed:", error);
    throw error;
  }*/

  const notifications = [];
  notifications[0] = {
    title: "There was an update on an initiative you joined.",
    date: "2025-05-13",
    id: "20",
  };
  notifications[1] = {
    title: "There was an update on an initiative you joined.",
    date: "2025-05-12",
    id: "21",
  };
  return notifications;
}

async function postNewInitiative(
  userID,
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
      userID,
      title,
      description,
      imageURL,
      location,
      startDate,
      endDate,
      category,
    });

    // returnerar true/false
    return response.data;
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

    // returnerar true/false
    return response.data;
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

    // returnerar true/false
    return response.data;
  } catch (error) {
    console.error("Posting comment failed:", error);
    throw error;
  }
}

async function joinInitiative(userID, initiativeID) {
  try {
    const response = await axios.post(
      port + "/api/users/" + userID + "/inits/",
      {
        userID,
        initiativeID,
      }
    );

    // returnerar true/false
    return response.data;
  } catch (error) {
    console.error("Joining initiative failed:", error);
    throw error;
  }
}
async function getInitiative(initiativeID) {
  /*
  try {
    const response = await axios.get("/api/inits/" + initiativeID, {});

    const comments = [];
    response.data[9].array.forEach((comment) => {
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

    return {
      title: response.data[0],
    description: response.data[1],
    startDate: response.data[2],
    endDate: response.data[3],
    location: response.data[4],
    category: response.data[5],
    posterUsername: response.data[6],
    posterID: response.data[7],
    imageURL: response.data[8],
    allComments: comments
    };

  } catch (error) {
    console.error("Getting initiative failed:", error);
    throw error;
  }*/

  const comments = [];
  comments[0] = {
    content: "nice event",
    date: "2025-05-13",
    commenterName: "Olivia",
    commenterID: "6374638",
    imageURL: null,
    id: "c01",
  };
  comments[1] = {
    content: "djur",
    date: "2025-05-13",
    commenterName: "Kevin",
    commenterID: "6374639",
    imageURL: null,
    id: "c02",
  };
  comments[2] = {
    content: "woooow what the frick dude",
    date: "2025-05-13",
    commenterName: "Mojtaba",
    commenterID: "6374640",
    imageURL:
      "https://i.pinimg.com/736x/92/92/4d/92924d2c715737c18b1ea1c20612daf8.jpg",
    id: "c03",
  };
  comments[3] = {
    content: "long live poland",
    date: "2025-05-13",
    commenterName: "Aleks",
    commenterID: "6374641",
    imageURL: null,
    id: "c04",
  };

  return {
    title: "Event Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    startDate: "2025-05-13",
    endDate: "2025-05-15",
    location: "Malmö",
    category: "Life on Earth",
    posterUsername: "Sven",
    posterID: "25637467",
    imageURL:
      "https://media.istockphoto.com/id/1402088366/photo/an-unrecognizable-woman-holds-a-plastic-garbage-bottle.jpg?s=612x612&w=0&k=20&c=yY93Gk_Jk2uZXCHmemCtsw_3ZdIo8UgU1PwWffxGopk=",
    allComments: comments,
  };
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
