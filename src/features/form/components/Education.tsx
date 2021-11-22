import { ChangeEvent, useCallback } from "react";

import {
  Pane,
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
  addNewEducation,
  moveEducationDown,
  moveEducationUp,
  removeEducation,
  selectActiveDocument,
  setEducationDetails,
  setEducationFrom,
  setEducationName,
  setEducationTo,
} from "../formSlice";
import { store } from "../../../app/store";
import DangerousButton from "../../../components/ui/DangerousButton";

const Education = ({}) => {
  const { education } = useAppSelector(selectActiveDocument);
  const dispatch = useAppDispatch();

  const onNewEducationClicked = () => {
    dispatch(addNewEducation());
  };

  const onRemoveClicked = (index: number) => {
    dispatch(removeEducation(index));
  };

  const onMoveUpClicked = (index: number) => {
    dispatch(moveEducationUp(index));
  };

  const onMoveDownClicked = (index: number) => {
    dispatch(moveEducationDown(index));
  };

  const onFromChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    dispatch(
      setEducationFrom({ educationIndex: index, value: e.currentTarget.value })
    );
  };

  const onToChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    dispatch(
      setEducationTo({
        educationIndex: index,
        value: e.currentTarget.value,
      })
    );
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    dispatch(
      setEducationName({ educationIndex: index, value: e.currentTarget.value })
    );
  };

  const onDetailsChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    dispatch(
      setEducationDetails({
        educationIndex: index,
        value: e.currentTarget.value,
      })
    );
  };

  return (
    <Card
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
          <Card
            title={
              edu.from || edu.to || edu.details
                ? `${edu.from} - ${edu.to} (${edu.details})`
                : "Education " + (i + 1)
            }
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
              gridTemplateColumns="1fr 2fr"
            >
              <Pane display="grid" gap={8}>
                <Pane display="grid">
                  <Label size={300}>From</Label>
                  <TextInput
                    width="auto"
                    value={edu.from}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onFromChange(e, i)
                    }
                  />
                </Pane>
                <Pane display="grid">
                  <Label size={300}>To</Label>
                  <TextInput
                    width="auto"
                    value={edu.to}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onToChange(e, i)
                    }
                  />
                </Pane>
              </Pane>
              <Pane display="grid" gap={8}>
                <Pane display="grid">
                  <Label size={300}>Field</Label>
                  <TextInput
                    width="auto"
                    value={edu.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onNameChange(e, i)
                    }
                  />
                </Pane>
                <Pane display="grid">
                  <Label size={300}>School</Label>
                  <TextInput
                    width="auto"
                    value={edu.details}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onDetailsChange(e, i)
                    }
                  />
                </Pane>
              </Pane>
            </Pane>
          </Card>
        ))}
      </Pane>
    </Card>
  );
};

export default Education;
