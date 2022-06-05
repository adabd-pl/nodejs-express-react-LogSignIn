import axios from "axios";

const API_URL = "http://localhost:5000/api/api/auth/";

const register = (username, email, password  ,age , location, sex ,sexpreference) => {
  console.log(sexpreference)
  console.log(sex)
  return axios.post(API_URL + "signup", null, { params : {
    name: username,
    email: email,
    password: password,
    age: age , 
    location: location, 
    sex: sex,
    sexPreference: sexpreference ||  "notWorking" }
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin/" + username + "/" + password  ,/*{ headers: {
      'Content-Type': 'application/json'
      }}*/)
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
