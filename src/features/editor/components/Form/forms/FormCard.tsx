import { Heading, Pane } from "evergreen-ui";
import React from "react";

type CardProps = {
  level?: number;
  title: string;
  headerButtons?: any[];
  children?: React.ReactNode;
};

const FormCard = ({ level = 0, title, headerButtons, children }: CardProps) => (
  <Pane
    background={level % 2 === 0 ? "white" : "rgba(51, 102, 255,0.025)"}
    borderBottom
    borderRadius={level === 0 ? 0 : 8}
    border={level !== 0}
    overflow="hidden"
    position="relative"
  >
    <Pane
      position="absolute"
      top={0}
      bottom={0}
      left={0}
      right={0}
      background="transparent"
      zIndex={999}
      display="none"
    />
    <Pane
      padding={headerButtons ? 8 : 12}
      paddingLeft={16}
      paddingRight={4}
      borderBottom
      display="flex"
      gap={8}
      justifyContent="space-between"
      alignItems="center"
    >
      <Pane display="flex" alignItems="center">
        <Heading size={level === 0 ? 700 : 100}>{title}</Heading>
      </Pane>

      {headerButtons && (
        <Pane display="flex" gap={2}>
          {headerButtons}
        </Pane>
      )}
    </Pane>
    <Pane padding={16}>{children}</Pane>
  </Pane>
);

export default FormCard;
