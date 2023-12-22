const getIsLoggedIn = state => state.auth.isLoggedIn;

const getAuthError = state => state.auth.authError;

const getRegError = state => state.auth.regError;

const getPasswordChangeError = state => state.auth.passChangeError;

const getUserEmail = state => state.auth.user.email;

const getUserName = state => state.auth.user.name;

const getUserSubscription = state => state.auth.user.subscription;

const getIsFetchingCurrent = state => state.auth.isFetchingCurrentUser;

const getLoading = state => state.auth.loading;

const getPasswordResetApplication = state =>
  state.auth.passwordResetApplication;

const getPasswordChange = state => state.auth.passwordChange;

const authSelectors = {
  getIsLoggedIn,
  getAuthError,
  getRegError,
  getPasswordChangeError,
  getUserEmail,
  getUserName,
  getUserSubscription,
  getIsFetchingCurrent,
  getLoading,
  getPasswordResetApplication,
  getPasswordChange,
};
export default authSelectors;
