import { React, useEffect, useState } from "react";
import ContactForm from "./Components/ContactForm/ContactForm";
import ContactList from "./Components/ContactList/ContactList";
import Filter from "./Components/Filter/Filter";
import nextId from "react-id-generator";
import Container from "./Components/Utils/Container/Container";
import Title from "./Components/Utils/Title/Title";

function App() {
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
    if (contacts.length === 0) {
      localStorage.removeItem("contacts");
    }
  }, [contacts]);

  const addContact = (data) => {
    const { name, number } = data;
    const id = nextId();
    const newContact = {
      name,
      id,
      number,
    };
    const checkOnSameContact = contacts.find(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (checkOnSameContact) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    if (name === "" && number === "") {
      return;
    }

    if (name === "" || number === "") {
      alert("Pleasy fill empty fields");
      return;
    } else {
      setContacts((prev) => [...prev, newContact]);
    }
  };
  const deleteContact = (contactId) => {
    setContacts((prev) => prev.filter((contact) => contactId !== contact.id));
  };
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
  };
  const filterByName = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <Container>
      <Title color="#424242" size={30} text="Phonebook" />
      <div
        style={{
          border: "1px solid gray",
          width: "fit-content",
          padding: "20px",
        }}
      >
        <ContactForm onSubmit={addContact} contacts={contacts} />
      </div>
      <Filter value={filter} onChange={handleFilterChange} />

      <Title marginT={40} size={20} text="Contacts" />

      <ContactList onDeleteContact={deleteContact} contacts={filterByName()} />
    </Container>
  );
}

export default App;
