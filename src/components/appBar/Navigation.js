import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getIsAuthenticated } from "../../redux/auth/auth-selector";

const styles = {
  link: {
    display: "inline-block",
    textDecoration: "none",
    padding: 12,
    fontWeight: 700,
    fontSize: 21,
    color: "#2A363B",
  },
  activeLink: {
    color: "rgb(89, 89, 199)",
  },
};

const Navigation = ({ isAuthenticated }) => (
  <nav>
    <NavLink exact to="/" style={styles.link} activeStyle={styles.activeLink}>
      На главную!
    </NavLink>
    {isAuthenticated && (
      <NavLink
        exact
        to="/contacts"
        style={styles.link}
        activeStyle={styles.activeLink}
      >
        Контактики
      </NavLink>
    )}
  </nav>
);

const mapStateToProps = (state) => ({
  isAuthenticated: getIsAuthenticated(state),
});

export default connect(mapStateToProps)(Navigation);
