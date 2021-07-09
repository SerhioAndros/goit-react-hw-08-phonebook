import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../../redux/auth/auth-operations";
import styles from "./RegistrationView.module.css";

class RegistrationView extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onRegister(this.state);
    this.setState({ name: "", email: "", password: "" });
  };

  render() {
    const { name, email, password } = this.state;

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.registrationHeader}>Зарегайся!!!</h1>

        <form className={styles.form} onSubmit={this.handleSubmit}>
          <label className={styles.label}>
            Ник
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </label>

          <label className={styles.label}>
            Мейл
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </label>

          <label className={styles.label}>
            Пароль (никому не говори)
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </label>

          <button className={styles.submitBtn} type="submit">
            Зарегать
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onRegister: (data) => dispatch(register(data)),
});

export default connect(null, mapDispatchToProps)(RegistrationView);
