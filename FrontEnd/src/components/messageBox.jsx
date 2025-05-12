"use client";
import React, { useRef, useState } from "react";

function MessageBox() {
  return (
    <div className="flex justify-between mb-2 bg-white p-5 rounded-md">
      <div className="justify-items-start">
            <div>
            <p>[username]</p>
            </div>

            <div className="pt-2">
            <p>[message]</p>
            </div>
      </div>

      <div className="">
        <p>date: yy/mm/dd</p>
      </div>

    </div>
  );
}

export default MessageBox;
