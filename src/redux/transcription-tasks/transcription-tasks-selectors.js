const getError = state => state.transcriptionTasks.error;
const getLoading = state => state.transcriptionTasks.loading;
const getTranscriptionTasks = state => state.transcriptionTasks.items;

const transcriptionTasksSelectors = {
  getError,
  getLoading,
  getTranscriptionTasks,
};
export default transcriptionTasksSelectors;
