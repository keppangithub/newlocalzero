"use client";
import React, { useRef, useState } from "react";

function InboxItem({name}) {

  return (
    <div>
        <button className="bg-gray-100 mt-6 p-5 rounded w-full justify-items-start
        hover:bg-gray-300">
          <p>{name}</p>
        </button>
    </div>
  );
}

export default InboxItem;
