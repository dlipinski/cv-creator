import PreviewCard from "./PreviewCard";
import PreviewPlaceholder from "../../../../../ui/PreviewPlaceholder";
import { Pane, Heading } from "evergreen-ui";
import { Education } from "../../../editorSlice";

interface EducationCardProps {
  education: Education[];
  title: string;
}

const EducationCard = ({ education, title }: EducationCardProps) => (
  <PreviewCard title={title}>
    <Pane display="grid" gap={8}>
      {education.map((edu) => (
        <Pane display="grid" gridTemplateColumns="70px 1fr">
          <Pane display="flex" gap={2}>
            <PreviewPlaceholder
              size={400}
              value={edu.from}
              placeholder="2019"
            />
            <Heading size={400}>-</Heading>
            <PreviewPlaceholder size={400} value={edu.to} placeholder="2021" />
          </Pane>
          <Pane paddingLeft={8} marginLeft={8}>
            <PreviewPlaceholder
              size={400}
              value={edu.name}
              placeholder="IT - Web applications and databases"
            />
            <PreviewPlaceholder
              size={200}
              value={edu.details}
              placeholder="Super School"
            />
          </Pane>
        </Pane>
      ))}
    </Pane>
  </PreviewCard>
);

export default EducationCard;
