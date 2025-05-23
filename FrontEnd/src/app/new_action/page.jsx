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
    <div className="flex min-w-screen max-w-screen min-h-screen max-h-screen bg-white font-light text-sm">
      <div className="bg-gray-300 w-[10%]">
        <SideBar />
      </div>

      <div className="w-[45%] p-10 space-y-4">
        <p className="text-xl">New Action</p>
        <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>

        <div className="space-y-1">
          <p>Action Date: </p>
          <input
            type="date"
            value={actionDate}
            onChange={(e) => setActionDate(e.target.value)}
            className="rounded-md border-2 p-2 focus:outline-0 w-[90%]"
          ></input>
        </div>

        <div className="space-y-1">
          <p>Action Name: </p>
          <input
            type="text"
            value={actionName}
            onChange={(e) => setActionName(e.target.value)}
            className="rounded-md border-2 p-2 focus:outline-0 w-[90%]"
          ></input>
        </div>

        <div className="space-y-1">
          <label htmlFor="type">Action Type:</label>
          <br />
          <select
            id="type"
            className="rounded-md border-2 p-2 focus:outline-0 w-[90%]"
            onChange={(e) => setActionType(e.target.value)}
            value={actionType}
          >
            <option defaultValue={null}>Select Type...</option>
            <option value="BIKING">BIKING</option>
            <option value="WALKING">WALKING</option>
            <option value="PUBLIC_TRANSPORT">PUBLIC_TRANSPORT</option>
            <option value="PICK_UP_TRASH">PICK_UP_TRASH</option>
            <option value="RECYCLING">RECYCLING</option>
            <option value="TOOL_SHARING">TOOL_SHARING</option>
            <option value="RECYCLING_DRIVE">RECYCLING_DRIVE</option>
            <option value="RIDE_SHARING">RIDE_SHARING</option>
            <option value="COMMUNITY_GARDENING">COMMUNITY_GARDENING</option>
            <option value="FOOD_SWAPS">FOOD_SWAPS</option>
          </select>
        </div>

        <div className="space-y-1">
          <p>Metrics: </p>
          <input
            type="text"
            value={metricsText}
            onChange={(e) => setMetricsText(e.target.value)}
            className="rounded-md border-2 p-2 focus:outline-0 w-[90%]"
          ></input>
        </div>

        <br/>

        <button
          className="text-white bg-gray-700 hover:bg-gray-800 rounded-md p-2 w-[100px]"
          onClick={postClicked}
        >
          POST
        </button>
      </div>

      <div className="w-[45%] p-10 space-y-1">
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
    </div>
  );
}

export default NewAction;
