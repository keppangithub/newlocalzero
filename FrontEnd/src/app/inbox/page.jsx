"use client";
import React, { useRef, useState } from "react";
import Sidebar from "../../components/sidebar";
import InboxItem from "../../components/inboxItem";
import MessageBox from "../../components/messageBox";

function InboxPage() {
  // test data -> ska hämtas från APIn istället
  const allInbox = [
    {
      name: "Mojtaba",
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
      messages: [
        { text: "hej olivia", sender: "Ranacita", date: "2025-05-14" },
        { text: "hejsan", sender: "Olivia", date: "2025-05-14" },
      ],
    },
    {
      name: "Kevin",
      messages: [
        { text: "hej kevin", sender: "Ranacita", date: "2025-05-14" },
        { text: "hejhej", sender: "Kevin", date: "2025-05-14" },
      ],
    },
    {
      name: "Aleks",
      messages: [
        { text: "hej aleks", sender: "Ranacita", date: "2025-05-14" },
        { text: "hejdå", sender: "Aleks", date: "2025-05-14" },
      ],
    },
  ];
  // END OF TEST DATA

  const [selectedChat, setSelectedChat] = useState(allInbox[0].name);

  const renderChats = () => {
    return allInbox.map((inbox, inboxIndex) => (
      <div key={inboxIndex}>
        <button
          className="bg-gray-100 mt-6 p-5 rounded w-full justify-items-start
        hover:bg-gray-300"
          onClick={() => chatClicked(inbox.name)}
        >
          <p>{inbox.name}</p>
        </button>
      </div>
    ));
  };

  const chatClicked = (clickedName) => {
    setSelectedChat(clickedName);
  };

  const renderMessages = () => {
    const foundInbox = allInbox.find((inbox) => inbox.name === selectedChat);

    if (foundInbox) {
      return foundInbox.messages.map((message, messageIndex) => (
        <div key={messageIndex}>
          <MessageBox
            messageText={message.text}
            sender={message.sender}
            date={message.date}
          />
        </div>
      ));
    }
  };

  return (
    <div className="flex min-w-screen max-w-screen min-h-screen max-h-screen bg-zinc-100 font-light text-sm">
      <div className="bg-gray-300 w-[10%]">
        <Sidebar />
      </div>

      <div className="p-10 bg-white border-r-2 border-black w-[45%] ">
        <div className="flex items-center gap-4">
          <p className="text-2xl">Inbox</p>
        </div>

        <div
          className="overflow-y-scroll pr-1 h-[90%]
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-white
        dark:[&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          {renderChats()}
        </div>
      </div>

      <div className="p-10 bg-white border-r-2 border-black w-[45%] space-y-4">
        {/*Div1: chat header/username */}
        <div>
          <p>Chat: {selectedChat}</p>
        </div>

        {/*Div2: chat messages, scrollable*/}
        <div
          className="bg-gray-100 mt-6 p-4 rounded w-full overflow-y-scroll h-[65%]
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-white
        dark:[&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          {renderMessages()}
        </div>

        {/*Div3: chat input box*/}
        <div className="bg-gray-100 mt-6 p-4 rounded w-full">
          <input
            type="text"
            placeholder="Leave a message"
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 "
          />
          <div className="pt-5">
            <button className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-400">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InboxPage;
