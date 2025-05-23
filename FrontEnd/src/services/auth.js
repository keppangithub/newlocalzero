import axios from "axios";

let currentUser;
const port = "http://localhost:8080";

async function login(email, password) {
  try {
    const response = await axios.post(port + "/auth/login", {
      email,
      password,
    });

    if (response) {
      const user = {
        id: response.data[0],
        username: response.data[1],
        email: response.data[2],
        location: response.data[3],
        userRole: response.data[4],
      };
      localStorage.setItem("currentUser", JSON.stringify(user));
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

    if (response.data.success) {
      console.log("Registration successful!");
      return true;
    } else {
      console.log("Registration failed");
      return false;
    }
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
  
  const user = localStorage.getItem("currentUser");
  console.log("current user: " + user);
  return user ? JSON.parse(user) : null;
}

export default {
  login,
  logout,
  getCurrentUser,
  register,
};
