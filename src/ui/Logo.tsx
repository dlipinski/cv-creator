import { Heading, Pane } from "evergreen-ui";

interface LogoProps {
  size: "small" | "large";
}

const Logo = ({ size }: LogoProps) => (
  <Pane
    display="flex"
    gap={size === "small" ? 5 : 8}
    alignItems="center"
    justifyContent="center"
  >
    <Pane
      background="selected"
      padding={6}
      paddingX={5}
      borderRadius={size === "small" ? 11 : 15}
    >
      <Heading
        size={size === "small" ? 500 : 800}
        fontWeight={size === "small" ? 800 : 900}
        color="white"
      >
        CV
      </Heading>
    </Pane>
    <Heading size={size === "small" ? 700 : 900} fontWeight={200}>
      Creator
    </Heading>
  </Pane>
);

export default Logo;
