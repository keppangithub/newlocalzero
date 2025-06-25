"use client";
import React, { useMemo, useState } from "react";
import SideBar from "../../components/sidebar";
import action from "../../services/action";
import auth from "../../services/auth";

function NewAction() {
  // --------- user inputs ---------
  const [actionDate, setActionDate] = useState("");
  const [actionName, setActionName] = useState("");
  const [actionType, setActionType] = useState("");
  const [metricsText, setMetricsText] = useState("");

  const currentUser = useMemo(() => auth.getCurrentUser(), []);

  // --------- handling user moves ---------
  async function postClicked() {
    if (!actionDate || !actionType || !metricsText) {
      alert("Please fill in all of the fields!");
    } else if (!Number.isInteger(Number(metricsText))) {
      alert("Please enter an integer as metric.");
    } else {
      const actionPosted = await action.postNewAction(
        currentUser.id,
        actionName,
        actionDate,
        actionType,
        metricsText
      );
      if (actionPosted) {
        alert("Action posted successfully!");
      } else {
        alert("Failed to post action!");
      }
    }
  }

  // --------- page body ---------
  return (
    <div className="flex flex-col md:flex-row w-full md:min-w-screen md:max-w-screen min-h-screen md:max-h-screen bg-white font-light text-sm">
      <div className="bg-gray-300 w-full md:w-[10%] sticky top-0 left-0 shadow-sm shadow-black/25 md:shadow-none">
        <SideBar />
      </div>

      <div className="md:w-[45%] p-10 space-y-4">
        <p className="text-xl">New Action</p>
        <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div className="space-y-1">
          <p>Action Date: </p>
          <input
            type="date"
            value={actionDate}
            onChange={(e) => setActionDate(e.target.value)}
            className="rounded-md border-1 p-2 focus:outline-0 w-[90%]"
          ></input>
        </div>

        <div className="space-y-1">
          <p>Action Name: </p>
          <input
            type="text"
            value={actionName}
            onChange={(e) => setActionName(e.target.value)}
            className="rounded-md border-1 p-2 focus:outline-0 w-[90%]"
          ></input>
        </div>

        <div className="space-y-1">
          <label htmlFor="type">Action Type:</label>
          <br />
          <select
            id="type"
            className="rounded-md border-1 p-2 focus:outline-0 w-[90%]"
            onChange={(e) => setActionType(e.target.value)}
            value={actionType}
          >
            <option defaultValue={null}>Select Type...</option>
            <option value="BIKING">Biking</option>
            <option value="WALKING">Walking</option>
            <option value="PUBLIC_TRANSPORT">Public Transport</option>
            <option value="PICK_UP_TRASH">Trash Pickup</option>
            <option value="RECYCLING">Recycling</option>
            <option value="TOOL_SHARING">Tool Sharing</option>
            <option value="RECYCLING_DRIVE">Recycling Drive</option>
            <option value="RIDE_SHARING">Ride Sharing</option>
            <option value="COMMUNITY_GARDENING">Community Gardening</option>
            <option value="FOOD_SWAPS">Food Swaps</option>
          </select>
        </div>

        <div className="space-y-1">
          <p>Metrics: </p>
          <input
            type="text"
            value={metricsText}
            onChange={(e) => setMetricsText(e.target.value)}
            className="rounded-md border-1 p-2 focus:outline-0 w-[90%]"
          ></input>
        </div>

        <br/>

        <button
          className="text-white bg-lime-900 hover:bg-lime-950 rounded-md p-2 w-[100px]"
          onClick={postClicked}
        >
          POST
        </button>
      </div>

      <div className="md:w-[45%] pt-0 p-10 md:pt-10 space-y-1">
        <p>
          *Metrics for actions
        </p>
        <br/>
        <p>Biking: kilometers</p>
        <p>Walked: kilometers</p>
        <p>Public Transport: number of times taken</p>
        <p>Trash pickup: number of collected bags</p>
        <p>Recycling: number of times</p>
        <p>Shared tools: number of tools </p>
        <p>Recycling Drive: number of times</p>
        <p>Ride Sharing: number of times </p>
        <p>Community Garedening: number of times </p>
        <p>Food Swapped: number of times</p>
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

export default NewAction;
