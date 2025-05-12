"use client";
import React, { useRef, useState } from "react";

function LandingPage() {
  // variables for signup fields
  const [signupEmailText, setSignupEmailText] = useState("");
  const [signupPassText, setSignupPassText] = useState("");
  const [nameText, setNameText] = useState("");
  const [locationText, setLocationText] = useState("");
  const [selectedRole, setSelectedRole] = useState("Resident");

  // variables for login fields
  const [loginEmailText, setLoginEmailText] = useState("");
  const [loginPassText, setLoginPassText] = useState("");

  // method called when signup is clicked
  async function SignupClicked() {
    if (!signupEmailText || !signupPassText || !nameText || !locationText) {
      alert("Please fill in all the fields to register!");
    } else {
    }
  }

  // method called when login is clicked
  async function loginClicked() {
    if (!loginEmailText || !loginPassText) {
      alert("Please fill in email/password to login!");
    } else {
    }
  }

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
            <input
              type="text"
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
              className="rounded-sm border-2 p-2 focus:outline-0 w-full"
              placeholder="Malmö, Sweden"
            ></input>
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
