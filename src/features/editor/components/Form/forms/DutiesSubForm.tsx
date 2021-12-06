import { ChangeEvent, useCallback } from "react";

import {
  Pane,
  IconButton,
  ChevronUpIcon,
  ChevronDownIcon,
  RemoveIcon,
} from "evergreen-ui";
import FormCard from "./FormCard";

import { CVDocument, Experience } from "../../../editorSlice";

import DangerousButton from "../../../../../ui/DangerousButton";
import Textarea from "../../../../../ui/Textarea";
import Input from "../../../../../ui/Input";
import produce from "immer";

type DutiesProps = {
  experience: Experience;
  experienceIndex: number;
  setActiveDocument: Function;
};

const DutiesSubForm = ({
  experience,
  experienceIndex,
  setActiveDocument,
}: DutiesProps) => {
  const onNameChanged = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>, index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.experience[experienceIndex].duties[index].name = e.target.value;
        })
      ),
    [setActiveDocument, experienceIndex]
  );

  const onDetailsChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.experience[experienceIndex].duties[index].details =
            e.target.value;
        })
      ),
    [setActiveDocument, experienceIndex]
  );

  const onMoveUpClicked = useCallback(
    (index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          const draftDuty = draft.experience[experienceIndex].duties[index];
          draft.experience[experienceIndex].duties[index] =
            draft.experience[experienceIndex].duties[index - 1];
          draft.experience[experienceIndex].duties[index - 1] = draftDuty;
        })
      ),
    [setActiveDocument, experienceIndex]
  );

  const onMoveDownClicked = useCallback(
    (index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          const draftDuty = draft.experience[experienceIndex].duties[index];
          draft.experience[experienceIndex].duties[index] =
            draft.experience[experienceIndex].duties[index + 1];
          draft.experience[experienceIndex].duties[index + 1] = draftDuty;
        })
      ),
    [setActiveDocument, experienceIndex]
  );

  const onRemoveClicked = useCallback(
    (index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.experience[experienceIndex].duties = draft.experience[
            experienceIndex
          ].duties.filter((_, i) => i !== index);
          if (draft.experience[experienceIndex].duties.length === 0) {
            draft.experience[experienceIndex].duties.push({
              name: "",
              details: "",
            });
          }
        })
      ),
    [setActiveDocument, experienceIndex]
  );

  return (
    <Pane display="grid" gap={16}>
      {experience.duties.map((duty, i: number) => (
        <FormCard
          title={`Duty ${i + 1} (${`Experience ${experienceIndex + 1}`})`}
          level={2}
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
              disabled={i === experience.duties.length - 1}
              intent={i === experience.duties.length - 1 ? "danger" : "default"}
              onClick={() => onMoveDownClicked(i)}
            />,
            <DangerousButton
              appearance="minimal"
              icon={RemoveIcon}
              type="justIcon"
              disabled={
                experience.duties.length === 1 &&
                experience.duties[0].name === "" &&
                experience.duties[0].details === ""
              }
              onClick={() => onRemoveClicked(i)}
            />,
          ]}
        >
          <Pane display="grid" gap={8}>
            <Textarea
              label="Description"
              rows={3}
              placeholder="Maintaining and developing an application based on data from the SAP system."
              value={duty.name}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                onNameChanged(e, i)
              }
            />
            <Input
              label="Technologies"
              value={duty.details}
              placeholder="Node/SAP"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onDetailsChanged(e, i)
              }
            />
          </Pane>
        </FormCard>
      ))}
    </Pane>
  );
};

export default DutiesSubForm;
