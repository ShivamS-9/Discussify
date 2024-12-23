import axios from "axios";

const url = "http://localhost:5000/mySubGreddiit";
const url_ = "http://localhost:5000/profile";
export const fetchPosts = () => axios.get(url);
export const createPost = (postData) => axios.post(url, postData);

export const getUser = () => axios.get(url_);
//  _________________ ______________ ________________

const API = axios.create({ baseURL: "http://localhost:5000" });

export const login = (formData) => API.post("/home/login", formData);
export const register = (formData) => API.post("/home/register", formData);
