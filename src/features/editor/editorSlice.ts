import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import firebase from "firebase";
import { RootState } from "../../app/store";

import emptyDocument from "../../assets/emptyDocument.json";
import example1 from "../../assets/example1.json";
import example2 from "../../assets/example2.json";
import example3 from "../../assets/example3.json";

export type LanguageType = "en" | "pl" | "de";

export interface Meta {
  name: string;
  language: LanguageType;
}

export interface Personal {
  firstName: string;
  lastName: string;
  position: string;
  photo: string;
}

export interface Contact {
  phone: string;
  email: string;
  address: string;
}

export interface Skill {
  name: string;
  details: string;
}

export interface Language {
  name: string;
  details: string;
}

export interface Duty {
  name: string;
  details: string;
}

export interface Experience {
  from: string;
  to: string;
  name: string;
  details: string;
  duties: Duty[];
}

export interface Education {
  from: string;
  to: string;
  name: string;
  details: string;
}

export interface Project {
  name: string;
  details: string;
  link: string;
}

export interface CVDocument {
  meta: Meta;
  personal: Personal;
  contact: Contact;
  summary: string;
  skills: Skill[];
  languages: Language[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  interests: string;
}

export interface EditorState {
  fetchingDocuments: boolean;
  savingDocument: boolean;
  documents: CVDocument[];
}

export const initialState: EditorState = {
  fetchingDocuments: false,
  savingDocument: false,
  documents: [
    example1 as CVDocument,
    example2 as CVDocument,
    example3 as CVDocument,
  ],
};

export const fetchDocuments = createAsyncThunk<
  CVDocument[],
  undefined,
  { state: RootState }
>("fetchDocuments", async (_, thunkAPI) => {
  try {
    const currentUser: any = firebase.auth().currentUser;
    const userRef = firebase
      .database()
      .ref(`/users/${currentUser.uid}/documents`);
    const snapshot = await userRef.once("value");
    return snapshot.val() as CVDocument[];
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const removeDocument = createAsyncThunk<
  number,
  number,
  { state: RootState }
>("removeDocument", async (index, thunkApi) => {
  try {
    const currentUser: any = firebase.auth().currentUser;
    const userDocumentRef = firebase
      .database()
      .ref(`/users/${currentUser.uid}/documents/${index}`);
    await userDocumentRef.remove();
    return index as number;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.message });
  }
});

export const saveDocument = createAsyncThunk<
  { document: CVDocument; index: number },
  { document: CVDocument; index: number },
  { state: RootState }
>("saveDocument", async ({ document, index }, thunkAPI) => {
  try {
    const currentUser: any = firebase.auth().currentUser;
    const userDocumentRef = firebase
      .database()
      .ref(`/users/${currentUser.uid}/documents/${index}`);
    await userDocumentRef.set(document);
    return { document, index } as { document: CVDocument; index: number };
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    loadTemplateDocuments: (state) => {
      state.documents = [
        example1 as CVDocument,
        example2 as CVDocument,
        example3 as CVDocument,
      ];
    },
    removeAllDocuments: (state) => {
      state.documents = [];
    },
    setDocument: (state, action) => {
      const { index, document } = action.payload;
      state.documents[index] = document;
    },
    addNewDocument: (state) => {
      state.documents.push(emptyDocument as CVDocument);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        removeDocument.fulfilled,
        (state, action: PayloadAction<number>) => {
          const index = action.payload;
          state.documents = state.documents.filter((doc, i) => i !== index);
        }
      )
      .addCase(fetchDocuments.pending, (state) => {
        state.fetchingDocuments = true;
      })
      .addCase(fetchDocuments.rejected, (state) => {
        state.fetchingDocuments = false;
      })
      .addCase(
        fetchDocuments.fulfilled,
        (state, action: PayloadAction<CVDocument[]>) => {
          state.documents = action.payload || [emptyDocument];
          state.fetchingDocuments = false;
        }
      )
      .addCase(saveDocument.pending, (state) => {
        state.savingDocument = true;
      })
      .addCase(
        saveDocument.fulfilled,
        (
          state,
          action: PayloadAction<{ document: CVDocument; index: number }>
        ) => {
          const { document, index } = action.payload;
          state.documents[index] = document;
          state.savingDocument = false;
        }
      );
  },
});

export const {
  addNewDocument,
  setDocument,
  removeAllDocuments,
  loadTemplateDocuments,
} = editorSlice.actions;

export default editorSlice.reducer;
