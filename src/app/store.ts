import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/form/formSlice";

const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  const { form } = store.getState();
  localStorage.setItem("form", JSON.stringify(form));
  return result;
};

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
