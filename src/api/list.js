import axios from "./axios";

export const getListsRequest = () => axios.get("/lists");

export const getListRequest =  (id) => axios.get(`/lists/${id}`);

export const createListRequest = (list) => axios.post("/lists", list);

export const updateListRequest = (id, list) => axios.put(`lists/${id}`, list);

export const deleteListRequest = (id) => axios.delete(`lists/${id}`);
