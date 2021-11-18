import { ChangeEvent } from "react";

import { Pane, Button, Label, TextInput, PlusIcon } from "evergreen-ui";
import Card from "../../../components/ui/Card";
import lng from "../../../languages/languages.en.json";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { setFirstName, setLastName, setPosition } from "../formSlice";

const PersonalData = () => {
  const { firstName, lastName, position } = useAppSelector(
    (state) => state.form
  );
  const dispatch = useAppDispatch();

  const onFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFirstName(e.currentTarget.value));
  };

  const onLastName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setLastName(e.currentTarget.value));
  };

  const onPosition = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPosition(e.currentTarget.value));
  };

  return (
    <Card title={lng.personalData}>
      <Pane
        display="grid"
        alignItems="center"
        gap={16}
        gridTemplateColumns="auto 1fr"
      >
        <Pane
          display="grid"
          placeContent="center"
          border
          background="white"
          borderRadius={4}
          height={100}
          width={100}
        >
          <Button iconBefore={PlusIcon} appearance="minimal">
            Photo
          </Button>
        </Pane>
        <Pane display="grid" gap={8}>
          <Pane display="grid" gap={8} gridTemplateColumns="1fr 1fr">
            <Pane display="grid">
              <Label size={300}>{lng.name}</Label>
              <TextInput
                placeholder="John"
                width="auto"
                value={firstName}
                onChange={onFirstName}
              />
            </Pane>
            <Pane display="grid">
              <Label size={300}>{lng.surname}</Label>
              <TextInput
                placeholder="Smith"
                width="auto"
                value={lastName}
                onChange={onLastName}
              />
            </Pane>
          </Pane>
          <Pane display="grid" paddingBottom={8}>
            <Label size={300}>{lng.position}</Label>
            <TextInput
              width="auto"
              placeholder="React/Vue Developer"
              value={position}
              onChange={onPosition}
            />
          </Pane>
        </Pane>
      </Pane>
    </Card>
  );
};

export default PersonalData;
