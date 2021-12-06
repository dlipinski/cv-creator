import { ChangeEvent, MouseEvent, useCallback } from "react";
import {
  Pane,
  Button,
  PlusIcon,
  TextInput,
  IconButton,
  RemoveIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "evergreen-ui";
import { CVDocument, Language } from "../../../editorSlice";

import lng from "../../../../../assets/languages.en.json";

import DangerousButton from "../../../../../ui/DangerousButton";
import FormCard from "./FormCard";
import produce from "immer";
import { useMediaQuery } from "react-responsive";

interface LanguagesFormProps {
  languages: Language[];
  setActiveDocument: Function;
}

const LanguagesForm = ({
  languages,
  setActiveDocument,
}: LanguagesFormProps) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1350px)",
  });

  const onNewLanguageClicked = useCallback(
    (e: MouseEvent<HTMLButtonElement>) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.languages.push({ name: "", details: "" });
        })
      ),
    [setActiveDocument]
  );

  const onNameChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.languages[index].name = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  const onDetailsChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.languages[index].details = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  const onMoveUpClicked = useCallback(
    (index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          const draftLanguage = draft.languages[index];
          draft.languages[index] = draft.languages[index - 1];
          draft.languages[index - 1] = draftLanguage;
        })
      ),
    [setActiveDocument]
  );

  const onMoveDownClicked = useCallback(
    (index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          const draftLanguage = draft.languages[index];
          draft.languages[index] = draft.languages[index + 1];
          draft.languages[index + 1] = draftLanguage;
        })
      ),
    [setActiveDocument]
  );

  const onRemoveClicked = useCallback(
    (index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.languages = draft.languages.filter((_, i) => i !== index);
          if (draft.languages.length === 0) {
            draft.languages.push({ name: "", details: "" });
          }
        })
      ),
    [setActiveDocument]
  );

  return (
    <FormCard
      title={lng.languages}
      headerButtons={[
        <Button
          appearance="minimal"
          iconBefore={PlusIcon}
          onClick={onNewLanguageClicked}
        >
          New Language
        </Button>,
      ]}
    >
      <Pane display="grid" gap={16}>
        {languages.map((language, i) => (
          <Pane
            display="grid"
            gap={8}
            gridTemplateColumns="1fr auto auto"
            alignItems="center"
          >
            <Pane
              display="grid"
              gridTemplateColumns={isDesktopOrLaptop ? "1fr 2fr" : "1fr"}
              alignItems="center"
              gap={isDesktopOrLaptop ? 16 : 4}
            >
              <TextInput
                placeholder="English"
                width="auto"
                value={language.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onNameChanged(e, i)
                }
              />
              <TextInput
                placeholder="C1"
                width="auto"
                value={language.details}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onDetailsChanged(e, i)
                }
              />
            </Pane>
            <Pane
              display={isDesktopOrLaptop ? "flex" : "grid"}
              gap={isDesktopOrLaptop ? 16 : 8}
            >
              <IconButton
                appearance="minimal"
                icon={ChevronUpIcon}
                disabled={i === 0}
                intent={i === 0 ? "danger" : "default"}
                onClick={() => onMoveUpClicked(i)}
              />
              <IconButton
                appearance="minimal"
                icon={ChevronDownIcon}
                disabled={i === languages.length - 1}
                intent={i === languages.length - 1 ? "danger" : "default"}
                onClick={() => onMoveDownClicked(i)}
              />
            </Pane>
            <DangerousButton
              appearance="minimal"
              icon={RemoveIcon}
              type="justIcon"
              disabled={
                languages.length === 1 &&
                languages[0].name === "" &&
                languages[0].details === ""
              }
              onClick={() => onRemoveClicked(i)}
            />
          </Pane>
        ))}
      </Pane>
    </FormCard>
  );
};

export default LanguagesForm;
