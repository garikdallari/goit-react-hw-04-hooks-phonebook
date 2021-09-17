import React, { Component } from "react";
import ContactForm from "./Components/ContactForm/ContactForm";
import ContactList from "./Components/ContactList/ContactList";
import Filter from "./Components/Filter/Filter";
import nextId from "react-id-generator";
import Container from "./Components/Utils/Container/Container";
import Title from "./Components/Utils/Title/Title";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const prevContacts = prevState.contacts;
    const nextContacts = this.state.contacts;

    if (prevContacts !== nextContacts) {
      localStorage.setItem("contacts", JSON.stringify(nextContacts));
    }
    if (nextContacts.length === 0) {
      localStorage.removeItem("contacts");
    }
  }

  addContact = (data) => {
    const { name, number } = data;
    const { contacts } = this.state;
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
      this.setState((prev) => ({
        contacts: [...prev.contacts, newContact],
      }));
    }
  };

  deleteContact = (contactId) => {
    this.setState((prev) => ({
      contacts: prev.contacts.filter((contact) => contactId !== contact.id),
    }));
  };

  handleFilterChange = (e) => {
    const target = e.target.value;
    this.setState({
      filter: target,
    });
  };

  filterByName = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = this.filterByName();
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
          <ContactForm onSubmit={this.addContact} contacts={contacts} />
        </div>
        <Filter value={filter} onChange={this.handleFilterChange} />

        <Title marginT={40} size={20} text="Contacts" />

        <ContactList
          onDeleteContact={this.deleteContact}
          contacts={filteredContacts}
        />
      </Container>
    );
  }
}
