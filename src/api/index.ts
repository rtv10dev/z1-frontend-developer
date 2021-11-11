import axios from "axios";
const instance = axios.create({
  baseURL: "https://front-exercise.z1.digital",
});
export default instance;
