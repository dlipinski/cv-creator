import { ChangeEvent, MouseEvent, useCallback } from "react";

import {
  Pane,
  IconButton,
  PlusIcon,
  Button,
  ChevronDownIcon,
  RemoveIcon,
  ChevronUpIcon,
  TextInput,
} from "evergreen-ui";

import lng from "../../../../../assets/languages.en.json";
import FormCard from "./FormCard";

import { CVDocument, Skill } from "../../../editorSlice";
import DangerousButton from "../../../../../ui/DangerousButton";
import produce from "immer";
import { useMediaQuery } from "react-responsive";

interface SkillsFormProps {
  skills: Skill[];
  setActiveDocument: Function;
}

const SkillsForm = ({ skills, setActiveDocument }: SkillsFormProps) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1350px)",
  });

  const onNewSkillClicked = useCallback(
    (e: MouseEvent<HTMLButtonElement>) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.skills.push({ name: "", details: "" });
        })
      ),
    [setActiveDocument]
  );

  const onNameChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.skills[index].name = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  const onDetailsChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.skills[index].details = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  const onMoveUpClicked = useCallback(
    (index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          const draftSkill = draft.skills[index];
          draft.skills[index] = draft.skills[index - 1];
          draft.skills[index - 1] = draftSkill;
        })
      ),
    [setActiveDocument]
  );

  const onMoveDownClicked = useCallback(
    (index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          const draftSkill = draft.skills[index];
          draft.skills[index] = draft.skills[index + 1];
          draft.skills[index + 1] = draftSkill;
        })
      ),
    [setActiveDocument]
  );

  const onRemoveClicked = useCallback(
    (index: number) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.skills = draft.skills.filter((_, i) => i !== index);
          if (draft.skills.length === 0) {
            draft.skills.push({ name: "", details: "" });
          }
        })
      ),
    [setActiveDocument]
  );

  return (
    <FormCard
      title={lng.skills}
      headerButtons={[
        <Button
          appearance="minimal"
          iconBefore={PlusIcon}
          onClick={onNewSkillClicked}
        >
          New Skill
        </Button>,
      ]}
    >
      <Pane display="grid" gap={16}>
        {skills.map((skill, i) => (
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
                placeholder="React"
                width="auto"
                value={skill.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onNameChanged(e, i)
                }
              />
              <TextInput
                placeholder="Functional/CRA/Redux-Toolkit/Web3"
                width="auto"
                value={skill.details}
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
                disabled={i === skills.length - 1}
                intent={i === skills.length - 1 ? "danger" : "default"}
                onClick={() => onMoveDownClicked(i)}
              />
            </Pane>
            <DangerousButton
              appearance="minimal"
              icon={RemoveIcon}
              type="justIcon"
              disabled={
                skills.length === 1 &&
                skills[0].name === "" &&
                skills[0].details === ""
              }
              onClick={() => onRemoveClicked(i)}
            />
          </Pane>
        ))}
      </Pane>
    </FormCard>
  );
};

export default SkillsForm;
