import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAllContacts = () => axios.get(baseURL);

const addContact = (newContact) => {
  return axios.post(baseURL, newContact);
};

const updateContact = (id, updatedContactObj) => {
  return axios.patch(`${baseURL}/${id}`, updatedContactObj);
};

const replaceContact = (id, replaceContactObj) => {
  return axios.put(`${baseURL}/${id}`, replaceContactObj);
};

const deleteContact = (id) => {
  alert(`Deleted ${id}!`);
  if (id) return axios.delete(`${baseURL}/${id}`);
};

export default {
  getAllContacts,
  addContact,
  updateContact,
  replaceContact,
  deleteContact,
};
