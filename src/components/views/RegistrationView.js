import PropTypes from "prop-types";

import React, { useState } from "react";
import { connect } from "react-redux";

import { register } from "../../redux/auth/auth-operations";
import styles from "./RegistrationView.module.css";

const RegistrationView = ({ onRegister }) => {
  const [userName, setUserName] = useState("");
  const handleInputName = (evt) => setUserName(evt.target.value);
  const [userMail, setUserMail] = useState("");
  const handleInputMail = (evt) => setUserMail(evt.target.value);
  const [userPassword, setUserPassword] = useState("");
  const handleInputPassword = (evt) => setUserPassword(evt.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: userName,
      email: userMail,
      password: userPassword,
    };

    onRegister(userData);
    setUserName("");
    setUserMail("");
    setUserPassword("");
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.registrationHeader}>Зарегайся!!!</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Ник
          <input
            type="text"
            name="name"
            value={userName}
            onChange={handleInputName}
          />
        </label>

        <label className={styles.label}>
          Мейл
          <input
            type="email"
            name="email"
            value={userMail}
            onChange={handleInputMail}
          />
        </label>

        <label className={styles.label}>
          Пароль (никому не говори)
          <input
            type="password"
            name="password"
            value={userPassword}
            onChange={handleInputPassword}
          />
        </label>

        <button className={styles.submitBtn} type="submit">
          Зарегать
        </button>
      </form>
    </div>
  );
};

RegistrationView.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onRegister: (data) => dispatch(register(data)),
});

export default connect(null, mapDispatchToProps)(RegistrationView);
