import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios.defaults.baseURL = 'http://127.0.0.1:3000/api';
axios.defaults.baseURL = 'https://cll-server.herokuapp.com/api';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const signup = createAsyncThunk(
  'auth/signup',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/auth/signup', credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      console.dir(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const signin = createAsyncThunk(
  'auth/signin',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/auth/signin', credentials);
      token.set(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const signout = createAsyncThunk('/auth/signout', async (_, thunkAPI) => {
  try {
    await axios.get('/auth/signout');
    token.unset();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('None token');
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
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
