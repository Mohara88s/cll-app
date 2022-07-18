const getEnglishText = state => state.textTranscription.englishText;
const getTranscriptedText = state => state.textTranscription.transcriptedText;
const getLoading = state => state.textTranscription.loading;
const getError = state => state.textTranscription.error;

const textTranscriptionSelectors = {
  getEnglishText,
  getTranscriptedText,
  getLoading,
  getError,
};
export default textTranscriptionSelectors;
