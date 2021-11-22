import { ChangeEvent } from "react";

import {
  Pane,
  Textarea,
  Button,
  PlusIcon,
  RemoveIcon,
  Label,
  TextInput,
  IconButton,
  ChevronUpIcon,
  ChevronDownIcon,
} from "evergreen-ui";
import Card from "../../../components/ui/Card";

import lng from "../../../languages/languages.en.json";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  addNewDuty,
  addNewExperience,
  moveExperienceDown,
  moveExperienceUp,
  removeExperience,
  selectActiveDocument,
  setExperienceDetails,
  setExperienceFrom,
  setExperienceName,
  setExperienceTo,
} from "../formSlice";
import Duties from "./Duties";
import { store } from "../../../app/store";
import DangerousButton from "../../../components/ui/DangerousButton";

const Experience = ({}) => {
  const { experience } = useAppSelector(selectActiveDocument);
  const dispatch = useAppDispatch();

  const onNewExperienceClicked = () => {
    dispatch(addNewExperience());
  };

  const onNewDutyClicked = (index: number) => {
    dispatch(addNewDuty(index));
  };

  const onRemoveClicked = (index: number) => {
    dispatch(removeExperience(index));
  };

  const onMoveUpClicked = (index: number) => {
    dispatch(moveExperienceUp(index));
  };

  const onMoveDownClicked = (index: number) => {
    dispatch(moveExperienceDown(index));
  };

  const onToChanged = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    dispatch(
      setExperienceTo({
        experienceIndex: index,
        value: e.currentTarget.value,
      })
    );
  };

  const onFromChanged = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    dispatch(
      setExperienceFrom({
        experienceIndex: index,
        value: e.currentTarget.value,
      })
    );
  };

  const onNameChanged = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    dispatch(
      setExperienceName({
        experienceIndex: index,
        value: e.currentTarget.value,
      })
    );
  };

  const onDetailsChanged = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    dispatch(
      setExperienceDetails({
        experienceIndex: index,
        value: e.currentTarget.value,
      })
    );
  };

  return (
    <Card
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
      <Pane display="grid" gap={16}>
        {experience.map((exp, i) => (
          <Card
            title={
              exp.from || exp.to || exp.details
                ? `${exp.from} - ${exp.to} (${exp.details})`
                : "Experience " + (i + 1)
            }
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
              gridTemplateColumns="1fr 2fr"
            >
              <Pane display="grid" gap={8}>
                <Pane display="grid">
                  <Label size={300}>From</Label>
                  <TextInput
                    width="auto"
                    placeholder="2018"
                    value={exp.from}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onFromChanged(e, i)
                    }
                  />
                </Pane>
                <Pane display="grid">
                  <Label size={300}>To</Label>
                  <TextInput
                    width="auto"
                    placeholder="2020"
                    value={exp.to}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onToChanged(e, i)
                    }
                  />
                </Pane>
              </Pane>
              <Pane display="grid" gap={8}>
                <Pane display="grid">
                  <Label size={300}>Position</Label>
                  <TextInput
                    width="auto"
                    placeholder="Junior Developer"
                    value={exp.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onNameChanged(e, i)
                    }
                  />
                </Pane>
                <Pane display="grid">
                  <Label size={300}>Company</Label>
                  <TextInput
                    width="auto"
                    placeholder="Very Important Company inc."
                    value={exp.details}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onDetailsChanged(e, i)
                    }
                  />
                </Pane>
              </Pane>
            </Pane>
            <Duties experience={exp} experienceIndex={i} />
          </Card>
        ))}
      </Pane>
    </Card>
  );
};

export default Experience;
