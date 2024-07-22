import {createAsyncThunk} from '@reduxjs/toolkit';
import {MutationApiFormData} from '../types';
import axiosApi from '../axiosApi';
import {toast} from 'react-toastify';

export const contactsGetData =
  createAsyncThunk<MutationApiFormData[], void>(
  'contacts/contactsGetData', async () => {
    try {
      const response = await axiosApi.get<MutationApiFormData>('/contacts.json');
      if (response.status !== 200) {
        toast.error('An unexpected error occurred, please try again later.');
        throw new Error('An unexpected error occurred, please try again later. ' + response.status);
      }

      if (response.data !== null) {
        return Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }));
      } else {
        return [];
      }

    } catch (error) {
      toast.error('An unexpected error occurred, please try again later.');
      console.error('An unexpected error occurred, please try again later. ' + error);
    }
  }
);