import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../redux/auth/auth-operations";
import styles from "./LoginView.module.css";

class LoginView extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onLogin(this.state);
    this.setState({ name: "", email: "", password: "" });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.loginHeader}>Залогинься!!!</h1>

        <form className={styles.form} onSubmit={this.handleSubmit}>
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
            Пароль (никому не говорил же?)
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </label>

          <button type="submit" className={styles.submitBtn}>
            Погнали!
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLogin: (data) => dispatch(login(data)),
});

export default connect(null, mapDispatchToProps)(LoginView);
