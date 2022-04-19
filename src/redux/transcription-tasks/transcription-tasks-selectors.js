const getError = state => state.transcriptionTasks.error;
const getLoading = state => state.transcriptionTasks.loading;
const getTranscriptionTasks = state => state.transcriptionTasks.tasks;
const getFilter = state => state.transcriptionTasks.filter;

const transcriptionTasksSelectors = {
  getError,
  getLoading,
  getTranscriptionTasks,
  getFilter,
};
export default transcriptionTasksSelectors;
