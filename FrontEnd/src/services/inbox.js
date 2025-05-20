import axios from "axios";

const port = "localhost:3000";

async function getChats(userID) {
  /*try {
    //TODO - uppdatera endpoint path
    const response = await axios.get((port+"/chats"), {
        userID
    });

    return response.data;

  } catch (error) {
    console.error("Getting chats failed:", error);
    throw error;
  }*/
  const allInbox = [
    {
      name: "Mojtaba",
      id: "123",
      messages: [
        { text: "hej mojje", sender: "Ranacita", date: "2025-05-14" },
        { text: "hej", sender: "Mojtaba", date: "2025-05-14" },
        { text: "what the frick dude", sender: "Mojtaba", date: "2025-05-14" },
        { text: "what the sigma dude", sender: "Mojtaba", date: "2025-05-14" },
        { text: "...", sender: "Ranacita", date: "2025-05-14" },
        { text: "...", sender: "Ranacita", date: "2025-05-14" },
        { text: "...", sender: "Ranacita", date: "2025-05-14" },
        { text: "what the frick dude", sender: "Mojtaba", date: "2025-05-14" },
        { text: "what the sigma dude", sender: "Mojtaba", date: "2025-05-14" },
        { text: "what the frick dude", sender: "Mojtaba", date: "2025-05-14" },
        { text: "what the sigma dude", sender: "Mojtaba", date: "2025-05-14" },
      ],
    },
    {
      name: "Olivia",
      id: "124",
      messages: [
        { text: "hej olivia", sender: "Ranacita", date: "2025-05-14" },
        { text: "hejsan", sender: "Olivia", date: "2025-05-14" },
      ],
    },
    {
      name: "Kevin",
      id: "125",
      messages: [
        { text: "hej kevin", sender: "Ranacita", date: "2025-05-14" },
        { text: "hejhej", sender: "Kevin", date: "2025-05-14" },
      ],
    },
    {
      name: "Aleks",
      id: "126",
      messages: [
        { text: "hej aleks", sender: "Ranacita", date: "2025-05-14" },
        { text: "hejdå", sender: "Aleks", date: "2025-05-14" },
      ],
    },
  ];
  return allInbox;
}

async function sendMessage(chatID, text, date, sender) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.post(port+"/chats/" + chatID, {
      chatID,
      text,
      date,
      sender,
    });

    // TODO: switch case som returnerar true/false istället
    return response.data;
  } catch (error) {
    console.error("Sending message failed:", error);
    throw error;
  }
}

async function startChat(sender, receiver) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.post(port+"/chats/", {
      sender,
      receiver,
    });
    // TODO: switch case som returnerar true/false istället
    return response.data;
  } catch (error) {
    console.error("Starting chat with user failed:", error);
    throw error;
  }
}

export default {
  getChats,
  sendMessage,
  startChat,
};
