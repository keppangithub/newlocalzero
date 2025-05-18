"use client";
import React, { useMemo, useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import ActionBox from "../../components/actionBox";
import auth from "../../services/auth";
import action from "../../services/action";

function MyActions() {
  // --------- loading page data from backend ---------
  const currentUser = useMemo(() => auth.getCurrentUser(), []);
  const [allActions, setAllActions] = useState(null);
  const [myStats, setMyStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPageData() {
      try {
        const [actions, stats] = await Promise.all([
          action.getMyActions(currentUser.id),
          action.getActionStats(currentUser.id),
        ]);
        setAllActions(actions);
        setMyStats(stats);
      } catch (error) {
        console.error("Failed to load my actions:", error);
      } finally {
        setLoading(false);
      }
    }
    if (currentUser?.id) {
      loadPageData();
    }
  }, []);
  if (loading) return <p>Loading...</p>;

  // --------- populating page with data ---------
  const renderMyActions = () => {
    return allActions.map((action, actionIndex) => (
      <div key={actionIndex}>
        <ActionBox
          title={action.title}
          type={action.type}
          metric={action.metric}
          date={action.date}
        />
      </div>
    ));
  };

  // --------- page body ---------
  return (
    <div className="flex min-w-screen max-w-screen min-h-screen max-h-screen bg-zinc-white font-light text-sm">
      <div className="bg-gray-300 w-[10%]">
        <SideBar />
      </div>

      <div className="w-[45%] p-8">
        <p className="text-xl">My Actions</p>
        <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div
          className="w-[95%] h-[90%] justify-self-center space-y-2 overflow-y-scroll pr-1
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-white
        dark:[&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          {renderMyActions()}
        </div>
      </div>

      <div className="w-[45%] p-20 h-[70%] text-md">
        <p className="text-xl">Statistics</p>
        <p>Kilometers biked: {myStats.kmBiked} </p>
        <p>Public transport taken: {myStats.publicTransport} instances</p>
        <p>Items thrifted: {myStats.itemsThrifted}</p>
        <p>Bags of trash picked up: {myStats.trashPickedUp}</p>
      </div>
    </div>
  );
}

export default MyActions;
