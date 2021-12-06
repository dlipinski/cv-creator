import {
  Button,
  Label,
  Pane,
  PrintIcon,
  Select,
  toaster,
  TrashIcon,
} from "evergreen-ui";
import { useAppDispatch } from "../../../../../app/hooks";
import FormCard from "./FormCard";
import DangerousButton from "../../../../../ui/DangerousButton";
import {
  CVDocument,
  LanguageType,
  Meta,
  removeDocument,
} from "../../../editorSlice";
import { ChangeEvent, useCallback } from "react";
import Input from "../../../../../ui/Input";
import produce from "immer";

interface DocumentFormProps {
  meta: Meta;
  handlePrint: (() => void) | undefined;
  setActiveDocument: Function;
  setActive: Function;
  documentIndex: number;
}

const DocumentForm = ({
  meta,
  handlePrint,
  setActiveDocument,
  documentIndex,
  setActive,
}: DocumentFormProps) => {
  const dispatch = useAppDispatch();

  const onRemoveClicked = useCallback(async () => {
    try {
      setActive(0);
      await dispatch(removeDocument(documentIndex));
      toaster.notify("Document Removed", { duration: 2 });
    } catch (error) {
      toaster.danger("Error while removing", { duration: 2 });
      console.warn(error);
    }
  }, [dispatch, documentIndex, setActive]);

  const onNameChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.meta.name = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  const onLanguageChanged = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.meta.language = e.target.value as LanguageType;
        })
      ),
    [setActiveDocument]
  );

  return (
    <FormCard
      title="Document"
      headerButtons={[
        <DangerousButton
          onClick={onRemoveClicked}
          type=""
          title="Remove Document"
          icon={TrashIcon}
          appearance="minimal"
        />,

        <Button
          appearance="minimal"
          iconBefore={PrintIcon}
          onClick={() => (handlePrint ? handlePrint() : null)}
        >
          Print
        </Button>,
      ]}
    >
      <Pane display="grid" gridTemplateColumns="1fr 1fr" gap={16}>
        <Input label="Name" value={meta.name} onChange={onNameChanged} />
        <Pane display="grid" gap={2}>
          <Label size={300} paddingLeft={2}>
            Language
          </Label>
          <Select
            width="auto"
            value={meta.language}
            onChange={onLanguageChanged}
          >
            <option value="en">English</option>
            <option value="pl">Polish</option>
            <option value="de">German</option>
          </Select>
        </Pane>
      </Pane>
    </FormCard>
  );
};

export default DocumentForm;
