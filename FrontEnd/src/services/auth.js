import axios from "axios";

let currentUser; //saves current logged in users id

// login method, returns true/false, saves logged-in user's email
async function login(email, password) {
  try {
    //TODO - uppdatera endpoint path
    const response = await axios.post("/auth/login", {
      email,
      password,
    });

    //TODO: se till att ett user objekt skickas som innehåller:
    // userID
    // users name
    // user email
    // usr location
    // user role
    if (response) {
      currentUser = response.userID;
      return true;
    } else {
      return false;
    }
    
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
}

// signup method, returns true/false
async function register(name, email, password, location, role) {
  //alert("stack reached register body");

  try {
    //TODO - uppdatera endpoint path
    const response = await axios.post("/auth/register", {
      name,
      email,
      password,
      location,
      role,
    });

    //TODO - kolla vad som ska returneras istället för "data"
    // ska vara en string som informerar om signup var successful/unsuccessful och varför
    return response.data;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
}

// logs out, resets the logged-in user object
function logout() {
  currentUser = null;
}

// returns the logged-in user object
function getCurrentUser() {
  //return currentUser;

  return {
    id : "123456",
    username : "Ranaciita",
    location: "Malmö",
    role: "Community Organizer"
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  register,
};
