import { Heading, HeadingSize } from "evergreen-ui";

interface PlaceholderProps {
  size: HeadingSize;
  value: string;
  placeholder: string;
  justify?: boolean;
}

const PreviewPlaceholder = ({
  size = 400,
  value,
  placeholder,
  justify = false,
}: PlaceholderProps) => (
  <Heading
    textAlign={justify ? "justify" : "start"}
    size={size}
    style={value ? {} : { color: "#8f95b2" }}
  >
    {value || placeholder}
  </Heading>
);

export default PreviewPlaceholder;
