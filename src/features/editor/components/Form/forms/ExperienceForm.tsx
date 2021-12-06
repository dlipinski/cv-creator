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
import { CVDocument, Experience } from "../../../editorSlice";

import lng from "../../../../../assets/languages.en.json";

import Duties from "./DutiesSubForm";
import FormCard from "./FormCard";
import DangerousButton from "../../../../../ui/DangerousButton";
import Input from "../../../../../ui/Input";
import produce from "immer";
import { useMediaQuery } from "react-responsive";

interface ExperienceFormProps {
  experience: Experience[];
  setActiveDocument: Function;
}

const ExperienceForm = ({
  experience,
  setActiveDocument,
}: ExperienceFormProps) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1350px)",
  });

  const onNewExperienceClicked = useCallback(
    (e: MouseEvent<HTMLButtonElement>) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.experience.push({
            from: "",
            to: "",
            name: "",
            details: "",
            duties: [{ name: "", details: "" }],
          });
        })
      ),
    [setActiveDocument]
  );

  const onNewDutyClicked = useCallback(
    (i: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.experience[i].duties.push({
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
          draft.experience = draft.experience.filter((_, i) => i !== index);
          if (draft.experience.length === 0) {
            draft.experience.push({
              from: "",
              to: "",
              name: "",
              details: "",
              duties: [{ name: "", details: "" }],
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
          const draftExperience = draft.experience[index];
          draft.experience[index] = draft.experience[index - 1];
          draft.experience[index - 1] = draftExperience;
        })
      ),
    [setActiveDocument]
  );

  const onMoveDownClicked = useCallback(
    (index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          const draftExperience = draft.experience[index];
          draft.experience[index] = draft.experience[index + 1];
          draft.experience[index + 1] = draftExperience;
        })
      ),
    [setActiveDocument]
  );

  const onToChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.experience[index].to = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  const onFromChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.experience[index].from = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  const onNameChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.experience[index].name = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  const onDetailsChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.experience[index].details = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  return (
    <FormCard
      title={lng.experience}
      headerButtons={[
        <Button
          appearance="minimal"
          iconBefore={PlusIcon}
          onClick={onNewExperienceClicked}
        >
          New Experience
        </Button>,
      ]}
    >
      <Pane display="grid" gap={8}>
        {experience.map((exp, i) => (
          <FormCard
            title={"Experience " + (i + 1)}
            level={1}
            headerButtons={[
              <Button
                appearance="minimal"
                iconBefore={PlusIcon}
                onClick={() => onNewDutyClicked(i)}
              >
                New Duty
              </Button>,
              <IconButton
                appearance="minimal"
                icon={ChevronUpIcon}
                disabled={i === 0}
                intent={i === 0 - 1 ? "danger" : "default"}
                onClick={() => onMoveUpClicked(i)}
              />,
              <IconButton
                appearance="minimal"
                icon={ChevronDownIcon}
                disabled={i === experience.length - 1}
                intent={i === experience.length - 1 ? "danger" : "default"}
                onClick={() => onMoveDownClicked(i)}
              />,
              <DangerousButton
                appearance="minimal"
                icon={RemoveIcon}
                type="justIcon"
                disabled={
                  experience.length === 1 &&
                  experience[0].from === "" &&
                  experience[0].to === "" &&
                  experience[0].name === "" &&
                  experience[0].details === "" &&
                  experience[0].duties.length === 1 &&
                  experience[0].duties[0].name === "" &&
                  experience[0].duties[0].details === ""
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
              <Pane display="grid" gap={8}>
                <Input
                  label="From"
                  placeholder="2018"
                  value={exp.from}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onFromChanged(e, i)
                  }
                />
                <Input
                  label="To"
                  placeholder="2020"
                  value={exp.to}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onToChanged(e, i)
                  }
                />
              </Pane>
              <Pane display="grid" gap={8}>
                <Input
                  label="Position"
                  placeholder="Mid Developer"
                  value={exp.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onNameChanged(e, i)
                  }
                />
                <Input
                  label="Company"
                  placeholder="Very Important Company inc."
                  value={exp.details}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onDetailsChanged(e, i)
                  }
                />
              </Pane>
            </Pane>
            <Duties
              setActiveDocument={setActiveDocument}
              experience={exp}
              experienceIndex={i}
            />
          </FormCard>
        ))}
      </Pane>
    </FormCard>
  );
};

export default ExperienceForm;
