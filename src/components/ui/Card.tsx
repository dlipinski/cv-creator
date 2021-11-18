import { Heading, Pane } from "evergreen-ui";
import React from "react";

import { DotIcon } from "evergreen-ui";

type CardProps = {
  level?: number;
  title: string;
  footerButtons?: any[];
  headerButtons?: any[];
  children?: React.ReactNode;
};

const Card = ({
  level = 0,
  title,
  footerButtons,
  headerButtons,
  children,
}: CardProps) => (
  <Pane
    background="white"
    elevation={level > 0 ? 1 : undefined}
    borderRadius={4}
    overflow="hidden"
  >
    <Pane
      padding={headerButtons ? 8 : 16}
      paddingLeft={16}
      paddingRight={16}
      paddingBottom={8}
      display="flex"
      gap={8}
      justifyContent="space-between"
      alignItems="center"
    >
      <Pane
        display="flex"
        alignItems="center"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {level > 0 && <DotIcon width={10} height={10} />}
        <Heading
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          size={level === 0 ? 900 : level === 1 ? 400 : 300}
        >
          {title}
        </Heading>
      </Pane>

      {headerButtons && (
        <Pane display="flex" gap={8}>
          {headerButtons}
        </Pane>
      )}
    </Pane>
    <Pane padding={16} background={level === 5 ? "gray300" : "white"}>
      {children}
    </Pane>
    {footerButtons && (
      <Pane
        display="flex"
        gap={8}
        justifyContent="space-between"
        padding={8}
        paddingLeft={16}
        borderTop
        alignItems="center"
      >
        <Heading
          display="flex"
          alignItems="center"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          size={level === 0 ? 600 : level === 1 ? 400 : 300}
        >
          {level > 0 && <DotIcon />}
          {title}
        </Heading>
        <Pane>{footerButtons}</Pane>
      </Pane>
    )}
  </Pane>
);

export default Card;
