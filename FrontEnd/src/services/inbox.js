import axios from "axios";

const port = "http://localhost:8080";

async function getChats(userId) {
  try {
    const response = await axios.get(port + "/api/chats", {
      params: { userId },
    });

    const inboxArray = [];

    console.log("inbox item:");
    console.log(response.data);

    if (response.data !== undefined && Array.isArray(response.data)) {
      response.data.forEach((chat) => {
        const messages = [];
        if (chat[2] !== undefined && Array.isArray(chat[2])) {
          chat[2].forEach((message) => {
            messages.push({
              text: message[0],
              sender: message[1],
              date: message[2],
            });
          });
        }
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


  // TEST DATA
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

async function sendMessage(chatId, text, date, sender) {
  try {
    const response = await axios.post(port + "/api/messages", {
      chatId,
      text,
      date,
      sender,
    });
    if (response.data.success) {
      console.log("Message sent successfully!");
      return true;
    } else {
      console.log("Sending message failed (unexpected success value)");
      return false;
    }
  } catch (error) {
    console.error("Sending message failed:", error);
    throw error;
  }
}

async function startChat(sender, receiver) {
  try {
    const response = await axios.post(port + "/api/chats", {
      sender,
      receiver,
    });
    if (response.data.success) {
      console.log("Started Chat successfully!");
      return true;
    } else {
      console.log("Starting chat failed (unexpected success value)");
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
