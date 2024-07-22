import {MutationApiFormData} from '../types';
import {createSlice} from '@reduxjs/toolkit';

export interface ContactsState {
  contactsData: MutationApiFormData [];
  getIsLoading: boolean;
  deleteIsLoading: boolean;
}

const initialState: ContactsState  = {
  contactsData: [],
  getIsLoading: false,
  deleteIsLoading: false,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
});

export const contactsReducer = contactsSlice.reducer;




