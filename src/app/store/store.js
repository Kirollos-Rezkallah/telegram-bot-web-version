import { configureStore } from '@reduxjs/toolkit';

import { loadClientState } from '../../services/storage';
import { rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadClientState(),
});
