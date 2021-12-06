import { createSelector } from "reselect";
import { RootState } from "../../app/store";
import { EditorState } from "./editorSlice";

export const editorSelector: (state: RootState) => EditorState = (
  state: RootState
) => state.editor;

export const fetchingDocumentsSelector = createSelector(
  editorSelector,
  (editor) => {
    return editor.fetchingDocuments;
  }
);

export const documentsListSelector = createSelector(
  editorSelector,
  (editor) => {
    return editor.documents;
  }
);
