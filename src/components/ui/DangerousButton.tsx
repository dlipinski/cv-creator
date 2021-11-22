import {
  Button,
  ButtonAppearance,
  ConfirmIcon,
  CrossIcon,
  Heading,
  IconButton,
  Pane,
  Popover,
  Position,
  Text,
  TickIcon,
  WarningSignIcon,
} from "evergreen-ui";
import { MouseEventHandler, MouseEvent } from "react";

interface DangerousButtonProps {
  title?: string;
  icon: React.ElementType | JSX.Element | null | false;
  type: string;
  appearance: ButtonAppearance;
  onClick: MouseEventHandler;
  disabled?: boolean;
}

const DangerousButton = ({
  title,
  icon,
  type,
  appearance,
  onClick,
  disabled,
}: DangerousButtonProps) => {
  return (
    <Popover
      minWidth={128}
      content={({ close }) => (
        <Pane padding={12} display="grid" gap={12}>
          <Heading size={400}>Are you sure?</Heading>
          <Pane display="flex" gap={8}>
            <Button
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                onClick(e);
                close();
              }}
              iconBefore={WarningSignIcon}
              appearance="primary"
              intent="danger"
            >
              Confirm
            </Button>
            <Button appearance="minimal" iconBefore={CrossIcon} onClick={close}>
              Cancel
            </Button>
          </Pane>
        </Pane>
      )}
      position={Position.BOTTOM}
    >
      {type === "justIcon" ? (
        <IconButton
          disabled={disabled}
          intent="danger"
          icon={icon}
          appearance={appearance}
        />
      ) : (
        <Button
          disabled={disabled}
          intent="danger"
          iconBefore={icon}
          appearance={appearance}
        >
          {title}
        </Button>
      )}
    </Popover>
  );
};

export default DangerousButton;
