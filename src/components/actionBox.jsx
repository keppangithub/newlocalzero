"use client";
import React, { useRef, useState } from "react";

function ActionBox() {

  const title = "Biking";
  const metric = "5 km";
  const date = "2025-05-09";

  return (
    <div>
        <button className="border-2 bg-white border-neutral-200 hover:bg-gray-100 rounded-md p-2 w-full justify-items-start">
            <p className="text-lg">Type: {title}</p>
            <p className="text-md">{metric}</p>
            <p className="text-md">{date}</p>
          </button>
    </div>
  );
}

export default ActionBox;
