// src/reducers/index.ts

import { combineReducers } from '@reduxjs/toolkit';
import verificationReducer from './verification/verificationSlice';
import modalReducer from './modal/modalSlice';

const rootReducer = combineReducers({
  verificationStatus: verificationReducer,
  modalStatus: modalReducer,
});

export default rootReducer;
