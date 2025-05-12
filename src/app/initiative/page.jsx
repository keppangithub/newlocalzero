"use client";
import React, { useRef, useState } from "react";
import SideBar from "../../components/sidebar";

function InitiativeView() {
  
    return (
      <div className="flex min-w-screen max-w-screen min-h-screen max-h-screen bg-zinc-800 font-light text-sm">
        <div className="bg-gray-300 w-[10%]">
          <SideBar />
        </div>

      </div>
    );
  }
  
  export default InitiativeView;
  