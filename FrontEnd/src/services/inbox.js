import axios from "axios";

const port = "http://localhost:8080";

async function getChats(userID) {
  try {
    const response = await axios.get(port + "/api/chats", {
      userID,
    });

    const inboxArray = [];

    if (response.data !== undefined && Array.isArray(response.data)) {
      response.data.forEach((chat) => {
        const messages = [];
        chat[3].forEach((message) => {
          messages.push({
            text: message[0],
            sender: message[1],
            date: message[2],
          });
        });
        const chatObject = {
          name: chat[0],
          id: chat[1],
          messages: messages,
        };
        inboxArray.push(chatObject);
      });
    }
    return inboxArray;
  } catch (error) {
    console.error("Getting chats failed:", error);
    throw error;
  }
}

async function sendMessage(chatID, text, date, sender) {
  try {
    const response = await axios.post(port + "/api/chats/" + chatID, {
      chatID,
      text,
      date,
      sender,
    });
    
    if (response.data.success) {
      console.log("Sending message successful!");
      return true;
    } else {
      console.log("Sending message failed");
      return false;
    }

  } catch (error) {
    console.error("Sending message failed:", error);
    throw error;
  }
}

async function startChat(sender, receiver) {
  try {
    const response = await axios.post(port + "/api/chats/", {
      sender,
      receiver,
    });
    if (response.data.success) {
      console.log("Starting chat successful!");
      return true;
    } else {
      console.log("Starting chat failed");
      return false;
    }
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
