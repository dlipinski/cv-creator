import { Skill } from "../../../editorSlice";
import { Pane } from "evergreen-ui";
import PreviewCard from "./PreviewCard";
import PreviewPlaceholder from "../../../../../ui/PreviewPlaceholder";

interface SkillsCardProps {
  skills: Skill[];
  title: string;
}

const SkillsCard = ({ skills, title }: SkillsCardProps) => {
  return (
    <PreviewCard title={title}>
      <Pane display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={8}>
        {skills.map((skill, i) => (
          <Pane display="flex" gap={2} flexDirection="column">
            <PreviewPlaceholder
              size={400}
              value={skill.name}
              placeholder={`React`}
            />
            <PreviewPlaceholder
              size={100}
              value={skill.details}
              placeholder="Functional/CRA/Redux-Toolkit/Web3"
            />
          </Pane>
        ))}
      </Pane>
    </PreviewCard>
  );
};

export default SkillsCard;
