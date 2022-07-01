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

export const fetchSentencesTasksByJokeTaskIdRequest = createAction(
  'sentences-tasks/fetchSentencesTasksByJokeTaskIdRequest',
);
export const fetchSentencesTasksByJokeTaskIdSuccess = createAction(
  'sentences-tasks/fetchSentencesTasksByJokeTaskIdSuccess',
);
export const fetchSentencesTasksByJokeTaskIdError = createAction(
  'sentences-tasks/fetchSentencesTasksByJokeTaskIdError',
);
