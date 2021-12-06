import { Language } from "../../../editorSlice";
import PreviewCard from "./PreviewCard";
import { Pane } from "evergreen-ui";
import PreviewPlaceholder from "../../../../../ui/PreviewPlaceholder";

interface LanguagesCardProps {
  languages: Language[];
  title: string;
}

const LanguagesCard = ({ languages, title }: LanguagesCardProps) => (
  <PreviewCard title={title}>
    <Pane display="grid" gridTemplateColumns="1fr 1fr" gap={8}>
      {languages.map((language) => (
        <Pane display="grid" gap={2}>
          <PreviewPlaceholder
            size={400}
            value={language.name}
            placeholder="English"
          />
          <PreviewPlaceholder
            size={200}
            value={language.details}
            placeholder="B2"
          />
        </Pane>
      ))}
    </Pane>
  </PreviewCard>
);

export default LanguagesCard;
