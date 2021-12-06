import { ChangeEvent, useCallback } from "react";

import { Pane } from "evergreen-ui";
import FormCard from "./FormCard";

import lng from "../../../../../assets/languages.en.json";
import { CVDocument } from "../../../editorSlice";
import Input from "../../../../../ui/Input";
import produce from "immer";

interface InterestsFormProps {
  interests: string;
  setActiveDocument: Function;
}

const InterestsForm = ({
  interests,
  setActiveDocument,
}: InterestsFormProps) => {
  const onInterestsChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.interests = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  return (
    <FormCard title={lng.interests}>
      <Pane display="grid">
        <Input
          label="What are your hobbies?"
          placeholder=""
          value={interests}
          onChange={onInterestsChanged}
        />
      </Pane>
    </FormCard>
  );
};

export default InterestsForm;
