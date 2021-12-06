import { Project } from "../../../editorSlice";
import PreviewCard from "./PreviewCard";
import PreviewPlaceholder from "../../../../../ui/PreviewPlaceholder";
import { Pane } from "evergreen-ui";

interface ProjectsCardProps {
  projects: Project[];
  title: string;
}

const ProjectsCard = ({ projects, title }: ProjectsCardProps) => (
  <PreviewCard title={title}>
    <Pane display="grid" gridTemplateColumns="3fr 2fr" gap={16}>
      {projects.map((proj) => (
        <Pane display="flex" gap={2} flexDirection="column">
          <PreviewPlaceholder
            size={300}
            value={proj.name}
            placeholder="My Super Project"
          />
          <PreviewPlaceholder
            size={100}
            value={proj.details}
            placeholder="React/Redux/Web3"
          />
          <PreviewPlaceholder
            size={300}
            value={proj.link}
            placeholder="link.com"
          />
        </Pane>
      ))}
    </Pane>
  </PreviewCard>
);

export default ProjectsCard;
