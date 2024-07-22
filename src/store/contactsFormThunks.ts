import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiFormData} from '../types';
import axiosApi from '../axiosApi';
import {RootState} from '../app/store';

export const postFormData = createAsyncThunk<void, ApiFormData, { state: RootState }>(
  'form/postFormData', async (data: ApiFormData) => {
    await axiosApi.post<ApiFormData>('/contacts.json', data);
  }
);

export const updateFormData = createAsyncThunk<ApiFormData | undefined, string, { state: RootState }>(
  'form/updateFormData', async (id: string) => {
    const response = await axiosApi.get<ApiFormData>(`/contacts/${id}.json`);
    return response.data;
  }
);