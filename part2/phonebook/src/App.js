import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./Search";
import AddContactForm from "./AddContactForm";
import ContactList from "./ContactList";
import contactOptions from "./services/contacts";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    // to prevent state update on unmounted component
    let isComponentMounted = true;

    contactOptions
      .getAllContacts()
      .then((response) =>
        isComponentMounted ? setPersons(response.data) : null
      );

    return () => (isComponentMounted = false);
  }, []);

  // commented out hard coded contacts after adding axios fetched contacts
  // const [persons, setPersons] = useState([
  //   { name: "Arto Hellas", number: "040-123456" },
  //   { name: "Ada Lovelace", number: "39-44-5323523" },
  //   { name: "Dan Abramov", number: "12-43-234345" },
  //   { name: "Mary Poppendieck", number: "39-23-6423122" },
  // ]);

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
      // json-server auto generates and sends ids in response object
      // so this is not really necessary but I used uuid anyway
      id: uuidv4(),
    };
    for (let person of persons) {
      if (person.number?.trim() === newContactObj.number) {
        alert(`This number has already been registered in your phonebook!`);
        return null;
      } else if (newContactObj.name === "" || newContactObj.number === "") {
        alert(`Contact details cannot be empty!`);
        return null;
      } else if (
        person.name.toLowerCase().trim() === newContactObj.name.toLowerCase()
      ) {
        if (
          window.confirm(
            `Contact with name "${newContactObj.name}" already exists in the phonebook! Replace the old number with this new one?`
          )
        ) {
          let existingPerson = person;
          return contactOptions
            .replaceContact(existingPerson.id, {
              ...person,
              number: newContactObj.number,
            })
            .then((response) => {
              setPersons(
                persons.map(
                  (person) =>
                    person.id !== existingPerson.id ? person : response.data
                  // person.name.toLowerCase().trim() !==
                  // newContactObj.name.toLowerCase().trim()
                )
              );
              setNewName("");
              setNewNumber("");
            });
        } else return null;
      }
    }
    // add contact to db.json
    contactOptions
      .addContact(newContactObj)
      .then((response) => {
        // console.log(response.data);
        setPersons(persons.concat(response.data));
      })
      .catch((err) => console.error(err));
    // concat to avoid direct state update
    // to clear the input field after adding new contact name
    setNewName("");
    setNewNumber("");
  };

  const handleContactUpdate = (contactToUpdate) => {
    if (window.confirm("Update this contact?")) {
      let updatedName =
        prompt("Update contact name.", contactToUpdate.name) ||
        contactToUpdate.name;
      let updatedNumber =
        prompt("Update contact number.", contactToUpdate.number) ||
        contactToUpdate.number;
      // to make sure fields are not empty
      if (updatedName.trim() && updatedNumber.trim()) {
        contactOptions
          .updateContact(contactToUpdate.id, {
            // id: person.id,
            name: updatedName.trim(),
            number: updatedNumber.trim(),
          })
          .then((response) =>
            setPersons(
              persons.map((person) =>
                // person.id === contactToUpdate.id ? response.data : person
                // same but more efficient
                person.id !== contactToUpdate.id ? person : response.data
              )
            )
          );
      }
    }
  };

  const handleContactDelete = (contactToDelete) => {
    if (window.confirm(`Delete ${contactToDelete.name}?`)) {
      contactOptions
        .deleteContact(contactToDelete.id)
        .then(() =>
          setPersons(
            persons.filter((person) => person.id !== contactToDelete.id)
          )
        );
    }
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

      <ContactList
        searchText={searchText}
        persons={persons}
        handleContactUpdate={handleContactUpdate}
        handleContactDelete={handleContactDelete}
      />
    </div>
  );
};

export default App;
