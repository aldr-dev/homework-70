import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {MutationApiFormData} from '../types';
import {RootState} from '../app/store';

export const contactsGetData =
  createAsyncThunk<MutationApiFormData[] | null, void, { state: RootState }>(
    'contacts/contactsGetData',
    async () => {
      const response = await axiosApi<{ [key: string]: MutationApiFormData }>('/contacts.json');

      if (response.data !== null) {
        return Object.keys(response.data).map(key => ({
          ...response.data[key],
          id: key,
        }));
      } else {
        return [];
      }
    }
  );

export const contactsDeleteData = createAsyncThunk<void, string, { state: RootState }>(
  'contacts/contactsDeleteData',
  async (id: string) => {
    await axiosApi.delete<MutationApiFormData>(`/contacts/${id}.json`);
  }
);