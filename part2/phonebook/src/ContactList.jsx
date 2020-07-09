import React from "react";

const ContactList = ({
  searchText,
  persons,
  handleContactUpdate,
  handleContactDelete,
}) => {
  // console.log(persons);

  const filterContacts = (searchTerm) => {
    // if name matches, return contact with that name OR if number matches, return contact with that number
    let filteredContacts = persons
      .filter((person) =>
        person.name?.toLowerCase().includes(searchTerm.trim())
          ? person.name.toLowerCase().includes(searchTerm.trim())
          : null || person.number.toLowerCase().includes(searchTerm.trim())
          ? person.number.toLowerCase().includes(searchTerm.trim())
          : null
      )
      .map((person) => (
        <li key={person.id}>
          {person.name}: {person.number} <br />
          <button
            className="update-btn"
            onClick={() => handleContactUpdate(person)}
          >
            Update
          </button>
          <button
            className="delete-btn"
            onClick={() => {
              handleContactDelete(person);
            }}
          >
            Delete
          </button>
        </li>
      ));

    return filteredContacts;
  };

  return (
    <>
      <h2>Contacts</h2>
      <ul id="contacts-list">{filterContacts(searchText)}</ul>
    </>
  );
};

export default ContactList;
