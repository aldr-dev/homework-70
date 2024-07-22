import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiFormData} from '../types';
import axiosApi from '../axiosApi';
import {toast} from 'react-toastify';
import {RootState} from '../app/store';

export const postFormData = createAsyncThunk<void, ApiFormData, {state: RootState}>(
  'form/postFormData', async (data: ApiFormData) => {
    try {
      const response = await axiosApi.post<ApiFormData>('/contacts.json', data);

      if (response.status !== 200) {
        toast.error('An unexpected error occurred, please try again later.');
        throw new Error('An unexpected error occurred, please try again later. ' + response.status);
      }

    } catch (error) {
      toast.error('An unexpected error occurred, please try again later.');
      console.error('An unexpected error occurred, please try again later. ' + error);
    }
  }
);

export const updateFormData = createAsyncThunk<ApiFormData | undefined, string, {state: RootState}>(
  'form/updateFormData', async (id: string) => {
    try {
      const response = await axiosApi.get<ApiFormData>(`/contacts/${id}.json`);

      if (response.status !== 200) {
        toast.error('An unexpected error occurred, please try again later.');
        throw new Error('An unexpected error occurred, please try again later. ' + response.status);
      }

      return response.data;
    } catch (error) {
      toast.error('An unexpected error occurred, please try again later.');
      console.error('An unexpected error occurred, please try again later. ' + error);
    }
  }
);