"use client";
import React, { useMemo, useEffect, useState } from "react";
import SideBar from "../../components/sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import auth from "../../services/auth";
import profile from "../../services/profile";
import inbox from "../../services/inbox";

function Profile() {
  const router = useRouter();

  // --------- extracting profile id from URL ---------
  const params = useSearchParams();
  const profileID = params.get("id");

  // --------- loading page data ---------
  const currentUser = useMemo(() => auth.getCurrentUser(), []);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadProfileData() {
      try {
        if (currentUser.id === profileID || !profileID) {
          setUserName(currentUser.username);
          setUserRole(currentUser.role);
        } else {
          const data = await profile.getProfile(profileID);
          setUserName(data.username);
          setUserRole(data.role);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfileData();
  }, [currentUser.id, profileID]);

  // --------- message button shows only on others profile ---------
  const renderMessageButton = () => {
    if (profileID && currentUser.id !== profileID) {
      return (
        <button
          className="text-white bg-gray-700 hover:bg-gray-800 rounded-md p-2 w-[100px]"
          onClick={messageUserClicked}
        >
          Message User
        </button>
      );
    }
  };

  // --------- handling user moves ---------
  async function messageUserClicked() {
    const openChat = await inbox.startChat(currentUser.id, profileID);
    if (openChat){
      router.push("/inbox");
    }else{
      alert("Failed to start chat with user.");
    }
  }

  // --------- page body ---------
  return (
    <div className="flex min-w-screen max-w-screen min-h-screen max-h-screen bg-white font-light text-sm">
      <div className="bg-gray-300 w-[10%]">
        <SideBar />
      </div>

      <div className="p-10 w-[50%] space-y-3">
        <p className="text-xl">{userName}</p>
        <hr className="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <p className="text-md">Role: {userRole}</p>
        <div>{renderMessageButton()}</div>
      </div>
    </div>
  );
}

export default Profile;
