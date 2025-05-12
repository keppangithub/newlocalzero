"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

function SideBar() {
  const router = useRouter();

  return (
    <div>
      <div className="bg-gray-300 w-full">
        <button
          className=" bg-white hover:bg-gray-500 rounded-md p-2 w-[90%] mx-1 my-1 mt-5"
         
        >
          Home
        </button>
        <button
          className=" bg-white hover:bg-gray-500 rounded-md p-2 w-[90%] mx-1 my-1"
          
        >
          My Profile
        </button>
        <button
          className=" bg-white hover:bg-gray-500 rounded-md p-2 w-[90%] mx-1 my-1"
          
        >
          + New Initiative
        </button>
        <button
          className=" bg-white hover:bg-gray-500 rounded-md p-2 w-[90%] mx-1 my-1"
          
        >
          My Actions
        </button>
        <button
          className=" bg-white hover:bg-gray-500 rounded-md p-2 w-[90%] mx-1 my-1"
          
        >
          + New Action
        </button>
        <button
          className=" bg-white hover:bg-gray-500 rounded-md p-2 w-[90%] mx-1 my-1"
          
        >
          Inbox
        </button>
        <button
          className=" bg-white hover:bg-gray-500 rounded-md p-2 w-[90%] mx-1 my-1"
          
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;
