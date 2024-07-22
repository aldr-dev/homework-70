import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ApiFormData} from '../types';
import {getFormData, postFormData} from './contactsFormThunks';

export interface FormState {
  data: ApiFormData;
  postIsLoading: boolean;
  updateIsLoading: boolean;
  postIsError: boolean;
  updateIsError: boolean;
}

const initialState: FormState = {
  data: {name: '', phone: '', email: '', photo: ''},
  postIsLoading: false,
  updateIsLoading: false,
  postIsError: false,
  updateIsError: false,
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
      state.updateIsError = false;
      state.updateIsLoading = true;
    });
    builder.addCase(getFormData.fulfilled, (state: FormState, action: PayloadAction<ApiFormData | undefined>) => {
      state.updateIsLoading = false;
      if (action.payload) {
        state.data = action.payload;
      }
    });
    builder.addCase(getFormData.rejected, (state: FormState) => {
      state.updateIsLoading = false;
      state.updateIsError = true;
    });
  },
  selectors: {
    selectFormData: (state: FormState) => state.data,
    selectPostIsLoading: (state: FormState) => state.postIsLoading,
    selectUpdateIsLoading: (state: FormState) => state.updateIsLoading,
    selectPostIsError: (state: FormState) => state.postIsError,
    selectUpdateIsError: (state: FormState) => state.updateIsError,
  },
});

export const formReducer = formSlice.reducer;
export const {
  dataForm,
  resetDataForm,
} = formSlice.actions;

export const { selectFormData,
  selectPostIsLoading,
  selectUpdateIsLoading,
  selectPostIsError,
  selectUpdateIsError,
} = formSlice.selectors;