"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import CommentBox from "../../components/commentBox";
import { useRouter, useSearchParams } from "next/navigation";
import initiative from "../../services/initiative";
import auth from "../../services/auth";

function InitiativeView() {
  const router = useRouter();
  const currentUser = useMemo(() => auth.getCurrentUser(), []);

  // --------- user inputs ---------
  const [updateText, setUpdateText] = useState("");
  const [commentText, setComment] = useState("");
  const [commentImageURL, setCommentImageURL] = useState("");

  // --------- extracting initiative id from URL ---------
  const params = useSearchParams();
  const initID = params.get("id");

  // --------- loading page data from backend ---------
  const [initiativeDetails, setInitiativeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadPageData() {
      try {
        const data = await initiative.getInitiative(initID);
        setInitiativeDetails(data);
      } catch (error) {
        console.error("Failed to load initiative:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPageData();
  }, [initID]);
  if (loading) return <p>Loading...</p>;
  if (!initiativeDetails) return <p>Error loading data.</p>;

  // --------- handling user moves ---------
  const posterProfileClicked = () => {
    router.push(`/profile?id=${initiativeDetails.posterID}`);
  };
  async function joinClicked() {
    const joiningInitiative = await initiative.joinInitiative(
      currentUser.id,
      initID
    );
  }
  async function postComment() {
    if (commentText || commentImageURL) {
      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0];
      const postingComment = await initiative.postInitiativeComment(
        initID,
        currentUser.id,
        commentText,
        formattedDate,
        commentImageURL
      );
      updateData();
    } else {
      alert("comment cannot be empty");
    }
  }
  async function updateInitiative() {
    if (updateText) {
      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0];
      const updateTextFormatted =
        "UPDATE (" + formattedDate + "): " + updateText;
      const postingUpdate = await initiative.updateInitiative(
        initID,
        updateTextFormatted
      );
      updateData();
    } else {
      alert("update cannot be empty");
      return;
    }
  }
  // Laddar om sidan
  async function updateData() {
    const data = await initiative.getInitiative(initID);
    setInitiativeDetails(data);
  }

  // --------- populating page with data ---------
  const renderUpdateField = () => {
    if (initiativeDetails.posterID === currentUser.id) {
      return (
        <div className="space-y-2">
          <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <p className="text-md">Poster View: </p>
          <input
            type="text"
            value={updateText}
            onChange={(POST) => setUpdateText(POST.target.value)}
            placeholder="Post an update for this initiative."
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 "
          />
          <button
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-400"
            onClick={updateInitiative}
          >
            ADD UPDATE
          </button>
        </div>
      );
    }
  };
  const renderComments = () => {
    return initiativeDetails.allComments.map((comment, commentIndex) => (
      <div key={commentIndex}>
        <CommentBox
          content={comment.content}
          commenterName={comment.commenterName}
          posterID={comment.commenterID}
          date={comment.date}
          imageURL={comment.imageURL}
        />
      </div>
    ));
  };

  // --------- page body ---------
  return (
    <div className="flex min-w-screen max-w-screen min-h-screen max-h-screen bg-zinc-100 font-light text-sm">
      <div className="bg-gray-300 w-[10%]">
        <Sidebar />
      </div>

      <div
        className="p-10 bg-white border-r-2 border-black w-[45%] overflow-y-scroll
      [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-white
        dark:[&::-webkit-scrollbar-thumb]:bg-gray-300"
      >
        <div className="flex items-center gap-4">
          <p className="text-2xl">{initiativeDetails.title}</p>
          <button
            className="bg-gray-200 text-black text-xs px-4 py-2 rounded hover:bg-gray-400"
            onClick={joinClicked}
          >
            + Join
          </button>
        </div>
        <p className="text-md">
          Posted by:{" "}
          <button
            onClick={posterProfileClicked}
            className="p-2 font-bold text-blue-600 hover:text-blue-800"
          >
            {initiativeDetails.posterUsername}
          </button>
        </p>
        <p className="text-md">
          Date: {initiativeDetails.startDate} - {initiativeDetails.endDate}
        </p>
        <p className="text-md">Location: {initiativeDetails.location}</p>
        <p className="text-md">
          Category / Sustainability goal: {initiativeDetails.category}
        </p>

        <div className="bg-gray-100 mt-6 p-4 rounded">
          <p>{initiativeDetails.description}</p>
        </div>

        <div className="bg-gray-100 mt-6 p-4 rounded">
          <img src={initiativeDetails.imageURL}></img>
        </div>

        <div>{renderUpdateField()}</div>
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
          <input
            type="text"
            value={commentImageURL}
            onChange={(POST) => setCommentImageURL(POST.target.value)}
            placeholder="image URL (optional)"
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 "
          />
          <div className="pt-5">
            <button
              className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-400"
              onClick={postComment}
            >
              POST
            </button>
          </div>
        </div>

        <div
          className="overflow-y-scroll pr-1 h-[55%]
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-white
        dark:[&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          {renderComments()}
        </div>
      </div>
    </div>
  );
}

export default InitiativeView;
