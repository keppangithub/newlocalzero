"use client";
import React, { useRef, useState } from "react";
import Sidebar from "../components/sidebar";
import { useRouter, useSearchParams } from "next/navigation";

function CommentBox({ content, commenterName, posterID, date }) {
  const router = useRouter();

  const posterProfileClicked = () => {
    router.push(`/profile?id=${posterID}`);
  };

  return (
    <div className="bg-gray-100 mt-6 p-4 rounded w-full">
      <div className="flex justify-between mb-2">
        <div>
          <button
            onClick={posterProfileClicked}
            className="font-bold text-blue-600 hover:text-blue-800"
          >
            {commenterName}
          </button>
        </div>

        <div>
          <p>{date}</p>
        </div>
      </div>

      <div>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default CommentBox;
