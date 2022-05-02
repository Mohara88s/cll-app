const getError = state => state.ownDictionarys.error;
const getLoading = state => state.ownDictionarys.loading;
const getOwnDictionarys = state => state.ownDictionarys.ownDictionarys;
const getCurrentDictionary = state => state.ownDictionarys.currentDictionary;

const ownDictionarysSelectors = {
  getError,
  getLoading,
  getOwnDictionarys,
  getCurrentDictionary,
};
export default ownDictionarysSelectors;
