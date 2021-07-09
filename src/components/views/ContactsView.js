import styles from "./ContactsView.module.css";
import React, { Component } from "react";
import { connect } from "react-redux";

import ContactForm from "../contactForm/ContactForm";
import ContactList from "../contactList/ContactList";
import Filter from "../filter/Filter";
import { fetchContacts } from "../../redux/contacts/contacts-operations";
import { getLoading } from "../../redux/contacts/contacts-selectors";
import { ContactsLoader } from "../loader/Loader";

class ContactsView extends Component {
  state = {};
  componentDidMount() {
    this.props.fetchContacts();
  }
  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.mainHeader}>Фоно-бук</h1>
        <ContactForm />
        <h2 className={styles.additionalHeader}>Контактики</h2>

        <Filter />
        {this.props.loadingContacts && <ContactsLoader />}
        <ContactList />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loadingContacts: getLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchContacts: () => dispatch(fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsView);
