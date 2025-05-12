"use client";
import React, { useRef, useState } from "react";
import Sidebar from "../../components/sidebar";
import CommentBox from "../../components/commentBox";

function InitiativeView() {
  const [commentText, setComment] = useState("");

  return (
    <div className="flex min-w-screen max-w-screen min-h-screen max-h-screen bg-zinc-100 font-light text-sm">
      <div className="bg-gray-300 w-[10%]">
        <Sidebar />
      </div>

      <div className="pl-[3%] pt-[5%] pr-[7.5%] bg-white border-r-2 border-black w-[45%]">
        <div className="flex items-center gap-4">
          <p className="text-2xl">Initiative Title</p>
          <button className="bg-gray-200 text-black text-xs px-4 py-2 rounded hover:bg-gray-400">
            + Join
          </button>
        </div>
        <p className="text-md">Posted by user: [user]</p>
        <p className="text-md">Date: yy/mm/dd - yy/mm/dd</p>
        <p className="text-md">Location: Malmö, Sweden</p>
        <p className="text-md">Category/ Sustainability goal: </p>

        <div className="bg-gray-100 mt-6 p-4 rounded">
          <p>[caption]</p>
        </div>

        <div className="bg-gray-100 mt-6 p-4 rounded">
          <image>[IMAGE]</image>
        </div>
      </div>

      <div className="pl-[3%] pt-[5%] pr-[7.5%] bg-white border-r-2 border-black w-[45%] ">
        <p className="text-2xl">Comments</p>
        <div className="bg-gray-100 mt-6 p-4 rounded">
          <input
            type="text"
            value={commentText}
            onChange={(POST) => setComment(POST.target.value)}
            placeholder="Leave a comment"
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 "
          />
          <div className="pt-5">
            <button className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-400">
              POST
            </button>
          </div>
        </div>

        <div className="overflow-y-scroll pr-1 h-[73%]
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-white
        dark:[&::-webkit-scrollbar-thumb]:bg-gray-300">
           <CommentBox/>
        <CommentBox/>
        <CommentBox/>
        <CommentBox/>
        <CommentBox/>
        <CommentBox/>
        <CommentBox/>
        <CommentBox/>
        <CommentBox/>
        <CommentBox/>
        <CommentBox/>
        <CommentBox/>
        <CommentBox/>

        </div>
        
       
      </div>
    </div>
  );
}

export default InitiativeView;
