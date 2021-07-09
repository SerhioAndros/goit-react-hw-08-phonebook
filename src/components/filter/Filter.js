import React from "react";
import styles from "./Filter.module.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { filterContacts } from "../../redux/contacts/contacts-actions";
import { getFilter } from "../../redux/contacts/contacts-selectors";

const Filter = ({ value, onChange }) => (
  <>
    <label className={styles.filterInputLabel}>Кого же найти?</label>
    <input
      className={styles.filterInput}
      type="text"
      name="filter"
      value={value}
      onChange={onChange}
      placeholder="По имени"
    />
  </>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  value: getFilter(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (evt) => dispatch(filterContacts(evt.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
