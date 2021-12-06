import {
  ArrowLeftIcon,
  Button,
  EyeOpenIcon,
  IconButton,
  Pane,
} from "evergreen-ui";
import { useCallback } from "react";

export type TabTypes = "DocumentsList" | "DocumentForm" | "DocumentPreview";
export type TabsArray = TabTypes[];

interface MobileNavigatorProps {
  isDisplayed: boolean;
  selectedTab: TabTypes;
  onTabSelected: Function;
}

const MobileNavigator = ({
  isDisplayed,
  selectedTab,
  onTabSelected,
}: MobileNavigatorProps) => {
  const onPreviewClicked = useCallback(() => {
    onTabSelected("DocumentPreview");
  }, [onTabSelected]);

  const onReturnClicked = useCallback(
    () =>
      onTabSelected(
        selectedTab === "DocumentForm" ? "DocumentsList" : "DocumentForm"
      ),
    [selectedTab, onTabSelected]
  );

  return (
    <Pane
      display={isDisplayed ? "flex" : "none"}
      borderBottom
      paddingY={4}
      paddingX={8}
      gap={4}
      justifyContent="space-between"
      background="white"
    >
      <IconButton
        onClick={onReturnClicked}
        appearance="minimal"
        icon={ArrowLeftIcon}
      />

      <Button
        onClick={onPreviewClicked}
        appearance="minimal"
        iconAfter={EyeOpenIcon}
        display={selectedTab === "DocumentForm" ? "block" : "none"}
      >
        See Preview
      </Button>
    </Pane>
  );
};

export default MobileNavigator;
