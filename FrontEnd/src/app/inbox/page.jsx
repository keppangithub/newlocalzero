"use client";
import React, { useMemo, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar";
import MessageBox from "../../components/messageBox";
import inbox from "../../services/inbox";
import auth from "../../services/auth";

function InboxPage() {
  // --------- user inputs ---------
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatID, setSelectedChatID] = useState(null);

  // --------- loading page data from backend ---------
  const currentUser = useMemo(() => auth.getCurrentUser(), []);
  const [allInbox, setAllInbox] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadPageData() {
      try {
        const data = await inbox.getChats(currentUser.id);
        setAllInbox(data);
        if (data.length > 0) {
          setSelectedChat(data[0].name);
          setSelectedChatID(data[0].id);
        }
      } catch (error) {
        console.error("Failed to load inbox:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPageData();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (!allInbox) return <p>Error loading data.</p>;

  // --------- populating page with data ---------
  const renderChats = () => {
    if (Array.isArray(allInbox) && allInbox.length > 0) {
      return allInbox.map((inbox, inboxIndex) => (
        <div key={inboxIndex}>
          <button
            className="bg-gray-100 mt-6 p-5 rounded w-full justify-items-start
        hover:bg-gray-300"
            onClick={() => chatClicked(inbox.name, inbox.id)}
          >
            <p>{inbox.name}</p>
          </button>
        </div>
      ));
    }
  };
  const renderMessages = () => {
    const foundInbox = allInbox.find((inbox) => inbox.name === selectedChat);
    if (
      foundInbox &&
      Array.isArray(foundInbox.messages) &&
      foundInbox.messages.length > 0
    ) {
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

  // --------- handling user moves ---------
  async function sendMessageClicked() {
    if (!message) {
      alert("Please write a message before sending.");
      return;
    } else {
      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0];
      //alert("Sending message: "+message+" by "+currentUser.id+" in chat "+selectedChatID+" on "+formattedDate);
      const sendMessage = await inbox.sendMessage(
        selectedChatID,
        message,
        date,
        currentUser.id
      );
      updateData();
      setMessage("");
    }
  }
  const chatClicked = (clickedName, clickedID) => {
    setSelectedChat(clickedName);
    setSelectedChatID(clickedID);
  };

  // Laddar om sidan
  async function updateData() {
    const data = await inbox.getChats(currentUser.id);
    setAllInbox(data);
  }

  // --------- page body ---------
  return (
    <div className="flex flex-col md:flex-row w-full md:min-w-screen md:max-w-screen min-h-screen md:max-h-screen bg-white font-light text-sm">
      <div className="bg-gray-300 w-full md:w-[10%] sticky top-0 left-0 shadow-sm shadow-black/25 md:shadow-none">
        <Sidebar />
      </div>

      {/*Left*/}
      <div className="p-10 bg-white border-r-2 border-black md:w-[45%] shadow-sm shadow-black/25 md:shadow-none">
        <div className="flex items-center gap-4">
          <p className="text-2xl">Inbox</p>
        </div>

        <div
          className="overflow-y-scroll pr-1 md:h-[90%] max-h-80
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

      {/*Right*/}
      <div className="p-10 bg-white border-r-2 border-black max-h-screen md:w-[45%] space-y-4">
        {/*Div1: chat header/username */}
        <div>
          <p>Current Chat: {selectedChat}</p>
        </div>

        {/*Div2: chat messages, scrollable*/}
        <div
          className="bg-gray-100 mt-6 p-4 rounded w-full md:h-[65%] h-100 overflow-y-scroll 
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-white p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 "
          />
          <div className="pt-5">
            <button
              className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-400"
              onClick={sendMessageClicked}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/*Footer with logo*/}
      <div className="block md:hidden justify-items-center bg-lime-950 mt-4">
        <img
          src="/logo_white.png"
          alt="LocalZero Logo"
          className="w-20 h-auto"
        />
      </div>
    </div>
  );
}

export default InboxPage;
