import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "users", { headers: authHeader() });
};

const getUserBoard = () => {
  return axios.get(API_URL + "users", { headers: authHeader() });
};



const userService = {
  getPublicContent,
  getUserBoard,
};

export default userService