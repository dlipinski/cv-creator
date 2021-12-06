import { Badge, Button, FloppyDiskIcon, Pane } from "evergreen-ui";
import { MouseEventHandler } from "react";

interface SavePopupProps {
  isDisplayed: boolean;
  isDesktopOrLaptop: boolean;
  onDocumentsSaveClicked: MouseEventHandler<HTMLButtonElement>;
}

const SavePopup = ({
  isDisplayed,
  onDocumentsSaveClicked,
  isDesktopOrLaptop,
}: SavePopupProps) => (
  <Pane
    margin={16}
    marginTop={0}
    display={isDesktopOrLaptop ? "flex" : "grid"}
    zIndex={3}
    justifyContent={isDesktopOrLaptop ? "flex-end" : "stretch"}
    alignItems="center"
    gap={8}
  >
    <Pane
      borderRadius={10}
      elevation={3}
      transformOrigin="bottom"
      transition="0.2s opacity ease, 0.2s transform ease"
      transform={`scaleY(${isDisplayed ? 1 : 0})`}
      opacity={isDisplayed ? 1 : 0}
      background="selected"
      display="flex"
      justifyContent="space-between"
      gap={8}
      alignItems="center"
      padding={4}
      paddingLeft={12}
    >
      <Badge color="blue">edited</Badge>

      <Button
        iconBefore={FloppyDiskIcon}
        appearance="primary"
        onClick={onDocumentsSaveClicked}
      >
        Save Document
      </Button>
    </Pane>
  </Pane>
);

export default SavePopup;
