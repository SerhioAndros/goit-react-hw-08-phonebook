import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { login } from "../../redux/auth/auth-operations";
import styles from "./LoginView.module.css";

const LoginView = ({ onLogin }) => {
  const [userMail, setUserMail] = useState("");
  const handleInputMail = (evt) => setUserMail(evt.target.value);
  const [userPassword, setUserPassword] = useState("");
  const handleInputPassword = (evt) => setUserPassword(evt.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email: userMail, password: userPassword };

    onLogin(userData);
    setUserMail("");
    setUserPassword("");
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.loginHeader}>Залогинься!!!</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
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
          Пароль (никому не говорил же?)
          <input
            type="password"
            name="password"
            value={userPassword}
            onChange={handleInputPassword}
          />
        </label>

        <button type="submit" className={styles.submitBtn}>
          Погнали!
        </button>
      </form>
    </div>
  );
};

LoginView.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onLogin: (data) => dispatch(login(data)),
});

export default connect(null, mapDispatchToProps)(LoginView);
