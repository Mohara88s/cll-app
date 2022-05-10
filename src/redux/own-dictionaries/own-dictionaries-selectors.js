const getOwnDictionaries = state => state.ownDictionaries.ownDictionaries;
const getError = state => state.ownDictionaries.error;
const getLoading = state => state.ownDictionaries.loading;
const getAddDictionaryError = state => state.ownDictionaries.addDictionaryError;
const getAddDictionaryLoading = state =>
  state.ownDictionaries.addDictionaryLoading;
const getCurrentDictionary = state => state.ownDictionaries.currentDictionary;
const getAddDictionarySuccess = state =>
  state.ownDictionaries.addDictionarySuccess;
const getOwnDictionary = state => state.ownDictionaries.ownDictionary;
const getOwnDictionaryError = state => state.ownDictionaries.ownDictionaryError;
const getOwnDictionaryLoading = state =>
  state.ownDictionaries.ownDictionaryLoading;

const ownDictionariesSelectors = {
  getOwnDictionaries,
  getError,
  getLoading,
  getAddDictionaryError,
  getAddDictionaryLoading,
  getCurrentDictionary,
  getAddDictionarySuccess,
  getOwnDictionary,
  getOwnDictionaryError,
  getOwnDictionaryLoading,
};
export default ownDictionariesSelectors;
