import { createAction } from '@reduxjs/toolkit';

export const fetchSentencesTasksRequest = createAction(
  'sentences-tasks/fetchSentencesTasksRequest',
);
export const fetchSentencesTasksSuccess = createAction(
  'sentences-tasks/fetchSentencesTasksSuccess',
);
export const fetchSentencesTasksError = createAction(
  'sentences-tasks/fetchSentencesTasksError',
);
