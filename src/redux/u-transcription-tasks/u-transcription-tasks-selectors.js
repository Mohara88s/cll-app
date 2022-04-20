const getUTranscriptionTasksError = state => state.uTranscriptionTasks.error;
const getUTranscriptionTasksLoading = state =>
  state.uTranscriptionTasks.loading;
const getUTranscriptionTasks = state => state.uTranscriptionTasks.tasks;
const getUTranscriptionTasksFilter = state => state.uTranscriptionTasks.filter;

const uTranscriptionTasksSelectors = {
  getUTranscriptionTasksError,
  getUTranscriptionTasksLoading,
  getUTranscriptionTasks,
  getUTranscriptionTasksFilter,
};
export default uTranscriptionTasksSelectors;
