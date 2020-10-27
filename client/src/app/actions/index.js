import axios from 'axios';

import { Config } from '../config/config';
const configFormData = {     
    headers: { 'content-type': 'multipart/form-data' }
}
axios.defaults.baseURL = Config.api_url;

export const register = (userData) => {
    return axios.post("/auth/registerUser", userData);
}

export const login = (userData) => {
    return axios.post("/auth/login", userData);
}

export const logout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("isLogin");

    window.location = "/";
}

export const allUsers = () => {
    return axios.post("/user/allUsers");
}

export const addUser = (userData) => {
    return axios.post("/user/addUser", userData);
}

export const updateUser = (userData) => {
    return axios.post("/user/updateUser", userData);
}

export const updateRealUser = (userData) => {
    return axios.post("/user/updateRealUser", userData);
}

export const updateUserOneItem = (userData) => {
    return axios.post("/user/updateUserOneItem", userData);
}

export const deleteUser = (id) => {
    return axios.delete(`/user/deleteUser/${id}`);
}

export const allActivities = () => {
    return axios.post("/activity/allActivities");
}

export const allShortCuts = () => {
    return axios.post("/shortcut/allShortCuts");
}

export const addShortCut = (shortcut) => {
    return axios.post("/shortcut/addShortCut", shortcut);
}

export const updateShortCut = (shortcut) => {
    return axios.post("/shortcut/updateShortCut", shortcut);
}

export const deleteShortCut = (id) => {
    return axios.delete(`/shortcut/deleteShortCut/${id}`);
}

export const fileUpload = (files) => {
    return axios.post("/upload/fileUpload", files, configFormData);
}

export const updatePageLink = (pageIndex, content) => {
    return axios.post("/pageLink/updatePageLink", {pageIndex: pageIndex, content: content});
}

export const allPageLinks = () => {
    return axios.post("/pageLink/allPageLinks");
}

export const updateAdmin = (adminObj) => {
    return axios.post("/auth/updateAdmin", adminObj, configFormData);
}

export const updateAdminAvatar = (adminObj) => {
    return axios.post("/upload/updateAdminAvatar", adminObj, configFormData);
}

export const updateBannerImage = (bannerObj) => {
    return axios.post("/upload/updateBannerImage", bannerObj, configFormData);
}

