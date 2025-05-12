"use client";
import React, { useRef, useState } from "react";

function InboxItem() {

  const title = "Biking";
  const metric = "5 km";
  const date = "2025-05-09";

  return (
    <div>
        <button className="bg-gray-100 mt-6 p-5 rounded w-full justify-items-start">
          <p>[userName]</p>
        </button>
    </div>
  );
}

export default InboxItem;
