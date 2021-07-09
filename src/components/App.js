import React, { Component, Suspense, lazy } from "react";
import { Switch } from "react-router-dom";
import AppBar from "./appBar/AppBar";
import { connect } from "react-redux";
import { getCurrUser } from "../redux/auth/auth-operations";
import PublicRoute from "./routs/PublicRoute";
import PrivateRoute from "./routs/PrivateRoute";
import styles from "./App.module.css";


const HomeView = lazy(() => import("./views/HomeView"));
const RegistrationView = lazy(() => import("./views/RegistrationView"));
const LoginView = lazy(() => import("./views/LoginView"));
const ContactsView = lazy(() => import("./views/ContactsView"));

class App extends Component {
  componentDidMount() {
    this.props.onRefresh();
  }

  render() {
    return (
      <div>
        <AppBar />
        <Suspense fallback={<p className={styles.loader}>Батя, я стараюсь!</p>}>
          <Switch>
            <PublicRoute exact path="/" component={HomeView} />
            <PublicRoute
              path="/register"
              redirectTo="/contacts"
              restricted
              component={RegistrationView}
            />
            <PublicRoute
              path="/login"
              redirectTo="/contacts"
              restricted
              component={LoginView}
            />
            <PrivateRoute
              path="/contacts"
              redirectTo="/login"
              component={ContactsView}
            />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onRefresh: () => dispatch(getCurrUser()),
});

export default connect(null, mapDispatchToProps)(App);
