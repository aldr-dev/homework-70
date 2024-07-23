import {MutationApiFormData} from '../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {contactsDeleteData, contactsGetData} from './contactsThunks';

export interface ContactsState {
  contactsData: MutationApiFormData [];
  isLoading: boolean;
  getIsError: boolean;
  deleteIsError: boolean;
}

const initialState: ContactsState  = {
  contactsData: [],
  isLoading: false,
  getIsError: false,
  deleteIsError: false,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    updateStateContactData: (state: ContactsState, {payload: id}: PayloadAction<string>) => {
      state.contactsData = state.contactsData.filter((item) => item.id !== id);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(contactsGetData.pending, (state: ContactsState ) => {
      state.getIsError = false;
      state.isLoading = true;
    });
    builder.addCase(contactsGetData.fulfilled, (state: ContactsState, action: PayloadAction<MutationApiFormData[] | null> ) => {
      state.isLoading = false;
      if (action.payload !== null) {
        state.contactsData = action.payload;
      }
    });
    builder.addCase(contactsGetData.rejected, (state: ContactsState ) => {
      state.isLoading = false;
      state.getIsError = true;
    });

    builder.addCase(contactsDeleteData.pending, (state: ContactsState ) => {
      state.deleteIsError = false;
    });
    builder.addCase(contactsDeleteData.fulfilled, (state: ContactsState ) => {
      state.deleteIsError = false;
    });
    builder.addCase(contactsDeleteData.rejected, (state: ContactsState ) => {
      state.deleteIsError = true;
    });
  },
  selectors: {
    selectContactsData: (state: ContactsState) => state.contactsData,
    selectIsLoading: (state: ContactsState) => state.isLoading,
    selectGetIsError: (state: ContactsState) => state.getIsError,
    selectDeleteIsError: (state: ContactsState) => state.deleteIsError,
  }
});

export const contactsReducer = contactsSlice.reducer;
export const {updateStateContactData} = contactsSlice.actions;
export const {
  selectContactsData,
  selectIsLoading,
  selectGetIsError,
  selectDeleteIsError,
} = contactsSlice.selectors;