import {
  fetchOwnDictionarysRequest,
  fetchOwnDictionarysSuccess,
  fetchOwnDictionarysError,
  addOwnDictionaryRequest,
  addOwnDictionarySuccess,
  addOwnDictionaryError,
  fetchOwnDictionaryRequest,
  fetchOwnDictionarySuccess,
  fetchOwnDictionaryError,
  deleteOwnDictionaryRequest,
  deleteOwnDictionarySuccess,
  deleteOwnDictionaryError,
} from './own-dictionarys-actions';
import axios from 'axios';

export const fetchOwnDictionarys = () => async dispatch => {
  dispatch(fetchOwnDictionarysRequest());
  try {
    const { data } = await axios.get(`/own-dictionarys`);
    dispatch(fetchOwnDictionarysSuccess(data.ownDictionarys));
  } catch (error) {
    dispatch(fetchOwnDictionarysError(error.response.data.message));
  }
};

export const addOwnDictionary = wordsSet => async dispatch => {
  dispatch(addOwnDictionaryRequest());
  try {
    const { data } = await axios.patch(`/own-dictionarys`, wordsSet);
    dispatch(addOwnDictionarySuccess(data.ownDictionarys));
  } catch (error) {
    dispatch(addOwnDictionaryError(error.response.data.message));
  }
};

export const fetchOwnDictionary = dictionaryId => async dispatch => {
  dispatch(fetchOwnDictionaryRequest());
  try {
    const { data } = await axios.get(`/own-dictionarys/${dictionaryId}`);
    dispatch(fetchOwnDictionarySuccess(data.ownDictionary));
  } catch (error) {
    dispatch(fetchOwnDictionaryError(error.response.data.message));
  }
};

export const deleteOwnDictionary = dictionaryId => async dispatch => {
  dispatch(deleteOwnDictionaryRequest());
  try {
    const { data } = await axios.delete(`/own-dictionarys/${dictionaryId}`);
    dispatch(deleteOwnDictionarySuccess(data.ownDictionarys));
  } catch (error) {
    dispatch(deleteOwnDictionaryError(error.response.data.message));
  }
};
