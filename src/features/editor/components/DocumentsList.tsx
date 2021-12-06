import {
  PlusIcon,
  Button,
  Pane,
  Tablist,
  Heading,
  Badge,
  Tab,
} from "evergreen-ui";
import { useAppDispatch } from "../../../app/hooks";
import DocumentPreview from "./DocumentPreview/DocumentPreview";
import { addNewDocument, CVDocument } from "../editorSlice";
import PreviewPlaceholder from "../../../ui/PreviewPlaceholder";
import { useMediaQuery } from "react-responsive";

interface DocumentsListProps {
  documents: CVDocument[];
  active: number;
  setActive: Function;
  edited: boolean;
}

const DocumentsList = ({
  documents,
  active,
  setActive,
  edited,
}: DocumentsListProps) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1350px)",
  });

  const dispatch = useAppDispatch();

  const onDocumentClicked = (index: number) => {
    setActive(index);
  };

  const onNewDocumentClicked = () => {
    dispatch(addNewDocument());
  };

  return (
    <Pane gap={8} padding={8} display="grid" gridTemplateRows="auto auto">
      <Heading paddingTop={16} size={600} textAlign="center">
        You have <br />
        {documents.length} document{documents.length > 1 && "s"}
      </Heading>
      <Button
        onClick={onNewDocumentClicked}
        appearance="minimal"
        iconBefore={PlusIcon}
      >
        New Document
      </Button>
      <Pane borderTop marginTop={4} marginBottom={0} />

      <Pane
        overflow="scroll"
        padding={2}
        display="flex"
        justifyContent="center"
      >
        {
          <Tablist>
            {documents.map((document, index) => (
              <Tab
                key={index}
                onSelect={() => onDocumentClicked(index)}
                isSelected={index === active}
                height="auto"
                paddingX={8}
                direction="vertical"
              >
                <Pane display="grid" gap={8} padding={8}>
                  <Pane
                    height={isDesktopOrLaptop ? 175 : 300}
                    borderRadius={2}
                    textAlign="left"
                    overflow="hidden"
                    position="relative"
                    border
                  >
                    <DocumentPreview document={document} />
                    {edited && index === active && (
                      <Badge
                        position="absolute"
                        right={8}
                        bottom={8}
                        color="blue"
                      >
                        edited
                      </Badge>
                    )}
                  </Pane>

                  <Pane display="flex" gap={4} justifyContent="center">
                    <PreviewPlaceholder
                      size={300}
                      value={document.meta.name}
                      placeholder="CVDocument"
                    />
                  </Pane>
                </Pane>
              </Tab>
            ))}
          </Tablist>
        }
      </Pane>
    </Pane>
  );
};

export default DocumentsList;
