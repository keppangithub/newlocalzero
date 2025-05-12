"use client";
import React, { useRef, useState } from "react";
import Sidebar from "../components/sidebar";

function CommentBox() {

  return (
    <div className="bg-gray-100 mt-6 p-4 rounded w-full">
          <div className="flex justify-between mb-2">
            
            <div>
              <p>[username]</p>
            </div>
            
            <div>
              <p>date: yy/mm/dd</p>
            </div>
          </div>

          <div>
            <p>[comment]</p>
          </div>
          
        </div>
  );
}

export default CommentBox;


