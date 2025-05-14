"use client";
import React, { useRef, useState } from "react";
import SideBar from "../../components/sidebar";

function NewInitiative() {

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
              placeholder="Initiative Title"
            ></input>

            <p className="text-md">Caption</p>
            <input
              type="text"
              className="rounded-md border-2 p-1 focus:outline-0 w-full mb-2"
              placeholder="Initiative Title"
            ></input>

            <p className="text-md">IMG url</p>
            <input
              type="text"
              className="rounded-md border-2 p-1 focus:outline-0 w-full mb-2"
              placeholder="Initiative Title"
            ></input>

            <p className="text-md">Location</p>
            <input
              type="text"
              className="rounded-md border-2 p-1 focus:outline-0 w-full mb-2"
              placeholder="Initiative Title"
            ></input>

            <div className="flex items-center mt-3">
              <button className="border-2 border-black px-2 py-2 rounded-full hover:bg-gray-200">
              </button>
              <p className="ml-4 text-md">The initiative is not location specific</p>


            </div>

            <div className="flex items-center mt-5 gap-4">
              <div className="flex items-center gap-2">
                <p className="text-md">Start date:</p>
                <input
                  type="date"
                  className="rounded-md border-2 p-1 focus:outline-0"
                ></input>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-md">End date:</p>
                <input
                  type="date"
                  className="rounded-md border-2 p-1 focus:outline-0"
                ></input>
              </div>
            </div>

            <div>
              <p className="text-md mt-5">Category</p>
              <select
                className="rounded-md border-2 p-1 focus:outline-0 w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="environment">Option 1</option>
                <option value="education">Option 2</option>
                <option value="health">Option 3</option>
                <option value="community">Option 4</option>
              </select>


            </div>

            <div className="mt-6 flex justify-center">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                Post
              </button>
            </div>

          </div>
        </div>

      </div>


    </div>
  );
}

export default NewInitiative;
