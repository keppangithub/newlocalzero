"use client";
import React, { useMemo, useState } from "react";
import SideBar from "../../components/sidebar";
import auth from "../../services/auth";
import initiative from "../../services/initiative";

function NewInitiative() {
  // --------- user inputs ---------
  const [notLocationSpecific, setNotLocationSpecific] = useState(false);
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");

  const currentUser = useMemo(() => auth.getCurrentUser(), []);

  // --------- handling user moves ---------
  const handleNotLocationSpecificClick = () => {
    setNotLocationSpecific((prev) => {
      const newValue = !prev;
      if (newValue) setLocation(""); // Reset location when toggled on
      return newValue;
    });
  };
  async function handlePost(e) {
    e.preventDefault();
    if (startDate && endDate && startDate > endDate) {
      alert("Start date cannot be after end date.");
      return;
    }
    const initiativePosted = await initiative.postNewInitiative(
      currentUser.id,
      title,
      caption,
      imgUrl,
      location,
      startDate,
      endDate,
      category
    );
    if (initiativePosted) {
      alert("Initiative posted successfully!");
    } else {
      alert("Failed to post initiative!");
    }
  }
  const handleReset = () => {
    setTitle("");
    setCaption("");
    setImgUrl("");
    setLocation("");
    setNotLocationSpecific(false);
    setStartDate("");
    setEndDate("");
    setCategory("");
  };

  // --------- page body ---------
  return (
    <div className="flex min-w-screen max-w-screen min-h-screen max-h-screen bg-zinc-800 font-light text-sm">
      <div className="bg-gray-300 w-[10%]">
        <SideBar />
      </div>

      <div className="bg-white w-[90%]">
        <div className="mx-28 my-10 ">
          <p className="text-lg  mb-4">New Initiative</p>
          <p className=" border-b-2 max-w-64 mb-6"></p>

          <div className="flex flex-col max-w-fit ">
            <p className="text-md">Title</p>
            <input
              type="text"
              className="rounded-md border-2 p-1 focus:outline-0 w-full mb-2"
              placeholder="e.g. Community Garden Project"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>

            <p className="text-md">Caption</p>
            <input
              type="text"
              className="rounded-md border-2 p-1 focus:outline-0 w-full mb-2"
              placeholder="e.g. Bringing neighbors together to grow fresh food and flowers."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></input>

            <p className="text-md">IMG url</p>
            <input
              type="text"
              className="rounded-md border-2 p-1 focus:outline-0 w-full mb-2"
              placeholder="e.g. https://images.unsplash.com/photo-1506744038136-46273834b3fb"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            ></input>

            <p className="text-md">Location</p>
            <select
              className="rounded-md border-2 p-1 focus:outline-0 w-full"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={notLocationSpecific}
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

            <div className="flex items-center mt-4">
              <button
                className={`border-2 border-black px-2 py-2 rounded-full ${
                  notLocationSpecific ? "bg-black text-white" : "bg-white"
                }`}
                onClick={handleNotLocationSpecificClick}
                type="button"
              />
              <p className="ml-4 text-md">
                The initiative is not location specific
              </p>
            </div>

            <div className="flex items-center mt-4 gap-4">
              <div className="flex items-center gap-2">
                <p className="text-md">Start date:</p>
                <input
                  type="date"
                  className="rounded-md border-2 p-1 focus:outline-0"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                ></input>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-md">End date:</p>
                <input
                  type="date"
                  className="rounded-md border-2 p-1 focus:outline-0"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                ></input>
              </div>
            </div>

            <div>
              <p className="text-md mt-3">Category</p>
              <select
                className="rounded-md border-2 p-1 focus:outline-0 w-full"
                defaultValue=""
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Urban Environments">Urban Environments</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Nature and Wildlife">Nature and Wildlife</option>
                <option value="Misc">Misc</option>
              </select>
            </div>

            <div className="mt-3 flex justify-center gap-4">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                onClick={handlePost}
              >
                Post
              </button>
              <button
                type="button"
                className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewInitiative;
