"use client";
import React, { useRef, useState } from "react";
import SideBar from "../../components/sidebar";

function NewAction() {
  const [actionDate, setActionDate] = useState("");
  const [actionType, setActionType] = useState("");
  const [metricsText, setMetricsText] = useState("");

  async function postClicked() {
    if (!actionDate || !actionType || !metricsText) {
      alert("Please fill in all of the fields!");
    } else {
      //TODO: skicka till APIn
    }
  }

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
          <label for="type">Action Type:</label>
          <br />
          <select
            id="type"
            class="rounded-md border-2 p-2 focus:outline-0 w-[90%]"
            onChange={(e) => setActionType(e.target.value)}
            value={actionType}
          >
            <option selected>Select Type...</option>
            <option value="RUNNING">Running/Jogging</option>
            <option value="PUBLICTRANSPORT">Public Transport</option>
            <option value="THRIFTING">Thrifting</option>
            <option value="TRASHPICKUP">Trash Pickup</option>
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

        <p>
          *Metrics for actions
          <br />
          biking/jogging/running: kilometers
          <br />
          public transport: instances
          <br />
          trash cleanup: bags collected
          <br />
          thrifting: number of items
        </p>

        <button
          className="text-white bg-gray-700 hover:bg-gray-800 rounded-md p-2 w-[100px]"
          onClick={postClicked}
        >
          POST
        </button>

      </div>
    </div>
  );
}

export default NewAction;
