import React from "react";
import ContactListItem from "./contactListItem/ContactListItem";
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";
import { connect } from "react-redux";
import { deleteContact } from "../../redux/contacts/contacts-operations";
import {
  getFilteredContacts,
  getContacts,
} from "../../redux/contacts/contacts-selectors";

const ContactList = ({ contacts, onClick }) => (
  <ul className={styles.contactList}>
    {contacts.map((contact) => (
      <ContactListItem
        key={contact.id}
        id={contact.id}
        name={contact.name}
        number={contact.number}
        onDeleteContact={onClick}
      />
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  if (!getFilteredContacts(state)) {
    return {
      contacts: getContacts(state),
    };
  }
  return { contacts: getFilteredContacts(state) };
};

const mapDispatchToProps = (dispatch) => ({
  onClick: (contactId) => dispatch(deleteContact(contactId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
