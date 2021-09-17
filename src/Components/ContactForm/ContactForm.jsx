import { React, useState } from "react";
import PropTypes from "prop-types";
import { Form } from "./ContactForm.styled";
import { MdPersonAdd } from "react-icons/md";
import Button from "../Utils/Button/Button";
import Title from "../Utils/Title/Title";
import Input from "../Utils/Input/Input";

function ContactForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, number });
    setName("");
    setNumber("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Title marginR={15} size={18} text="Name" />
      <Input
        placeholder="type name..."
        value={name}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        required
        onChange={handleChange}
      />
      <Title marginR={15} marginL={30} size={18} text="Number" />
      <Input
        placeholder="type number..."
        value={number}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
        required
        onChange={handleChange}
      />
      <Button
        title="Add to contacts"
        text={<MdPersonAdd size={50} color="#187bcd" />}
        size={20}
        type="submit"
      />
    </Form>
  );
}

export default ContactForm;

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
