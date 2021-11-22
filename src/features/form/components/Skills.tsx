import { ChangeEvent } from "react";

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

import lng from "../../../languages/languages.en.json";
import Card from "../../../components/ui/Card";

import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  addNewSkill,
  moveSkillDown,
  moveSkillUp,
  removeSkill,
  selectActiveDocument,
  setSkillDetails,
  setSkillName,
} from "../formSlice";
import { store } from "../../../app/store";
import DangerousButton from "../../../components/ui/DangerousButton";

const Skills = () => {
  const { skills } = useAppSelector(selectActiveDocument);
  const dispatch = useAppDispatch();

  const onAddNewSkillClick = () => {
    dispatch(addNewSkill());
  };

  const onNameChanged = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSkillName({ skillIndex: index, value: e.currentTarget.value }));
  };

  const onDetailsChanged = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      setSkillDetails({ skillIndex: index, value: e.currentTarget.value })
    );
  };

  const onMoveUpClick = (index: number) => {
    dispatch(moveSkillUp(index));
  };

  const onMoveDownClick = (index: number) => {
    dispatch(moveSkillDown(index));
  };

  const onRemoveClick = (index: number) => {
    dispatch(removeSkill(index));
  };

  return (
    <Card
      title={lng.skills}
      headerButtons={[
        <Button
          appearance="minimal"
          iconBefore={PlusIcon}
          onClick={onAddNewSkillClick}
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
            gridTemplateColumns="1fr 2fr auto auto auto"
          >
            <TextInput
              placeholder="React"
              width="auto"
              value={skill.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onNameChanged(i, e)
              }
            />
            <TextInput
              placeholder="Functional/CRA/Redux-Toolkit/Web3"
              width="auto"
              value={skill.details}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onDetailsChanged(i, e)
              }
            />
            <IconButton
              appearance="minimal"
              icon={ChevronUpIcon}
              disabled={i === 0}
              intent={i === 0 ? "danger" : "default"}
              onClick={() => onMoveUpClick(i)}
            />
            <IconButton
              appearance="minimal"
              icon={ChevronDownIcon}
              disabled={i === skills.length - 1}
              intent={i === skills.length - 1 ? "danger" : "default"}
              onClick={() => onMoveDownClick(i)}
            />
            <DangerousButton
              appearance="minimal"
              icon={RemoveIcon}
              type="justIcon"
              disabled={
                skills.length === 1 &&
                skills[0].name === "" &&
                skills[0].details === ""
              }
              onClick={() => onRemoveClick(i)}
            />
          </Pane>
        ))}
      </Pane>
    </Card>
  );
};

export default Skills;
