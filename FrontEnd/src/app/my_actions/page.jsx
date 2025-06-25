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
    if (Array.isArray(allActions) && allActions.length > 0) {
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
    }
  };

  // --------- page body ---------
  return (
    <div className="flex flex-col md:flex-row w-full md:min-w-screen md:max-w-screen min-h-screen md:max-h-screen bg-white font-light text-sm">
      <div className="bg-gray-300 w-full md:w-[10%] sticky top-0 left-0 shadow-sm shadow-black/25 md:shadow-none">
        <SideBar />
      </div>

      <div className="md:w-[45%] p-8">
        <p className="text-xl">My Actions</p>
        <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div
          className="w-[95%] md:h-[90%] justify-self-center space-y-2 overflow-y-scroll pr-1
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

      <div className="md:w-[45%] p-20 h-[70%] text-md">
        <p className="text-xl">Statistics</p>
        <p>Biked {myStats.kmBiked} kms</p>
        <p>Walked {myStats.kmWalked} kms</p>
        <p>Took Public Transport {myStats.publicTransport} times</p>
        <p>Picked up {myStats.pickupTrash} bags of trash</p>
        <p>Recycled {myStats.recycle} times</p>
        <p>Shared {myStats.toolSharing} tools</p>
        <p>Recycling Drive: {myStats.recyclingDrive}</p>
        <p>Shared rides {myStats.rideSharing} time</p>
        <p>Community Garedened {myStats.communityGardening} times</p>
        <p>Food Swapped {myStats.foodSwaps} times</p>
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

export default MyActions;
