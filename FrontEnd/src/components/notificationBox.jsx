"use client";
import React, { useRef, useState } from "react";

function Notification() {

  return (
    <div>
        <button className="border-2 bg-white border-neutral-200 hover:bg-gray-100 rounded-md p-2 w-full justify-items-start">
            <p className="text-md">Notification caption</p>
            <p className="text-xs">yyyy-mm-dd</p>
          </button>
    </div>
  );
}

export default Notification;
