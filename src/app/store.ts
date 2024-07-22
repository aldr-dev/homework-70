import {configureStore} from '@reduxjs/toolkit';
import {formReducer} from '../store/contactsFormSlice';
import {contactsReducer} from '../store/contactsSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    form: formReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;