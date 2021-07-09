import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/auth/auth-operations";
import { getUserName } from "../../redux/auth/auth-selector";
import styles from "./UserMenu.module.css";

const defaultAvatar =
  "https://cdn.pixabay.com/photo/2016/12/13/16/17/dancer-1904467_960_720.png";

const UserMenu = ({ avatar, name, onLogout }) => (
  <div className={styles.container}>
    <img src={avatar} alt="" width="45" className={styles.avatar} />
    <span className={styles.name}>
      Вечер в хату, <span className={styles.userName}>{name}</span>
    </span>
    <button type="button" onClick={onLogout} className={styles.logoutBtn}>
      Сваливаем...
    </button>
  </div>
);

const mapStateToProps = (state) => ({
  name: getUserName(state),
  avatar: defaultAvatar,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: (data) => dispatch(logout(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
