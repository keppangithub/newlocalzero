"use client";
import React, { useRef, useState } from "react";
import SideBar from "../../components/sidebar";

function Profile() {
  const userName = "Mary Jane";
  const userRole = "Community Organizer";

  async function messageUserClicked() {

  }

  return (
    <div className="flex min-w-screen max-w-screen min-h-screen max-h-screen bg-white font-light text-sm">
      <div className="bg-gray-300 w-[10%]">
        <SideBar />
      </div>

      <div className="p-10 w-[50%] space-y-3">
        <p className="text-xl">{userName}</p>
        <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <p className="text-md">Role: {userRole}</p>
        <button
          className="text-white bg-gray-700 hover:bg-gray-800 rounded-md p-2 w-[100px]"
          onClick={messageUserClicked}
        >
          Message User
        </button>
      </div>
    </div>
  );
}

export default Profile;
