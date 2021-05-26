import axios from "axios";
import config from "../config";

// const https = require('https');
//
// const agent = new https.Agent({
//     rejectUnauthorized: false,
// });

const instance = axios.create({
  baseURL: config.WS_BASE_URL,
});

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? token : "";
  config.headers.ContentType = "application/json";
  return config;
});

export const getAll = async () => await instance.post("users/all");

export const getAllBlogs = async () => await instance.get("blogs");

export const register = async (name, email, password, phone, agency, role) =>
  await instance.post("admin/register", { name, email, password, role });

export const confirmRegister = async (id) =>
  await instance.post(`users/confirm/${id}`);

export const forgotPassword = async (email) =>
  await instance.post("users/forgotpassword", { email });

export const confirmReset = async (id, password) =>
  await instance.post(`users/resetpass/${id}`, { password });

export const login = async (email, password) =>
  await instance.post("admin/login", { email, password });

export const logout = async (token) =>
  await instance.post("users/logout", { token });

export const edit = async (userID, name, email) =>
  await instance.post("/users/edit", { userID, name, email });

export const getBlog = async (blogId) => await instance.get(`/blogs/${blogId}`);

export const editBlog = async (blogId, title, body) =>
  await instance.put(`/blogs/${blogId}`, { title, body });

  export const deleteBlogReq = async (blogId) =>
  await instance.delete(`/blogs/${blogId}`);

export const postBlog = async (title, body, image) =>
  await instance.post(`/blogs`, { title, body, image });

export const addImageToBlog = async (blogId, file) =>
  await instance.post("/blogs/image", { blogId, file });

export const profilePic = async (file) => {
  var formData = new FormData();
  formData.append("file", file);
  console.log(file);
  await axios.post(
    config.WS_BASE_URL + "profile",
    {
      headers: {
        "Content-Type": "multipart/form-data",
        token: localStorage.getItem("token"),
      },
    },
    formData
  );
};
