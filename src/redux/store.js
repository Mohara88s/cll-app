import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ownDictionariesReducer from './own-dictionaries/own-dictionaries-reducer';
import jokeTasksReducer from './joke-tasks/joke-tasks-reducer';
import sentencesTasksReducer from './sentences-tasks/sentences-tasks-reducer';
import transcriptionTasksReducer from './transcription-tasks/transcription-tasks-reducer';
import authReducer from './auth/auth-reducer';
import textTranscriptionReducer from './text-transcription/text-transcription-reducer';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    ownDictionaries: ownDictionariesReducer,
    jokeTasks: jokeTasksReducer,
    sentencesTasks: sentencesTasksReducer,
    transcriptionTasks: transcriptionTasksReducer,
    textTranscription: textTranscriptionReducer,
    auth: persistReducer(authPersistConfig, authReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
