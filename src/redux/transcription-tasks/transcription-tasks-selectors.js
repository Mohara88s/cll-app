const getTranscriptionTasksError = state => state.transcriptionTasks.error;
const getTranscriptionTasksLoading = state => state.transcriptionTasks.loading;
const getTranscriptionTasks = state => state.transcriptionTasks.tasks;
const getTranscriptionTasksSet = state => state.transcriptionTasks.tasksSet;
const getRandomTranscriptionTask = state => state.transcriptionTasks.randomTask;

const transcriptionTasksSelectors = {
  getTranscriptionTasksError,
  getTranscriptionTasksLoading,
  getTranscriptionTasks,
  getTranscriptionTasksSet,
  getRandomTranscriptionTask,
};
export default transcriptionTasksSelectors;
