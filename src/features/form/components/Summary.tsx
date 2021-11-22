import { ChangeEvent } from "react";

import { Pane, Textarea } from "evergreen-ui";
import Card from "../../../components/ui/Card";

import lng from "../../../languages/languages.en.json";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { selectActiveDocument, setSummary } from "../formSlice";
import { store } from "../../../app/store";

const Summary = ({}) => {
  const { summary } = useAppSelector(selectActiveDocument);
  const dispatch = useAppDispatch();

  const onSummaryChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setSummary(e.currentTarget.value));
  };

  return (
    <Card title={lng.summary}>
      <Pane display="grid">
        <Textarea
          placeholder="An employee with almost 4 years of experience in a large (460+ employees) and medium (100+ employees) company. Experienced in team work, solving problems on his own, involved in projects and always in good relations with coworkers."
          width="auto"
          resize="none"
          value={summary}
          onChange={onSummaryChanged}
        />
      </Pane>
    </Card>
  );
};

export default Summary;
