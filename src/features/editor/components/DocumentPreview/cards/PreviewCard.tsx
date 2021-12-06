import { Heading, Pane } from "evergreen-ui";

interface PageCardProps {
  title: string;
  children: React.ReactNode;
}

const PreviewCard = ({ title, children }: PageCardProps) => (
  <Pane width="100%">
    <Pane width="100%" borderBottom marginBottom={4} paddingBottom={4}>
      <Heading size={500}>{title}</Heading>
    </Pane>
    <Pane>{children}</Pane>
  </Pane>
);

export default PreviewCard;
