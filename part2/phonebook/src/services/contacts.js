import axios from "axios";

// const baseURL = "http://localhost:3001/api/persons";
const baseURL = "/api/persons";

const getAllContacts = async () => {
  const request = axios.get(baseURL);
  const response = await request;
  return response.data;
};

const addContact = async (newContact) => {
  const request = axios.post(baseURL, newContact);
  const response = await request;
  return response.data;
};

const updateContact = async (id, updatedContactObj) => {
  const request = axios.patch(`${baseURL}/${id}`, updatedContactObj);
  const response = await request;
  return response.data;
};

const replaceContact = async (id, replaceContactObj) => {
  const request = axios.put(`${baseURL}/${id}`, replaceContactObj);
  const response = await request;
  return response.data;
};

const deleteContact = async (id) => {
  if (id) {
    const request = axios.delete(`${baseURL}/${id}`);
    const response = await request;
    return response.data;
  }
};

export default {
  getAllContacts,
  addContact,
  updateContact,
  replaceContact,
  deleteContact,
};
