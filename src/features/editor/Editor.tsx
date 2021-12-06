import { Pane, toaster } from "evergreen-ui";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import DocumentPreview from "./components/DocumentPreview/DocumentPreview";
import DocumentsList from "./components/DocumentsList";
import Form from "./components/Form/Form";
import { useReactToPrint } from "react-to-print";
import { CVDocument, fetchDocuments, saveDocument } from "./editorSlice";
import {
  documentsListSelector,
  fetchingDocumentsSelector,
} from "./editorSelectors";
import emptyDocument from "../../assets/emptyDocument.json";
import { useMediaQuery } from "react-responsive";
import MobileNavigator, { TabTypes } from "./components/MobileNavigator";
import SavePopup from "./components/SavePopup";
import { isUserAuthenticatedSelector } from "../auth/authSelectors";

const Documents = () => {
  const dispatch = useAppDispatch();
  const previewRef = useRef<HTMLDivElement>(null);
  const documents = useAppSelector(documentsListSelector);
  const fetchingDocuments = useAppSelector(fetchingDocumentsSelector);
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1350px)" });
  const isAuthenticated = useAppSelector(isUserAuthenticatedSelector);

  const [printing, setPrinting] = useState<boolean>(false);
  const [active, setActive] = useState<number>(0);
  const [edited, setEdited] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<TabTypes>("DocumentsList");
  const [activeDocument, setActiveDocument] = useState<CVDocument>(
    emptyDocument as CVDocument
  );

  useEffect(() => {
    setEdited(false);
  }, [active]);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  useEffect(() => {
    setActiveDocument(documents[active]);
  }, [documents, active]);

  useEffect(() => {
    if (isAuthenticated) {
      document.title = `${activeDocument.meta.name} | CV Creator`;
    } else {
      document.title = "Sign In | CV Creator";
    }
  }, [activeDocument, isAuthenticated]);

  const confirmLeave = useCallback((e: any) => {
    e.returnValue = "You have unsaved changes!\nDo you want to leave document?";
    return "You have unsaved changes!\nDo you want to leave document?";
  }, []);

  useEffect(() => {
    if (!edited) return;
    window.addEventListener("beforeunload", confirmLeave);
    return () => window.removeEventListener("beforeunload", confirmLeave);
  }, [edited, confirmLeave]);

  const onSetActiveDocument = useCallback((document: CVDocument) => {
    setEdited(true);
    setActiveDocument(document);
  }, []);

  const onDocumentsSaveClicked = useCallback(async () => {
    try {
      await dispatch(saveDocument({ index: active, document: activeDocument }));
      toaster.notify(`${activeDocument.meta.name} saved`, { duration: 2 });
      setEdited(false);
    } catch (error) {
      toaster.danger("Error while saving", { duration: 2 });
      console.warn(error);
    }
  }, [dispatch, active, activeDocument]);

  const onSetActive = useCallback(
    async (index: number) => {
      if (edited) {
        await onDocumentsSaveClicked();
      }
      setActive(index);
      setSelectedTab("DocumentForm");
    },
    [edited, onDocumentsSaveClicked]
  );

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
    onBeforePrint: () => setPrinting(true),
    onAfterPrint: () => setPrinting(false),
  });

  return (
    <Pane
      display="grid"
      overflow="hidden"
      gridTemplateRows={isDesktopOrLaptop ? "1fr" : "auto 1fr"}
    >
      <MobileNavigator
        isDisplayed={!isDesktopOrLaptop && "DocumentsList" !== selectedTab}
        selectedTab={selectedTab}
        onTabSelected={setSelectedTab}
      />

      <Pane
        display="grid"
        gridTemplateColumns={isDesktopOrLaptop ? "auto 1fr auto" : "1fr"}
        overflow="hidden"
        maxWidth={2000}
        marginX={isDesktopOrLaptop ? "0" : "0"}
        borderLeft
      >
        <Pane
          overflow="scroll"
          background="white"
          borderRight
          zIndex={1}
          display={
            isDesktopOrLaptop || selectedTab === "DocumentsList"
              ? "block"
              : "none"
          }
        >
          <DocumentsList
            edited={edited}
            documents={
              fetchingDocuments ? [emptyDocument as CVDocument] : documents
            }
            active={active}
            setActive={onSetActive}
          />
        </Pane>

        <Pane
          display={
            isDesktopOrLaptop || selectedTab === "DocumentForm"
              ? "grid"
              : "none"
          }
          overflow="hidden"
          elevation={4}
          gridTemplateRows="1fr auto"
        >
          <Pane overflow="scroll" marginBottom={-56} borderRight>
            <Form
              setActive={setActive}
              documentIndex={active}
              setActiveDocument={onSetActiveDocument}
              handlePrint={handlePrint}
              document={
                fetchingDocuments
                  ? (emptyDocument as CVDocument)
                  : activeDocument
              }
            />
          </Pane>
          <SavePopup
            isDisplayed={edited}
            onDocumentsSaveClicked={onDocumentsSaveClicked}
            isDesktopOrLaptop={isDesktopOrLaptop}
          />
        </Pane>

        <Pane
          overflow="hidden"
          display={
            isDesktopOrLaptop || selectedTab === "DocumentPreview"
              ? "grid"
              : "none"
          }
          maxHeight={1000}
          padding={16}
          background="gray200"
        >
          <Pane display="grid" overflow="hidden" width="100%" elevation={4}>
            <DocumentPreview
              document={
                fetchingDocuments
                  ? (emptyDocument as CVDocument)
                  : activeDocument
              }
            />
          </Pane>
        </Pane>

        <Pane
          position="absolute"
          width="21cm"
          height="30cm"
          zIndex={printing ? 999 : -999}
          right={0}
          elevation={3}
          ref={previewRef}
        >
          <DocumentPreview
            document={
              fetchingDocuments ? (emptyDocument as CVDocument) : activeDocument
            }
          />
        </Pane>
      </Pane>
    </Pane>
  );
};

export default Documents;
