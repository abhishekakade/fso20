import React from "react";

const AddContactForm = ({
  handleAddContact,
  newName,
  handleTextInput,
  newNumber,
  handleNumberInput,
}) => {
  return (
    <form onSubmit={(e) => handleAddContact(e)}>
      <div>
        <input
          type="text"
          value={newName}
          onChange={handleTextInput}
          placeholder="Add contact's name..."
          aria-label="Add contact's name"
        />

        <input
          type="tel"
          value={newNumber}
          onChange={handleNumberInput}
          placeholder="Add contact's number..."
          aria-label="Add contact's number"
        />
      </div>
      <div>
        <button id="add-contact" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddContactForm;
