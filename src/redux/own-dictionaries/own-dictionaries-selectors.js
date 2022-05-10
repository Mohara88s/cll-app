const getError = state => state.ownDictionaries.error;
const getLoading = state => state.ownDictionaries.loading;
const getAddDictionaryError = state => state.ownDictionaries.addDictionaryError;
const getAddDictionaryLoading = state =>
  state.ownDictionaries.addDictionaryLoading;
const getOwnDictionaries = state => state.ownDictionaries.ownDictionaries;
const getCurrentDictionary = state => state.ownDictionaries.currentDictionary;
const getAddDictionarySuccess = state =>
  state.ownDictionaries.addDictionarySuccess;

const ownDictionariesSelectors = {
  getError,
  getLoading,
  getAddDictionaryError,
  getAddDictionaryLoading,
  getOwnDictionaries,
  getCurrentDictionary,
  getAddDictionarySuccess,
};
export default ownDictionariesSelectors;
