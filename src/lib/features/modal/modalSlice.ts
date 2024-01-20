import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Modal {
  isModalOpen: boolean;
}

const initialState: Modal = {
    isModalOpen: false
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
        state.isModalOpen = true;
    },
    closeModal: (state) => {
        state.isModalOpen = false;
    }
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
