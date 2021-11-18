import { ChangeEvent } from "react";

import { Pane, TextInput } from "evergreen-ui";
import Card from "../../../components/ui/Card";

import lng from "../../../languages/languages.en.json";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { setInterests, setSummary } from "../formSlice";

const Interests = ({}) => {
  const { interests } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  const onInterestsChanged = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setInterests(e.currentTarget.value));
  };

  return (
    <Card title={lng.interests}>
      <Pane display="grid">
        <TextInput
          width="auto"
          resize="none"
          placeholder=""
          value={interests}
          onChange={onInterestsChanged}
        />
      </Pane>
    </Card>
  );
};

export default Interests;
