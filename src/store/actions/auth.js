import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkAuthTimeout = (expiresIn) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expiresIn * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZxQKTahEpX28lmZoh9KLVgnVUJKb8MzQ';

    if (!isSignup) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZxQKTahEpX28lmZoh9KLVgnVUJKb8MzQ';
    }

    axios
      .post(url, authData)
      .then((response) => {
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem(
          'expiration',
          new Date(response.data.expiresIn * 1000 + new Date().getTime())
        );
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(+response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
};

export const tryAutoLogin = () => {
  return (dispatch) => {
    if (!localStorage.getItem('token')) {
      dispatch(logout());
    } else {
      if (
        new Date().getTime() >=
        new Date(localStorage.getItem('expiration')).getTime()
      ) {
        dispatch(logout());
      } else {
        dispatch(
          authSuccess(
            localStorage.getItem('token'),
            localStorage.getItem('userId')
          )
        );
        dispatch(
          checkAuthTimeout(
            (new Date(localStorage.getItem('expiration')).getTime() -
              new Date().getTime()) /
              1000
          )
        );
      }
    }
  };
};
