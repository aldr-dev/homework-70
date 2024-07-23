import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ApiFormData} from '../types';
import {getFormData, postFormData, updateFormData} from './contactsFormThunks';

export interface FormState {
  data: ApiFormData;
  postIsLoading: boolean;
  getIsLoading: boolean;
  postIsError: boolean;
  getIsError: boolean;
  getUpdateIsLoading: boolean;
  getUpdateIsError: boolean;
}

const initialState: FormState = {
  data: {name: '', phone: '', email: '', photo: ''},
  postIsLoading: false,
  getIsLoading: false,
  postIsError: false,
  getIsError: false,
  getUpdateIsLoading: false,
  getUpdateIsError: false,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    dataForm: (state: FormState, action: PayloadAction<{name: keyof ApiFormData; value: string}>) => {
      const { name, value } = action.payload;
      state.data[name] = value;
    },
    resetDataForm: (state: FormState) => {
      state.data = {name: '', phone: '', email: '', photo: ''};
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postFormData.pending, (state: FormState) => {
      state.postIsError = false;
      state.postIsLoading = true;
    });
    builder.addCase(postFormData.fulfilled, (state: FormState) => {
      state.postIsLoading = false;
    });
    builder.addCase(postFormData.rejected, (state: FormState) => {
      state.postIsLoading = false;
      state.postIsError = true;
    });

    builder.addCase(getFormData.pending, (state: FormState) => {
      state.getIsError = false;
      state.getIsLoading = true;
    });
    builder.addCase(getFormData.fulfilled, (state: FormState, action: PayloadAction<ApiFormData | undefined>) => {
      state.getIsLoading = false;
      if (action.payload) {
        state.data = action.payload;
      }
    });
    builder.addCase(getFormData.rejected, (state: FormState) => {
      state.getIsLoading = false;
      state.getIsError = true;
    });

    builder.addCase(updateFormData.pending, (state: FormState) => {
      state.getUpdateIsError = false;
      state.getUpdateIsLoading = true;
    });
    builder.addCase(updateFormData.fulfilled, (state: FormState) => {
      state.getUpdateIsLoading = false;
    });
    builder.addCase(updateFormData.rejected, (state: FormState) => {
      state.getUpdateIsLoading = false;
      state.getUpdateIsError = true;
    });
  },
  selectors: {
    selectFormData: (state: FormState) => state.data,
    selectPostIsLoading: (state: FormState) => state.postIsLoading,
    selectPostIsError: (state: FormState) => state.postIsError,
    selectGetIsLoading: (state: FormState) => state.getIsLoading,
    selectGetIsError: (state: FormState) => state.getIsError,
    selectGetUpdateIsLoading: (state: FormState) => state.getUpdateIsLoading,
    selectGetUpdateIsError: (state: FormState) => state.getUpdateIsError,
  },
});

export const formReducer = formSlice.reducer;
export const {
  dataForm,
  resetDataForm,
} = formSlice.actions;

export const { selectFormData,
  selectPostIsLoading,
  selectPostIsError,
  selectGetIsLoading,
  selectGetIsError,
  selectGetUpdateIsLoading,
  selectGetUpdateIsError,
} = formSlice.selectors;