"use client";
import React, { useRef, useState } from "react";
import SideBar from "../../components/sidebar";
import ActionBox from "../../components/actionBox";

function MyActions() {

  const carbonWins = 135;
  const kmBiked = 30;
  const publicTransport = 28;
  const itemsThrifted = 12;
  const trashPickedUp = 3;

  return (
    <div className="flex min-w-screen max-w-screen min-h-screen max-h-screen bg-zinc-white font-light text-sm">
      <div className="bg-gray-300 w-[10%]">
        <SideBar />
      </div>

      <div className="w-[45%] p-8">
        <p className="text-xl">My Actions</p>
        <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div
          className="w-[95%] h-[90%] justify-self-center space-y-2 overflow-y-scroll pr-1
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-white
        dark:[&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          <ActionBox/><ActionBox/><ActionBox/><ActionBox/><ActionBox/><ActionBox/><ActionBox/>
          <ActionBox/><ActionBox/><ActionBox/><ActionBox/><ActionBox/><ActionBox/>
        </div>

      </div>

      <div className="w-[45%] p-20 h-[70%] text-md">
        <p className="text-xl">Statistics</p>
        <p>Total carbon wins: {carbonWins} kg</p>
        <br/>
        <p>Kilometers biked: {kmBiked} </p>
        <p>Public transport taken: {publicTransport} instances</p>
        <p>Items thrifted: {itemsThrifted}</p>
        <p>Bags of trash picked up: {trashPickedUp}</p>

      </div>
    </div>
  );
}

export default MyActions;
