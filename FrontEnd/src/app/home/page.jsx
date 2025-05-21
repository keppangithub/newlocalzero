"use client";
import React, { useMemo, useEffect, useRef, useState } from "react";
import SideBar from "../../components/sidebar";
import Initiative from "../../components/initiativeBox";
import Notification from "../../components/notificationBox";
import auth from "../../services/auth";
import initiative from "../../services/initiative";

function HomePage() {
  // --------- user inputs ---------
  const currentUser = useMemo(() => auth.getCurrentUser(), []);
  const [selectedLocation, setSelectedLocation] = useState(
    currentUser.location
  );

  // --------- loading page data from backend ---------
  const [allInitiatives, setAllInitiatives] = useState([]);
  const [myInitiatives, setMyInitiatives] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPageData() {
      try {
        const [all, mine, notifs] = await Promise.all([
          initiative.getAllInitiatives(selectedLocation),
          initiative.getMyInitiatives(currentUser.id),
          initiative.getMyNotifications(currentUser.id),
        ]);

        setAllInitiatives(all);
        setMyInitiatives(mine);
        setNotifications(notifs);
      } catch (error) {
        console.error("Failed to load homepage:", error);
      } finally {
        setLoading(false);
      }
    }
    if (currentUser?.id && currentUser?.location) {
      loadPageData();
    }
  }, [currentUser]);
  if (loading) return <p>Loading...</p>;

  // --------- populating page with data ---------
  const renderAllInitiatives = () => {
    if (Array.isArray(allInitiatives) && allInitiatives.length > 0) {
      return allInitiatives.map((initiative, initiativeIndex) => (
        <div key={initiativeIndex}>
          <Initiative
            title={initiative.title}
            caption={initiative.caption}
            id={initiative.id}
          />
        </div>
      ));
    }
  };
  const renderMyInitiatives = () => {
    if (Array.isArray(myInitiatives) && myInitiatives.length > 0) {
      return myInitiatives.map((initiative, initiativeIndex) => (
        <div key={initiativeIndex}>
          <Initiative
            title={initiative.title}
            caption={initiative.caption}
            id={initiative.id}
          />
        </div>
      ));
    }
  };
  const renderMyNotifications = () => {
    if (Array.isArray(notifications) && notifications.length > 0) {
      return notifications.map((notif, notifIndex) => (
        <div key={notifIndex}>
          <Notification title={notif.title} date={notif.date} id={notif.id} />
        </div>
      ));
    }
  };

  // --------- handling user moves ---------
  async function locationChanged(value) {
    setSelectedLocation(value);
    const newInitiatives = await initiative.getAllInitiatives(value);
    setAllInitiatives(newInitiatives);
  }

  // --------- page body ---------
  return (
    <div className="flex min-w-screen max-w-screen min-h-screen max-h-screen bg-zinc-800 font-light text-sm">
      <div className="bg-gray-300 w-[10%]">
        <SideBar />
      </div>

      <div className="bg-white w-[35%]">
        <div className="p-5">
          <p className="text-xl">Initiatives</p>
          <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <p>Location: </p>

          <select
            className="rounded-md border-2 p-2 focus:outline-0 w-full"
            value={selectedLocation}
            onChange={(e) => locationChanged(e.target.value)}
          >
            <option value="" disabled>
              Select a location
            </option>
            <option value="Malmö">Malmö</option>
            <option value="Trelleborg">Trelleborg</option>
            <option value="Lund">Lund</option>
            <option value="Helsingborg">Helsingborg</option>
            <option value="Perstorp">Perstorp</option>
          </select>

          <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        </div>

        <div
          className="w-[95%] h-[65%] justify-self-center space-y-2 overflow-y-scroll pr-1
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-white
        dark:[&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          {renderAllInitiatives()}
        </div>
      </div>

      <div className="bg-gray-300 w-[35%]">
        <div className="p-5">
          <p className="text-xl">My Initiatives</p>
          <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        </div>

        <div
          className="w-[95%] justify-self-center space-y-2 h-[80%] overflow-y-scroll pr-1
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-white
        dark:[&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          {renderMyInitiatives()}
        </div>
      </div>

      <div className="bg-white w-[20%]">
        <div className="p-5">
          <p className="text-xl">Notifications</p>
          <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        </div>
        <div
          className="w-[95%] space-y-2 justify-self-center h-[80%] overflow-y-scroll pr-1
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-white
        dark:[&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          {renderMyNotifications()}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
