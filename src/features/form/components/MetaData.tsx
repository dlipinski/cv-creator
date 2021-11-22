import {
  Button,
  DuplicateIcon,
  Label,
  MinusIcon,
  Pane,
  RemoveIcon,
  TextInput,
  TrashIcon,
} from "evergreen-ui";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Card from "../../../components/ui/Card";
import DangerousButton from "../../../components/ui/DangerousButton";
import { removeDocument, selectActiveDocument } from "../formSlice";
import { MouseEvent } from "react";
const MetaData = () => {
  const {
    meta: { name },
  } = useAppSelector(selectActiveDocument);
  const dispatch = useAppDispatch();

  const onRemoveClicked = (event: MouseEvent<HTMLButtonElement>) => {
    dispatch(removeDocument());
  };
  return (
    <Card
      title={name || "Document"}
      headerButtons={[
        <Button
          iconBefore={DuplicateIcon}
          appearance="minimal"
          onClick={onRemoveClicked}
        >
          Clone Document
        </Button>,
        <DangerousButton
          onClick={onRemoveClicked}
          type=""
          title="Remove Document"
          icon={TrashIcon}
          appearance="minimal"
        />,
      ]}
    >
      <Pane display="grid">
        <Label size={300}>Name</Label>
        <TextInput value={name} />
      </Pane>
    </Card>
  );
};

export default MetaData;
