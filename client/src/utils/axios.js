import axios from "axios";

const instance = axios.create({
  baseURL: "https://paradise-backend-fkix.onrender.com/api"
});

export default instance;
