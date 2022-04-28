const getUserError = state => state.user.error;
const getUserLoading = state => state.user.loading;
const getUserOwnDictionarys = state => state.user.ownDictionarys;
const getCurrentDictionary = state => state.user.currentDictionary;

const userSelectors = {
  getUserError,
  getUserLoading,
  getUserOwnDictionarys,
  getCurrentDictionary,
};
export default userSelectors;
