"use client";
import React, { useRef, useState } from "react";
import auth from "../services/auth";
import { useRouter } from "next/navigation";

function LandingPage() {
  const router = useRouter();

  // --------- user inputs: signup/register ---------
  const [signupEmailText, setSignupEmailText] = useState("");
  const [signupPassText, setSignupPassText] = useState("");
  const [nameText, setNameText] = useState("");
  const [locationText, setLocationText] = useState("");
  const [selectedRole, setSelectedRole] = useState("Resident");

  // --------- user inputs: login ---------
  const [loginEmailText, setLoginEmailText] = useState("");
  const [loginPassText, setLoginPassText] = useState("");

  // --------- handling user moves ---------
  async function SignupClicked() {
    if (!signupEmailText || !signupPassText || !nameText || !locationText) {
      alert("Please fill in all the fields to register!");
    } else {
      const signupStatus = await auth.register(
        nameText,
        signupEmailText,
        signupPassText,
        locationText,
        selectedRole
      );
      if (signupStatus) {
        alert("signup successful");
      } else {
        alert("signup failed");
      }
    }
  }
  async function loginClicked() {
    if (!loginEmailText || !loginPassText) {
      alert("Please fill in email/password to login!");
    } else {
      const loginStatus = await auth.login(loginEmailText, loginPassText);
      if (loginStatus === false) {
        alert("Could not login. Please try again.");
      } else {
        router.push(`/home`);
      }
    }
  }

  // --------- page body ---------
  return (
    <div className="flex w-screen min-h-screen bg-zinc-300 font-light text-sm">
      {/*Left Side: Signup */}
      <div className="min-w-[50%] min-h-screen flex bg-zinc-100 items-center justify-center">
        <div className="space-y-4 w-[60%] h-[70%]">
          <p>Signup with a new account</p>

          <div className="space-y-2 w-[90%]">
            <p>Full Name</p>
            <input
              type="text"
              value={nameText}
              onChange={(e) => setNameText(e.target.value)}
              className="rounded-sm border-2 p-2 focus:outline-0 w-full"
              placeholder="Mary Jane"
            ></input>
            <p>Email</p>
            <input
              type="text"
              value={signupEmailText}
              onChange={(e) => setSignupEmailText(e.target.value)}
              className="rounded-sm border-2 p-2 focus:outline-0 w-full"
              placeholder="email@example.com"
            ></input>
            <p>Password</p>
            <input
              type="password"
              value={signupPassText}
              onChange={(e) => setSignupPassText(e.target.value)}
              className="rounded-sm border-2 p-2 focus:outline-0 w-full"
              placeholder="••••••••"
            ></input>
            <p>Location</p>
            <select
              className="rounded-md border-2 p-2 focus:outline-0 w-full"
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
            >
              <option value="" disabled>
                Select a location
              </option>
              <option value="Malmö">Malmö</option>
              <option value="Trelleborg">Trelleborg</option>
              <option value="Lund">Lund</option>
              <option value="Helsingborg">Helsingborg</option>
              <option value="Perstorp">Perstorp</option>
            </select>
          </div>

          {/*Role selection */}
          <div>
            <div className="space-x-1">
              <input
                id="resident"
                type="radio"
                value="Resident"
                name="userRole"
                checked={selectedRole === "Resident"}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-4 h-4"
              />
              <label htmlFor="resident" className="ms-2 text-sm font-medium">
                Resident
              </label>
            </div>

            <div className="space-x-1">
              <input
                id="organizer"
                type="radio"
                value="Organizer"
                name="userRole"
                checked={selectedRole === "Organizer"}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-4 h-4"
              />
              <label htmlFor="organizer" className="ms-2 text-sm font-medium">
                Community Organizer
              </label>
            </div>
          </div>

          <button
            className="text-white bg-gray-700 hover:bg-gray-800 rounded-md p-2 w-[100px]"
            onClick={SignupClicked}
          >
            Signup
          </button>
        </div>
      </div>

      {/*Right Side: Login */}
      <div className="min-w-[50%] min-h-screen flex bg-white items-center justify-center">
        <div className="space-y-4 w-[60%] h-[70%] ">
          <p>Login to your account</p>

          <div className="space-y-2 w-[90%]">
            <p>Email</p>
            <input
              type="text"
              value={loginEmailText}
              onChange={(e) => setLoginEmailText(e.target.value)}
              className="rounded-sm border-2 p-2 focus:outline-0 w-full"
              placeholder="email@example.com"
            ></input>
            <p>Password</p>
            <input
              type="password"
              value={loginPassText}
              onChange={(e) => setLoginPassText(e.target.value)}
              className="rounded-sm border-2 p-2 focus:outline-0 w-full"
              placeholder="••••••••"
            ></input>
          </div>

          <button
            className="text-white bg-gray-700 hover:bg-gray-800 rounded-md p-2 w-[100px]"
            onClick={loginClicked}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
