import PreviewCard from "./PreviewCard";
import { Pane, Heading } from "evergreen-ui";
import { Experience } from "../../../editorSlice";
import PreviewPlaceholder from "../../../../../ui/PreviewPlaceholder";

interface ExperienceCardProps {
  experience: Experience[];
  title: string;
}

const ExperienceCard = ({ experience, title }: ExperienceCardProps) => (
  <PreviewCard title={title}>
    <Pane display="grid">
      {experience.map((exp) => (
        <Pane display="grid" gridTemplateColumns="70px 1fr">
          <Pane display="flex" gap={2}>
            <PreviewPlaceholder
              size={400}
              value={exp.from}
              placeholder="2019"
            />
            <Heading size={400}>-</Heading>
            <PreviewPlaceholder size={400} value={exp.to} placeholder="2021" />
          </Pane>
          <Pane paddingLeft={8} marginLeft={8}>
            <PreviewPlaceholder
              size={400}
              value={exp.name}
              placeholder="Junior Developer"
            />
            <PreviewPlaceholder
              size={200}
              value={exp.details}
              placeholder="Super Company"
            />
            <Pane display="grid" marginTop={8} marginBottom={8} gap={8}>
              {exp.duties.map((duty) => (
                <Pane
                  display="grid"
                  borderLeft
                  borderLeftColor="#d8dae5"
                  paddingLeft={16}
                >
                  <PreviewPlaceholder
                    size={300}
                    value={duty.name}
                    placeholder="Developing big app"
                    justify
                  />
                  <PreviewPlaceholder
                    size={100}
                    value={duty.details}
                    placeholder="React/Redux/Web3"
                  />
                </Pane>
              ))}
            </Pane>
          </Pane>
        </Pane>
      ))}
    </Pane>
  </PreviewCard>
);

export default ExperienceCard;
