"use client";
import React, { useRef, useState } from "react";

function MessageBox({sender, messageText, date}) {
  return (
    <div className="flex justify-between mb-2 bg-white p-5 rounded-md">
      <div className="justify-items-start">
            <div>
            <p>{sender}</p>
            </div>

            <div className="pt-2">
            <p>{messageText}</p>
            </div>
      </div>

      <div className="">
        <p>{date}</p>
      </div>

    </div>
  );
}

export default MessageBox;
