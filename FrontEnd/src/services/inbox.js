import axios from "axios";

async function getChats(userID) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.get(("/chats"), {
        userID
    });

    return response.data;

  } catch (error) {
    console.error("Getting chats failed:", error);
    throw error;
  }
}

async function sendMessage(chatID, text, date, sender) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.post(("/chats/"+chatID), {
        chatID, text, date, sender
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
    const response = await axios.post(("/chats/"), {
        sender, receiver
    });

    // TODO: switch case som returnerar true/false istället
    return response.data;

  } catch (error) {
    console.error("Starting chat with user failed:", error);
    throw error;
  }
}

export default {
    getChats, sendMessage, startChat
};
