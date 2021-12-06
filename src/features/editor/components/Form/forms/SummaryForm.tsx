import { ChangeEvent, useCallback } from "react";

import { Pane } from "evergreen-ui";
import FormCard from "./FormCard";

import lng from "../../../../../assets/languages.en.json";
import { CVDocument } from "../../../editorSlice";
import Textarea from "../../../../../ui/Textarea";
import produce from "immer";

interface SummaryFormProps {
  summary: string;
  setActiveDocument: Function;
}

const SummaryForm = ({ summary, setActiveDocument }: SummaryFormProps) => {
  const onSummaryChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setActiveDocument(
        produce((draft: CVDocument) => {
          draft.summary = e.target.value;
        })
      ),
    [setActiveDocument]
  );

  return (
    <FormCard title={lng.summary}>
      <Pane display="grid">
        <Textarea
          placeholder="An employee with almost 4 years of experience in a large (460+ employees) and medium (100+ employees) company. Experienced in team work, solving problems on his own, involved in projects and always in good relations with coworkers."
          label="Few words about you"
          value={summary}
          onChange={onSummaryChanged}
        />
      </Pane>
    </FormCard>
  );
};

export default SummaryForm;
