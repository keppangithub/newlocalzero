"use client";
import React, { useRef, useState } from "react";

function Initiative() {

  return (
    <div>
        <button className="border-2 bg-white border-neutral-200 hover:bg-gray-100 rounded-md p-2 w-full justify-items-start">
            <p className="text-lg">Initiative Title</p>
            <p className="text-md">Initiative caption</p>
          </button>
    </div>
  );
}

export default Initiative;
