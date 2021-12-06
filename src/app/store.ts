import { configureStore } from "@reduxjs/toolkit";
import documentsReducer from "../features/editor/editorSlice";
import authReducer from "../features/auth/authSlice";

const setEditedMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  const { form } = store.getState();
  //localStorage.setItem("form", JSON.stringify(form));
  return result;
};

export const store = configureStore({
  reducer: {
    editor: documentsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(setEditedMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
