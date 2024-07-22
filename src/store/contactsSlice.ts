import {MutationApiFormData} from '../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {contactsGetData} from './contactsThunks';

export interface ContactsState {
  contactsData: MutationApiFormData [];
  getIsLoading: boolean;
  getIsError: boolean;
}

const initialState: ContactsState  = {
  contactsData: [],
  getIsLoading: false,
  getIsError: false,
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
      state.getIsLoading = true;
    });
    builder.addCase(contactsGetData.fulfilled, (state: ContactsState, action: PayloadAction<MutationApiFormData[] | null> ) => {
      state.getIsLoading = false;
      if (action.payload !== null) {
        state.contactsData = action.payload;
      }
    });
    builder.addCase(contactsGetData.rejected, (state: ContactsState ) => {
      state.getIsLoading = false;
      state.getIsError = true;
    });
  },
  selectors: {
    selectContactsData: (state: ContactsState) => state.contactsData,
    selectGetIsLoading: (state: ContactsState) => state.getIsLoading,
    selectGetIsError: (state: ContactsState) => state.getIsError,
  }
});

export const contactsReducer = contactsSlice.reducer;
export const {updateStateContactData} = contactsSlice.actions;
export const {
  selectContactsData,
  selectGetIsLoading,
  selectGetIsError,
} = contactsSlice.selectors;