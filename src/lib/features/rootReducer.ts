// src/reducers/index.ts

import { combineReducers } from '@reduxjs/toolkit';
import verificationReducer from './verification/verificationSlice';

const rootReducer = combineReducers({
  verificationStatus: verificationReducer,
});

export default rootReducer;
