import axios from "axios";

let currentUser;
const port = "localhost:8080";

async function login(email, password) {
  try {
    const response = await axios.post(port + "/auth/login", {
      email,
      password,
    });

    if (response) {
      currentUser = {
        id: response.data[0],
        username: response.data[1],
        email: response.data[2],
        location: response.data[3],
        userRole: response.data[4],
      };
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
}

async function register(name, email, password, location, role) {
  try {
    const response = await axios.post(port + "/auth/register", {
      name,
      email,
      password,
      location,
      role,
    });

    return response.data;
  } catch (error) {
    console.error("Signup failed:", error);
    if (error.response && error.response.data) {
      return error.response.data;
    }
  }
}

function logout() {
  currentUser = null;
}

function getCurrentUser() {
  return currentUser;

  /* TEST DATA
  return {
    id: "123456",
    username: "Ranaciita",
    location: "Malmö",
    role: "Community Organizer",
  };

   */
}

export default {
  login,
  logout,
  getCurrentUser,
  register,
};
