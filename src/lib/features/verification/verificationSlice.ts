import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Verification {
  isVerified: boolean;
}

const initialState: Verification = {
  isVerified: false
};

const verificationSlice = createSlice({
  name: 'verification',
  initialState,
  reducers: {
    setVerificationStatus: (state, action: PayloadAction<boolean>) => {
      state.isVerified = action.payload;
    },
  },
});

export const { setVerificationStatus } = verificationSlice.actions;

export default verificationSlice.reducer;
