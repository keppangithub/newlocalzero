"use client";
import React, { useRef, useState } from "react";

function ActionBox({ type, title, metric, date }) {
  return (
    <div>
      <button className="border-2 bg-white border-neutral-200 hover:bg-gray-100 rounded-md p-2 w-full justify-items-start">
        <p className="text-lg">{title}</p>
        <p className="text-md">Type: {type}</p>
        <p className="text-md">{metric}</p>
        <p className="text-md">{date}</p>
      </button>
    </div>
  );
}

export default ActionBox;
