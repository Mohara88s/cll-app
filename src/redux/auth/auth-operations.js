import {
  signupRequest,
  signupSuccess,
  signupError,
  signinRequest,
  signinSuccess,
  signinError,
  signoutRequest,
  signoutSuccess,
  signoutError,
  fetchCurrentUserRequest,
  fetchCurrentUserSuccess,
  fetchCurrentUserError,
  passwordResetApplicationRequest,
  passwordResetApplicationSuccess,
  passwordResetApplicationError,
  passwordChangeRequest,
  passwordChangeSuccess,
  passwordChangeError,
} from './auth-actions';
import axios from 'axios';
import { store } from '../store';

// axios.defaults.baseURL = 'http://127.0.0.1:3000/api';
axios.defaults.baseURL = 'https://cll-server.onrender.com/api';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const signup = credentials => async dispatch => {
  dispatch(signupRequest());
  try {
    const { data } = await axios.post('/auth/signup', credentials);
    token.set(data.token);
    dispatch(signupSuccess(data));
  } catch (error) {
    dispatch(
      signupError(error.response ? error.response.data.message : error.message),
    );
  }
};

export const signin = credentials => async dispatch => {
  dispatch(signinRequest());
  try {
    const { data } = await axios.post('/auth/signin', credentials);
    token.set(data.token);
    dispatch(signinSuccess(data));
  } catch (error) {
    dispatch(
      signinError(error.response ? error.response.data.message : error.message),
    );
  }
};

export const signout = () => async dispatch => {
  dispatch(signoutRequest());
  try {
    await axios.get('/auth/signout');
    token.unset();
    dispatch(signoutSuccess());
  } catch (error) {
    dispatch(
      signoutError(
        error.response ? error.response.data.message : error.message,
      ),
    );
  }
};

export const fetchCurrentUser = () => async dispatch => {
  dispatch(fetchCurrentUserRequest());
  try {
    const persistedToken = store.getState().auth.token;
    if (persistedToken === null) {
      dispatch(fetchCurrentUserError('None token'));
    }
    token.set(persistedToken);
    const { data } = await axios.get('/users/current');
    dispatch(fetchCurrentUserSuccess(data));
  } catch (error) {
    dispatch(
      fetchCurrentUserError(
        error.response ? error.response.data.message : error.message,
      ),
    );
  }
};

export const passwordResetApplication = (email, url) => async dispatch => {
  dispatch(passwordResetApplicationRequest());
  try {
    const { data } = await axios.post(`/auth/password-reset`, email, url);
    dispatch(passwordResetApplicationSuccess(data));
  } catch (error) {
    dispatch(
      passwordResetApplicationError(
        error.response ? error.response.data.message : error.message,
      ),
    );
  }
};

export const passwordChange = (token, password) => async dispatch => {
  dispatch(passwordChangeRequest());
  try {
    const { data } = await axios.put(
      `/auth/password-change/${token}`,
      password,
    );
    dispatch(passwordChangeSuccess(data));
  } catch (error) {
    dispatch(
      passwordChangeError(
        error.response ? error.response.data.message : error.message,
      ),
    );
  }
};
