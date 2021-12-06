import { ChangeEvent, MouseEvent, useCallback } from "react";

import {
  Pane,
  Button,
  PlusIcon,
  RemoveIcon,
  IconButton,
  ChevronUpIcon,
  ChevronDownIcon,
} from "evergreen-ui";
import FormCard from "./FormCard";

import lng from "../../../../../assets/languages.en.json";
import { CVDocument, Education } from "../../../editorSlice";
import DangerousButton from "../../../../../ui/DangerousButton";
import Input from "../../../../../ui/Input";
import produce from "immer";
import { useMediaQuery } from "react-responsive";

interface EducationFormProps {
  education: Education[];
  setActiveDocument: Function;
}

const EducationForm = ({
  education,
  setActiveDocument,
}: EducationFormProps) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1350px)",
  });

  const onNewEducationClicked = useCallback(
    (e: MouseEvent<HTMLButtonElement>) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.education.push({
            from: "",
            to: "",
            name: "",
            details: "",
          });
        })
      ),
    [setActiveDocument]
  );

  const onRemoveClicked = useCallback(
    (index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.education = draft.education.filter((_, i) => i !== index);
          if (draft.education.length === 0) {
            draft.education.push({
              from: "",
              to: "",
              name: "",
              details: "",
            });
          }
        })
      ),
    [setActiveDocument]
  );

  const onMoveUpClicked = useCallback(
    (index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          const draftEducation = draft.education[index];
          draft.education[index] = draft.education[index - 1];
          draft.education[index - 1] = draftEducation;
        })
      ),
    [setActiveDocument]
  );

  const onMoveDownClicked = useCallback(
    (index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          const draftEducation = draft.experience[index];
          draft.education[index] = draft.education[index + 1];
          draft.education[index + 1] = draftEducation;
        })
      ),
    [setActiveDocument]
  );

  const onToChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.education[index].to = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  const onFromChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.education[index].from = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  const onNameChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.education[index].name = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  const onDetailsChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.education[index].details = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  return (
    <FormCard
      title={lng.education}
      headerButtons={[
        <Button
          appearance="minimal"
          iconBefore={PlusIcon}
          onClick={onNewEducationClicked}
        >
          New Education
        </Button>,
      ]}
    >
      <Pane display="grid" gap={16}>
        {education.map((edu, i) => (
          <FormCard
            title={`Education ${i + 1}`}
            level={1}
            headerButtons={[
              <IconButton
                appearance="minimal"
                icon={ChevronUpIcon}
                disabled={i === 0}
                intent={i === 0 ? "danger" : "default"}
                onClick={() => onMoveUpClicked(i)}
              />,
              <IconButton
                appearance="minimal"
                icon={ChevronDownIcon}
                disabled={i === education.length - 1}
                intent={i === education.length - 1 ? "danger" : "default"}
                onClick={() => onMoveDownClicked(i)}
              />,
              <DangerousButton
                appearance="minimal"
                icon={RemoveIcon}
                type="justIcon"
                disabled={
                  education.length === 1 &&
                  education[0].from === "" &&
                  education[0].to === "" &&
                  education[0].name === "" &&
                  education[0].details === ""
                }
                onClick={() => onRemoveClicked(i)}
              />,
            ]}
          >
            <Pane
              display="grid"
              gap={8}
              paddingBottom={16}
              gridTemplateColumns={isDesktopOrLaptop ? "1fr 2fr" : "1fr"}
            >
              <Input
                label="From"
                placeholder="2018"
                value={edu.from}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onFromChanged(e, i)
                }
              />

              <Input
                label="Field"
                placeholder="IT - Web applications and databases"
                value={edu.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onNameChanged(e, i)
                }
              />
              <Input
                label="To"
                placeholder="2020"
                value={edu.to}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onToChanged(e, i)
                }
              />
              <Input
                label="School"
                placeholder="Uniwersytet Gdański (UG)"
                value={edu.details}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onDetailsChanged(e, i)
                }
              />
            </Pane>
          </FormCard>
        ))}
      </Pane>
    </FormCard>
  );
};

export default EducationForm;
