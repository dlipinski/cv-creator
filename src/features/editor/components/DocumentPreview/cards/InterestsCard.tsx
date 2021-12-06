import PreviewCard from "./PreviewCard";
import data from "../../../../../assets/example1.json";
import PreviewPlaceholder from "../../../../../ui/PreviewPlaceholder";

interface InterestsCardProps {
  interests: string;
  title: string;
}

const InterestsCard = ({ interests, title }: InterestsCardProps) => (
  <PreviewCard title={title}>
    <PreviewPlaceholder
      size={300}
      value={interests}
      placeholder={data.summary}
    />
  </PreviewCard>
);

export default InterestsCard;
