"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import auth from "../services/auth";

function SideBar() {
  const router = useRouter();

  const homeClicked = () => {
    router.push("/home");
  };

  const myProfileClicked = () => {
    router.push("/profile");
  };

  const newInitClicked = () => {
    router.push("/new_initiative");
  };

  const myActionsClicked = () => {
    router.push("/my_actions");
  };

  const newActionClicked = () => {
    router.push("/new_action");
  };

  const inboxClicked = () => {
    router.push("/inbox");
  };

  async function logoutClicked() {
    const logoutRequest = auth.logout();
    router.push("/");
  };

  return (
    <div className="">
      <div className="w-full flex flex-row md:flex-col text-xs md:text-sm md:h-screen">
        <button
          className=" bg-white hover:bg-gray-500 rounded-md p-1 md:p-2 w-[90%] mx-1 my-1 md:mt-5"
          onClick={homeClicked}
        >
          Home
        </button>

        <button
          className=" bg-white hover:bg-gray-500 rounded-md p-1 md:p-2 w-[90%] mx-1 my-1"
          onClick={myProfileClicked}
        >
          My Profile
        </button>

        <button
          className=" bg-white hover:bg-gray-500 rounded-md p-1 md:p-2 w-[90%] mx-1 my-1"
          onClick={newInitClicked}
        >
          + New Initiative
        </button>

        <button
          className=" bg-white hover:bg-gray-500 rounded-md p-1 md:p-2 w-[90%] mx-1 my-1"
          onClick={myActionsClicked}
        >
          My Actions
        </button>

        <button
          className=" bg-white hover:bg-gray-500 rounded-md p-1 md:p-2 w-[90%] mx-1 my-1"
          onClick={newActionClicked}
        >
          + New Action
        </button>

        <button
          className=" bg-white hover:bg-gray-500 rounded-md p-1 md:p-2 w-[90%] mx-1 my-1"
          onClick={inboxClicked}
        >
          Inbox
        </button>

        <button
          className=" bg-white hover:bg-gray-500 rounded-md p-1 md:p-2 w-[90%] mx-1 my-1"
          onClick={logoutClicked}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;
