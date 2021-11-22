import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import firebase from "firebase";

export interface AuthState {
  pending?: boolean;
  displayName?: string | null;
  email?: string | null;
  authenticated?: boolean;
  error?: SerializedError;
}

const initialState: AuthState = {
  pending: undefined,
  displayName: undefined,
  email: undefined,
  authenticated: undefined,
  error: undefined,
};

interface PayLoad {
  displayName?: string | null;
  email?: string | null;
}

const provider = new firebase.auth.GoogleAuthProvider();

export const login = createAsyncThunk<AuthState, PayLoad>(
  "login",
  async (req, thunkAPI) => {
    try {
      if (req.displayName === null) {
        const response = await firebase.auth().signInWithPopup(provider);
        const displayName = response.user?.displayName;
        const email = response.user?.email;
        return { displayName, email } as PayLoad;
      } else {
        const displayName = req.displayName;
        const email = req.email;
        return { displayName, email } as PayLoad;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const logout = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    await firebase.auth().signOut();
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.pending = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.pending = false;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.authenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.pending = false;
      state.error = action.error;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.authenticated = false;
      state.displayName = initialState.displayName;
      state.email = initialState.email;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});

export default authSlice.reducer;
