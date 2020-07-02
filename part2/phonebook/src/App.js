import React, { useState } from "react";
import "./App.css";
import Search from "./Search";
import AddContactForm from "./AddContactForm";
import ContactList from "./ContactList";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleTextInput = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberInput = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const handleSearchText = (event) => {
    // console.log(event.target.value);
    setSearchText(event.target.value.toLowerCase());
  };

  const handleAddContact = (event) => {
    event.preventDefault();

    const newContactObj = {
      name: newName.trim(),
      number: newNumber.trim(),
    };
    for (let person of persons) {
      if (
        person.name.toLowerCase().trim() === newContactObj.name.toLowerCase()
      ) {
        alert(
          `Contact with the name "${newContactObj.name}" has already been added to the phonebook!`
        );
        return null;
      } else if (person.number?.trim() === newContactObj.number) {
        alert(`This number has already been registered in your phonebook!`);
        return null;
      } else if (newContactObj.name === "" || newContactObj.number === "") {
        alert(`Contact details cannot be empty!`);
        return null;
      }
    }
    // concat to avoid direct state update
    setPersons(persons.concat(newContactObj));
    // to clear the input field after adding new contact name
    setNewName("");
    setNewNumber("");
  };

  return (
    <div className="App">
      <h1>Phonebook</h1>

      <AddContactForm
        handleAddContact={handleAddContact}
        newName={newName}
        handleTextInput={handleTextInput}
        newNumber={newNumber}
        handleNumberInput={handleNumberInput}
      />
      <Search searchText={searchText} handleSearchText={handleSearchText} />

      <ContactList searchText={searchText} persons={persons} />
    </div>
  );
};

export default App;
