import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

import React, { useState } from "react";
import { connect } from "react-redux";

import styles from "./ContactForm.module.css";
import { addContact } from "../../redux/contacts/contacts-operations";
import { getContacts } from "../../redux/contacts/contacts-selectors";

const ContactForm = ({ contacts, onSubmit }) => {
  const [contactName, setContactName] = useState("");
  const handleInputName = (evt) => setContactName(evt.target.value);
  const [contactNumber, setContactNumber] = useState("");
  const handleInputNumber = (evt) => setContactNumber(evt.target.value);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!contactName.trim() || !contactNumber.trim())
      return alert("You've missed something :)");
    if (contacts.map((contact) => contact.name).includes(contactName.trim()))
      return alert(`"${contactName.trim()}" is already in contacts`);
    if (
      contacts.map((contact) => contact.number).includes(contactNumber.trim())
    )
      return alert(`"${contactNumber.trim()}" is already in contacts`);
    const newContact = { name: contactName, number: contactNumber };
    onSubmit(newContact);
    setContactName("");
    setContactNumber("");
  };

  const uniqueIdName = uuid();
  const uniqueIdNumber = uuid();

  return (
    <form onSubmit={handleSubmit} className={styles.addContactForm}>
      <label htmlFor={uniqueIdName} className={styles.addContactFormLabel}>
        Имя
      </label>
      <input
        className={styles.addContactFormInput}
        type="text"
        name="name"
        id={uniqueIdName}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        required
        value={contactName}
        onChange={handleInputName}
        placeholder="Имя контакта"
      />
      <label htmlFor={uniqueIdNumber} className={styles.addContactFormLabel}>
        Телефон
      </label>
      <input
        className={styles.addContactFormInput}
        type="tel"
        name="number"
        id={uniqueIdNumber}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
        value={contactNumber}
        onChange={handleInputNumber}
        placeholder="Номер контакта"
      />

      <button type="submit" className={styles.addContactFormBtn}>
        Запилить
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  contacts: getContacts(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (object) => dispatch(addContact(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
