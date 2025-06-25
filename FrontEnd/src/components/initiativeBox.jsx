"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

function Initiative({ title, caption, id }) {
  const router = useRouter();

  const initClicked = () => {
    router.push(`/initiative_view?id=${id}`);
  };

  return (
    <div>
      <button className="border-2 bg-white border-neutral-200 hover:bg-gray-100 rounded-md p-2 w-full text-left"
      onClick={initClicked}>
        <p className="text-lg">{title}</p>
        <p className="text-md">{caption}</p>
      </button>
    </div>
  );
}

export default Initiative;
