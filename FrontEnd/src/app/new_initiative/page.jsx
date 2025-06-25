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
    <div className="flex flex-col md:flex-row w-full md:min-w-screen md:max-w-screen min-h-screen md:max-h-screen bg-white font-light text-sm">
      <div className="bg-gray-300 w-full md:w-[10%] sticky top-0 left-0 shadow-sm shadow-black/25 md:shadow-none">
        <SideBar />
      </div>

      <div className="bg-white md:w-[45%]">
        <div className="p-15 md:p-0 md:mx-28 md:my-10 ">
          <p className="text-lg  mb-4">New Initiative</p>
          <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div className="flex flex-col max-w-fit ">
            <p className="text-md">Title</p>
            <input
              type="text"
              className="rounded-md border-1 p-2 focus:outline-0 w-full mb-2"
              placeholder="e.g. Community Garden Project"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>

            <p className="text-md">Caption</p>
            <input
              type="text"
              className="rounded-md border-1 p-2 focus:outline-0 w-full mb-2"
              placeholder="e.g. Bringing neighbors together to grow fresh food and flowers."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></input>

            <p className="text-md">IMG url</p>
            <input
              type="text"
              className="rounded-md border-1 p-2 focus:outline-0 w-full mb-2"
              placeholder="e.g. https://images.unsplash.com/photo-1506744038136-46273834b3fb"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            ></input>

            <p className="text-md">Location</p>
            <select
              className="rounded-md border-1 p-2 focus:outline-0 w-full"
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
                  className="rounded-md border-1 p-2 focus:outline-0"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                ></input>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-md">End date:</p>
                <input
                  type="date"
                  className="rounded-md border-1 p-2 focus:outline-0"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                ></input>
              </div>
            </div>

            <div>
              <p className="text-md mt-3">Category</p>
              <select
                className="rounded-md border-1 p-2 focus:outline-0 w-full"
                defaultValue=""
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="ZERO_HUNGER">ZERO_HUNGER</option>
                <option value="NO_POVERTY">NO_POVERTY</option>
                <option value="ZERO_HUNGER">ZERO_HUNGER</option>
                <option value="GOOD_HEALTH_AND_WELLBEING">
                  GOOD_HEALTH_AND_WELLBEING
                </option>
                <option value="QUALITY_EDUCATION">QUALITY_EDUCATION</option>
                <option value="GENDER_EQUALITY">GENDER_EQUALITY</option>
                <option value="CLEAN_WATER_AND_SANITATION">
                  CLEAN_WATER_AND_SANITATION
                </option>
                <option value="AFFORDABLE_AND_CLEAN_ENERGY">
                  AFFORDABLE_AND_CLEAN_ENERGY
                </option>
                <option value="DECENT_WORK_AND_ECONOMIC_GROWTH">
                  DECENT_WORK_AND_ECONOMIC_GROWTH
                </option>
                <option value="INDUSTRY_INNOVATION_AND_INFRASTRUCTURE">
                  INDUSTRY_INNOVATION_AND_INFRASTRUCTURE
                </option>
                <option value="REDUCED_INEQUALITIES">
                  REDUCED_INEQUALITIES
                </option>
                <option value="SUSTAINABLE_CITIES_AND_COMMUNITIES">
                  SUSTAINABLE_CITIES_AND_COMMUNITIES
                </option>
                <option value="RESPONSIBLE_CONSUMPTION_AND_PRODUCTION">
                  RESPONSIBLE_CONSUMPTION_AND_PRODUCTION
                </option>
                <option value="CLIMATE_ACTION">CLIMATE_ACTION</option>
                <option value="LIFE_BELOW_WATER">LIFE_BELOW_WATER</option>
                <option value="LIFE_ON_LAND">LIFE_ON_LAND</option>
                <option value="PEACE_JUSTICE_AND_STRONG_INSTITUTIONS">
                  PEACE_JUSTICE_AND_STRONG_INSTITUTIONS
                </option>
                <option value="PARTNERSHIPS_FOR_THE_GOALS">
                  PARTNERSHIPS_FOR_THE_GOALS
                </option>
              </select>
            </div>

            <div className="mt-3 flex justify-center gap-4">
              <button
                className="bg-lime-900 text-white px-6 py-2 rounded-md hover:bg-lime-950"
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

export default NewInitiative;
