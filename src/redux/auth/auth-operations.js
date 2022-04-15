import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://127.0.0.1:3000/api';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const signup = createAsyncThunk('auth/signup', async credentials => {
  try {
    const { data } = await axios.post('/auth/signup', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    console.log('rejected', error);
  }
});

const signin = createAsyncThunk(
  'auth/signin',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/auth/signin', credentials);
      // console.log(data)
      // if (!data.token) {
      //   thunkAPI.rejectWithValue();
      //   return {user: { name: null, email: null }}}

      token.set(data.token);
      return data;
    } catch (error) {
      console.log('rejected', error);
    }
  },
);

const signout = createAsyncThunk('/auth/signout', async () => {
  try {
    await axios.get('/auth/signout');
    token.unset();
  } catch (error) {
    console.log('rejected', error);
  }
});

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      console.log('None token');
      return thunkAPI.rejectWithValue();
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      console.log('rejected', error);
    }
  },
);

const operations = {
  signup,
  signout,
  signin,
  fetchCurrentUser,
};
export default operations;
