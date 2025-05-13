"use client";
import React, { useRef, useState } from "react";

function Notification({ title, date, id }) {

  return (
    <div>
        <button className="border-2 bg-white border-neutral-200 hover:bg-gray-100 rounded-md p-2 w-full justify-items-start">
            <p className="text-md">{title}</p>
            <p className="text-xs">{date}</p>
          </button>
    </div>
  );
}

export default Notification;
