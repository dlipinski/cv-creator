import { ChangeEvent } from "react";

import {
  Pane,
  Textarea,
  IconButton,
  ChevronUpIcon,
  ChevronDownIcon,
  RemoveIcon,
  Label,
  TextInput,
} from "evergreen-ui";
import Card from "../../../components/ui/Card";

import lng from "../../../languages/languages.en.json";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  Experience,
  moveDutyDown,
  moveDutyUp,
  removeDuty,
  setDutyDetails,
  setDutyName,
} from "../formSlice";

type DutiesProps = {
  experience: Experience;
  experienceIndex: number;
};

const Duties = ({ experience, experienceIndex }: DutiesProps) => {
  const dispatch = useAppDispatch();

  const onRemoveClicked = (index: number) => {
    dispatch(removeDuty({ experienceIndex, dutyIndex: index }));
  };

  const onMoveUpClicked = (index: number) => {
    dispatch(moveDutyUp({ experienceIndex, dutyIndex: index }));
  };

  const onMoveDownClicked = (index: number) => {
    dispatch(moveDutyDown({ experienceIndex, dutyIndex: index }));
  };

  const onNameChanged = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    dispatch(
      setDutyName({
        experienceIndex,
        dutyIndex: index,
        value: e.currentTarget.value,
      })
    );
  };

  const onDetailsChanged = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    dispatch(
      setDutyDetails({
        experienceIndex,
        dutyIndex: index,
        value: e.currentTarget.value,
      })
    );
  };

  return (
    <Pane display="grid" gap={16}>
      {experience.duties.map((duty, i: number) => (
        <Card
          title={
            duty.name ||
            `Duty ${i + 1} (${
              experience.details
                ? experience.details
                : `Experience ${experienceIndex + 1}`
            })`
          }
          level={2}
          headerButtons={[
            <IconButton
              icon={ChevronUpIcon}
              disabled={i === 0}
              intent={i === 0 ? "danger" : "default"}
              onClick={() => onMoveUpClicked(i)}
            />,
            <IconButton
              icon={ChevronDownIcon}
              disabled={i === experience.duties.length - 1}
              intent={i === experience.duties.length - 1 ? "danger" : "default"}
              onClick={() => onMoveDownClicked(i)}
            />,
            <IconButton
              icon={RemoveIcon}
              intent="danger"
              disabled={
                experience.duties.length === 1 &&
                experience.duties[0].name === "" &&
                experience.duties[0].details === ""
              }
              onClick={() => onRemoveClicked(i)}
            />,
          ]}
        >
          <Pane display="grid" gap={16}>
            <Pane display="grid">
              <Label size={300}>Description</Label>
              <Textarea
                rows={3}
                width="auto"
                resize="none"
                placeholder="Maintaining and developing an application based on data from the SAP system."
                value={duty.name}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  onNameChanged(e, i)
                }
              />
            </Pane>
            <Pane display="grid">
              <Label size={300}>Technologies</Label>
              <TextInput
                width="auto"
                value={duty.details}
                placeholder="Node/SAP"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onDetailsChanged(e, i)
                }
              />
            </Pane>
          </Pane>
        </Card>
      ))}
    </Pane>
  );
};

export default Duties;
