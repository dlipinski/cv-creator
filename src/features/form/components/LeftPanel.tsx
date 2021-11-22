import {
  PlusIcon,
  Badge,
  Button,
  Heading,
  Pane,
  SavedIcon,
  Text,
  toaster,
  FloppyDiskIcon,
} from "evergreen-ui";
import { BsSaveFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addNewDocument, saveDocuments, setActive } from "../formSlice";

const cards = [
  "Meta",
  "Personal Data",
  "Contact Data",
  "Summary",
  "Skills",
  "Languages",
  "Experience",
  "Education",
  "Intrests",
];

const LeftPanel = () => {
  const { active, array, saving } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  const onDocumentClicked = (index: number) => {
    dispatch(setActive(index));
  };

  const onNewDocumentClicked = () => {
    dispatch(addNewDocument());
  };

  const onSaveClicked = async () => {
    try {
      await dispatch(saveDocuments({ active, array }));
      toaster.success("Saved succesfully", {
        duration: 1,
      });
    } catch (error) {
      toaster.danger("Error while saving");
      console.log(error);
    }
  };

  return (
    <Pane
      background="gray50"
      padding={16}
      gap={8}
      display="flex"
      width={200}
      flexDirection="column"
    >
      <Button
        onClick={onSaveClicked}
        iconBefore={FloppyDiskIcon}
        appearance="primary"
        marginBottom={8}
        isLoading={saving}
      >
        Save
      </Button>
      <Text
        paddingLeft={8}
        fontSize={10}
        color="muted"
        textTransform="uppercase"
        fontWeight="700"
        paddingTop={0}
        paddingBottom={8}
      >
        your Documents
      </Text>

      {array.map((document, i) => (
        <Pane display="grid" gap={2}>
          <Button
            appearance="minimal"
            onClick={() => onDocumentClicked(i)}
            style={
              i === active
                ? { backgroundColor: "#EBF0FF", color: "#3366FF" }
                : {}
            }
            justifyContent="flex-start"
          >
            {document.meta.name}
            <Badge color={i === active ? "blue" : "neutral"} marginLeft={8}>
              {document.meta.language.split("_")[0]}
            </Badge>
          </Button>
          {i === active && false && (
            <Pane display="grid" paddingLeft={16} gap={2}>
              {cards.map((key) => (
                <Button
                  appearance="minimal"
                  onClick={() => onDocumentClicked(i)}
                  justifyContent="flex-start"
                >
                  {key}
                </Button>
              ))}
            </Pane>
          )}
        </Pane>
      ))}
      <Button onClick={onNewDocumentClicked} iconBefore={PlusIcon}>
        New Document
      </Button>
    </Pane>
  );
};

export default LeftPanel;
