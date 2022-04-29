const getTranscriptionTasksError = state => state.transcriptionTasks.error;
const getTranscriptionTasksLoading = state => state.transcriptionTasks.loading;
const getTranscriptionTasks = state => state.transcriptionTasks.tasks;
const getTranscriptionTasksFilter = state => state.transcriptionTasks.filter;

const transcriptionTasksSelectors = {
  getTranscriptionTasksError,
  getTranscriptionTasksLoading,
  getTranscriptionTasks,
  getTranscriptionTasksFilter,
};
export default transcriptionTasksSelectors;
