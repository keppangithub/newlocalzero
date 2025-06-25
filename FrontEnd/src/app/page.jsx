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
  const [signupErrorMessage, setSignupErrorMessage] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  loginErrorMessage;

  // --------- user inputs: login ---------
  const [loginEmailText, setLoginEmailText] = useState("");
  const [loginPassText, setLoginPassText] = useState("");

  // --------- handling user moves ---------
  async function SignupClicked() {
    if (!signupEmailText || !signupPassText || !nameText || !locationText) {
      setSignupErrorMessage("Please fill in all of the fields to signup.");
    } else {
      const signupStatus = await auth.register(
        nameText,
        signupEmailText,
        signupPassText,
        locationText,
        selectedRole
      );
      if (signupStatus) {
        alert("Your signup was successful, you can now login.");
      } else {
        setSignupErrorMessage(
          "An Error occured while signing up, please make sure all input matches the criteria."
        );
      }
    }
  }
  async function loginClicked() {
    if (!loginEmailText || !loginPassText) {
      setLoginErrorMessage("Please fill in all of the fields to login.");
    } else {
      const loginStatus = await auth.login(loginEmailText, loginPassText);
      if (loginStatus === false) {
        setLoginErrorMessage("Could not login. Please try again.");
      } else {
        router.push(`/home`);
      }
    }
  }

  // --------- page body ---------
  return (
    <div className="max-w-screen">

      {/*Header with logo*/}
      <div className="sticky top-0 left-0 max-w-screen bg-gray-300 shadow-sm shadow-black/25">
        <div className="md:min-w-[80%] justify-self-center items-start">
          <img src="/logo.png" alt="LocalZero Logo" className="w-25 h-auto" />
        </div>
      </div>

      {/*large div containing signup + login */}
      <div className="flex flex-col md:flex-row max-w-screen overflow-x-hidden md:w-full h-fit md:min-h-screen bg-zinc-300 font-light text-sm">
        
        {/*Left/Upper Side: Signup */}
        <div className="md:w-[50%] h-fit min-h-screen flex bg-zinc-100 pt-20 items-top justify-center">
          <div className="space-y-4 w-[60%] h-[70%]">
            <p className="font-normal">Signup with a new account</p>

            <div className="space-y-2 w-full">
              <p>Full Name</p>
              <input
                type="text"
                value={nameText}
                onChange={(e) => setNameText(e.target.value)}
                className="rounded-sm border-1 p-2 focus:outline-0 w-full bg-white"
                placeholder="Mary Jane"
              ></input>
              <p>Email</p>
              <input
                type="text"
                value={signupEmailText}
                onChange={(e) => setSignupEmailText(e.target.value)}
                className="rounded-sm border-1 p-2 focus:outline-0 w-full bg-white"
                placeholder="email@example.com"
              ></input>
              <p>Password</p>
              <input
                type="password"
                value={signupPassText}
                onChange={(e) => setSignupPassText(e.target.value)}
                className="rounded-sm border-1 p-2 focus:outline-0 w-full bg-white"
                placeholder="••••••••"
              ></input>
              <p>Location</p>
              <select
                className="rounded-md border-1 p-2 focus:outline-0 w-full bg-white"
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
              <div className="space-x-1 font-light">
                <input
                  id="resident"
                  type="radio"
                  value="Resident"
                  name="userRole"
                  checked={selectedRole === "Resident"}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-4 h-4"
                />
                <label htmlFor="resident" className="ms-2 text-sm">
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
                <label htmlFor="organizer" className="ms-2 text-sm">
                  Community Organizer
                </label>
              </div>
            </div>

            <button
              className="text-white bg-lime-900 hover:bg-lime-950 rounded-md p-2 w-[100px]"
              onClick={SignupClicked}
            >
              Signup
            </button>

            <p className="text-red-700">{signupErrorMessage}</p>
          </div>
        </div>

        {/*Right Side: Login */}
        <div className="md:w-[50%] h-screen md:min-h-screen flex bg-gray-200 pt-20 items-top justify-center">
          <div className="space-y-4 w-[60%] h-[70%] ">
            <p className="font-normal">Login to your account</p>

            <div className="space-y-2 w-[90%]">
              <p>Email</p>
              <input
                type="text"
                value={loginEmailText}
                onChange={(e) => setLoginEmailText(e.target.value)}
                className="rounded-sm border-1 p-2 focus:outline-0 w-full bg-white"
                placeholder="email@example.com"
              ></input>
              <p>Password</p>
              <input
                type="password"
                value={loginPassText}
                onChange={(e) => setLoginPassText(e.target.value)}
                className="rounded-sm border-1 p-2 focus:outline-0 w-full bg-white"
                placeholder="••••••••"
              ></input>
            </div>

            <button
              className="text-white bg-lime-900 hover:bg-lime-950 rounded-md p-2 w-[100px]"
              onClick={loginClicked}
            >
              Login
            </button>

            <p className="text-red-700">{loginErrorMessage}</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default LandingPage;
