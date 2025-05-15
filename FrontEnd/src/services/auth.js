import axios from "axios";
//import { deleteCookie, getCookie, setCookie } from "cookies-next/client";
//import { TOKEN_KEY } from "@/constants";
//import { jwtDecode } from "jwt-decode";

let currentUser;

// login method, returns true/false, saves logged-in user's email
async function login(email, password) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.post("/api/auth/login", {
      email,
      password,
    });
    switch (response.data) {
      case "Login successful for user: " + email:
        currentUser = email;
        return true;
      default:
        return false;
    }
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

// signup method, returns true/false
async function register(name, email, password, location, role) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.post("/api/auth/register", {
      name,
      email,
      password,
      location,
      role,
    });
    switch (response.data) {
      //TODO - kolla vad som skickas tbx vid registrering 
      case "":
        return true;
      default:
        return false;
    }
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
}

// logs out, resets the logged-in user's email
function logout() {
  currentUser = null;
}

// returns the logged-in user's email
function getCurrentUser() {
  return currentUser;
}

export default {
  login,
  logout,
  getCurrentUser,
  register,
};
