import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";

import {
  // registerRequest,
  registerSuccess,
  registerError,
  // loginRequest,
  loginSuccess,
  loginError,
  // logoutRequest,
  logoutSuccess,
  logoutError,
  // getCurrUserRequest,
  getCurrUserSuccess,
  getCurrUserError,
} from "./auth-actions";

const initialState = { name: null, email: null };

const user = createReducer(initialState, {
  [registerSuccess]: (_, { payload }) => payload.user,
  [loginSuccess]: (_, { payload }) => payload.user,
  [getCurrUserSuccess]: (_, { payload }) => payload,
  [logoutSuccess]: () => initialState,
});

const token = createReducer(null, {
  [registerSuccess]: (_, { payload }) => payload.token,
  [loginSuccess]: (_, { payload }) => payload.token,
  [logoutSuccess]: () => null,
});

const setError = (_, { payload }) => payload;
const error = createReducer(null, {
  [registerError]: setError,
  [loginError]: setError,
  [getCurrUserError]: setError,
  [logoutError]: setError,
});

const isAuthed = createReducer(false, {
  [registerSuccess]: () => true,
  [loginSuccess]: () => true,
  [getCurrUserSuccess]: () => true,
  [registerError]: () => false,
  [loginError]: () => false,
  [getCurrUserError]: () => false,
  [logoutSuccess]: () => false,
});

// const loading = createReducer(null, {
//   [registerRequest]: () => true,
//   [registerSuccess]: () => false,
//   [registerError]: () => false,
//   [loginRequest]: () => true,
//   [loginSuccess]: () => false,
//   [loginError]: () => false,
//   [logoutRequest]: () => true,
//   [logoutSuccess]: () => false,
//   [logoutError]: () => false,
// });

export default combineReducers({ user, token, error, isAuthed });
