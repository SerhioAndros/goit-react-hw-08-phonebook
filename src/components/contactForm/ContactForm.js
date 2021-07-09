import React, { Component } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import styles from "./ContactForm.module.css";
import { connect } from "react-redux";
import { addContact } from "../../redux/contacts/contacts-operations";
import { getContacts } from "../../redux/contacts/contacts-selectors";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleInputChange = (evt) => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { name, number } = this.state;
    const contacts = this.props.contacts;
    if (!name.trim() || !number.trim())
      return alert("You've missed something :)");
    if (contacts.map((contact) => contact.name).includes(name.trim()))
      return alert(`"${name.trim()}" is already in contacts`);
    if (contacts.map((contact) => contact.number).includes(number.trim()))
      return alert(`"${number.trim()}" is already in contacts`);

    this.props.onSubmit(this.state);
    this.setState({
      name: "",
      number: "",
    });
  };

  render() {
    const uniqueIdName = uuid();
    const uniqueIdNumber = uuid();
    return (
      <form onSubmit={this.handleSubmit} className={styles.addContactForm}>
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
          value={this.state.name}
          onChange={this.handleInputChange}
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
          value={this.state.number}
          onChange={this.handleInputChange}
          placeholder="Номер контакта"
        />

        <button type="submit" className={styles.addContactFormBtn}>
          Запилить
        </button>
      </form>
    );
  }
}

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
