import { ChangeEvent } from "react";

import {
  Pane,
  Button,
  AddIcon,
  TextInput,
  IconButton,
  RemoveIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "evergreen-ui";
import Card from "../../../components/ui/Card";

import lng from "../../../languages/languages.en.json";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  addNewLanguage,
  moveLanguageDown,
  moveLanguageUp,
  removeLanguage,
  setLanguageDetails,
  setLanguageName,
} from "../formSlice";

const Languages = ({}) => {
  const { languages } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  const onNewLanguageClicked = () => {
    dispatch(addNewLanguage());
  };

  const onNameChanged = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    dispatch(
      setLanguageName({ languageIndex: index, value: e.currentTarget.value })
    );
  };

  const onDetailsChanged = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    dispatch(
      setLanguageDetails({ languageIndex: index, value: e.currentTarget.value })
    );
  };

  const onMoveUpClicked = (index: number) => {
    dispatch(moveLanguageUp(index));
  };

  const onMoveDownClicked = (index: number) => {
    dispatch(moveLanguageDown(index));
  };

  const onRemoveClicked = (index: number) => {
    dispatch(removeLanguage(index));
  };

  return (
    <Card
      title={lng.languages}
      headerButtons={[
        <Button iconBefore={AddIcon} onClick={onNewLanguageClicked}>
          New Language
        </Button>,
      ]}
    >
      <Pane display="grid" gap={16}>
        {languages.map((language, i) => (
          <Pane
            display="grid"
            gap={8}
            gridTemplateColumns="1fr 2fr auto auto auto"
          >
            <TextInput
              width="auto"
              placeholder="English"
              value={language.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onNameChanged(e, i)
              }
            />
            <TextInput
              width="auto"
              placeholder="C1"
              value={language.details}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onDetailsChanged(e, i)
              }
            />
            <IconButton
              icon={ChevronUpIcon}
              disabled={i === 0}
              intent={i === 0 ? "danger" : "default"}
              onClick={() => onMoveUpClicked(i)}
            />
            <IconButton
              icon={ChevronDownIcon}
              disabled={i === languages.length - 1}
              intent={i === languages.length - 1 ? "danger" : "default"}
              onClick={() => onMoveDownClicked(i)}
            />
            <IconButton
              intent="danger"
              icon={RemoveIcon}
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
    </Card>
  );
};

export default Languages;
