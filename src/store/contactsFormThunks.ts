import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiFormData} from '../types';
import axiosApi from '../axiosApi';
import {RootState} from '../app/store';

export const postFormData = createAsyncThunk<void, ApiFormData, { state: RootState }>(
  'form/postFormData', async (data) => {
    await axiosApi.post<ApiFormData>('/contacts.json', data);
  }
);

export const getFormData = createAsyncThunk<ApiFormData | undefined, string, { state: RootState }>(
  'form/getFormData', async (id) => {
    const response = await axiosApi.get<ApiFormData>(`/contacts/${id}.json`);
    return response.data;
  }
);

export const updateFormData = createAsyncThunk<void, {id: string, data: ApiFormData}, { state: RootState }>(
  'form/updateFormData', async ({id, data}) => {
     await axiosApi.put<ApiFormData>(`/contacts/${id}.json`, data);
  }
);