"use client";
import React, { useRef, useState } from "react";
import Sidebar from "../../components/sidebar";
import CommentBox from "../../components/commentBox";
import { useRouter, useSearchParams } from "next/navigation";

function InitiativeView() {
  const [updateText, setUpdateTExt] = useState("");
  const [commentText, setComment] = useState("");
  const [commentImageURL, setCommentImageURL] = useState("");

  const params = useSearchParams();
  const id = params.get("id");

  // test data -> ska hämtas från APIn med hjälp av id istället
  const allComments = [];
  allComments[0] = {
    content: "nice event",
    date: "2025-05-13",
    commenterName: "Olivia",
    commenterID: "6374638",
    imageURL: null,
    id: "c01",
  };
  allComments[1] = {
    content: "djur",
    date: "2025-05-13",
    commenterName: "Kevin",
    commenterID: "6374639",
    imageURL: null,
    id: "c02",
  };
  allComments[2] = {
    content: "woooow what the frick dude",
    date: "2025-05-13",
    commenterName: "Mojtaba",
    commenterID: "6374640",
    imageURL:
      "https://i.pinimg.com/736x/92/92/4d/92924d2c715737c18b1ea1c20612daf8.jpg",
    id: "c03",
  };
  allComments[3] = {
    content: "long live poland",
    date: "2025-05-13",
    commenterName: "Aleks",
    commenterID: "6374641",
    imageURL: null,
    id: "c04",
  };

  const title = "Event Title";
  const caption =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const startDate = "2025-05-13";
  const endDate = "2025-05-15";
  const location = "Malmö";
  const category = "Life on Earth";
  const posterUsername = "Ranaciita";
  const posterID = "25637467";
  const imageURL =
    "https://media.istockphoto.com/id/1402088366/photo/an-unrecognizable-woman-holds-a-plastic-garbage-bottle.jpg?s=612x612&w=0&k=20&c=yY93Gk_Jk2uZXCHmemCtsw_3ZdIo8UgU1PwWffxGopk=";
  // END OF TEST DATA

  const router = useRouter();

  const posterProfileClicked = () => {
    router.push(`/profile?id=${posterID}`);
  };

  const joinClicked = () => {
    //TODO: skicka API request för att joina initiativet
    alert("joining initiative");
  };

  const postComment = () => {
    //TODO: skicka API request för att lägga upp kommentaret + ladda om sidan

    if (commentText || commentImageURL) {
      alert("posting comment: " + commentText);
    } else {
      alert("comment cannot be empty");
    }
  };

  const updateInitiative = () => {
    //TODO: skicka api
    alert("posting update: " + updateText);
  };

  const renderUpdateField = () => {
    // TODO: if poster id = egen id
    if (true) {
      return (
        <div className="space-y-2">
          <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <p className="text-md">Poster View: </p>
          <input
            type="text"
            value={updateText}
            onChange={(POST) => setUpdateTExt(POST.target.value)}
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
    return allComments.map((comment, commentIndex) => (
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
          <p className="text-2xl">{title}</p>
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
            {posterUsername}
          </button>
        </p>
        <p className="text-md">
          Date: {startDate} - {endDate}
        </p>
        <p className="text-md">Location: {location}</p>
        <p className="text-md">Category / Sustainability goal: {category}</p>

        <div className="bg-gray-100 mt-6 p-4 rounded">
          <p>{caption}</p>
        </div>

        <div className="bg-gray-100 mt-6 p-4 rounded">
          <img src={imageURL}></img>
        </div>

        <div>
          {renderUpdateField()}
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
